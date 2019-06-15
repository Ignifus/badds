import json
import random
import string

from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponseBadRequest, JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods

from badds.settings import MP
from landing.auth import register_auth, login_auth, activate_auth
from landing.email import send_contact_email
from landing.forms import ContactForm
from landing.models import Profile


def index(request):
    return render(request, 'landing/index.html')


def contact(request):
    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            send_contact_email(form.cleaned_data.get('name'),
                               form.cleaned_data.get('email'),
                               form.cleaned_data.get('subject'),
                               form.cleaned_data.get('body'))
            return render(request, 'landing/contact.html', {'success': True, 'form': ContactForm()})
    else:
        form = ContactForm()
    return render(request, 'landing/contact.html', {'form': form})


def register(request):
    if request.user.is_authenticated:
        return render(request, 'landing/index.html')
    return register_auth(request)


def account_activation_sent(request):
    if request.user.is_authenticated:
        profile = Profile.objects.get(user=request.user)
        if profile.email_confirmed:
            return render(request, 'landing/index.html')
    return render(request, 'landing/account_activation_sent.html')


def login(request):
    return login_auth(request)


def activate(request, uidb64, token):
    return activate_auth(request, uidb64, token)


@require_http_methods('GET')
@login_required(login_url="/")
def account(request):
    if request.user.profile.pending_purchase_id is not None:
        if request.GET["payment"] is not None:
            if request.GET["payment"] == request.user.profile.pending_purchase_id:
                request.user.profile.credits += request.user.profile.pending_purchase_amount
                request.user.profile.pending_purchase_id = None
                request.user.profile.pending_purchase_link = None
                request.user.save()
                return render(request, 'landing/account.html', {'credits': request.user.profile.credits})

        return render(request, 'landing/account.html', {'credits': request.user.profile.credits,
                                                        'init_point': request.user.profile.pending_purchase_link})

    return render(request, 'landing/account.html', {'credits': request.user.profile.credits})


@require_http_methods('POST')
@login_required(login_url="/")
def pay(request):
    desired_credits = int(request.POST["credits"])

    if desired_credits < 10:
        return render(request, 'landing/account.html', {'error': "Inserte un valor mayor o igual a 10 creditos."})

    id = "BADDS_" + ''.join([random.choice(string.ascii_letters + string.digits) for n in range(8)])

    preference = {
        "items": [
            {
                "title": "BADDS Creditos",
                "quantity": 1,
                "currency_id": "ARS",
                "unit_price": desired_credits
            }
        ],
        "back_urls": {
            "success": "http://badds.hq.localhost/account/?payment="+id
        },
        "auto_return": "approved",
        "external_reference": id
    }

    preference_result = MP.create_preference(preference)

    request.user.profile.pending_purchase_id = id
    request.user.profile.pending_purchase_amount = desired_credits
    request.user.profile.pending_purchase_link = preference_result["response"]["sandbox_init_point"]

    request.user.save()

    return render(request, 'landing/account.html', {'success': "Transaccion realizada! En espera del pago.",
                                                    'init_point': preference_result["response"]["sandbox_init_point"]})


def elements(request):
    return render(request, 'landing/elements.html')
