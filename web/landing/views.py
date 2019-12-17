import random
import string
import os

from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.shortcuts import render, redirect
from django.views.decorators.http import require_http_methods

from badds.settings import MP, EMAIL_HOST_USER
from landing.auth import register_auth, login_auth, activate_auth, recover_auth
from landing.captcha import check_captcha
from landing.forms import ContactForm


def index(request):
    return render(request, 'landing/index.html')


def contact(request):
    if request.method == "POST":
        form = ContactForm(request.POST)

        if not check_captcha(request):
            form.add_error(None, "Bad Captcha")
            render(request, 'landing/contact.html', {'form': form})

        if form.is_valid():
            name = form.cleaned_data.get('name')
            email = form.cleaned_data.get('email')
            subject = form.cleaned_data.get('subject')
            body = form.cleaned_data.get('body')

            send_mail(f'{subject} | Soporte para: {email}',
                      f'De {name}:\n{body}',
                      'admin@geminis.io',
                      [EMAIL_HOST_USER],
                      fail_silently=False)

            return render(request, 'landing/contact.html', {'success': True, 'form': ContactForm()})
    else:
        form = ContactForm()
    return render(request, 'landing/contact.html', {'form': form})


def register(request):
    if request.user.is_authenticated:
        return render(request, 'landing/index.html')
    return register_auth(request)


def login(request):
    if request.user.is_authenticated:
        return redirect('/')
    return login_auth(request)


def recover(request):
    if request.user.is_authenticated:
        return render(request, 'landing/index.html')
    return recover_auth(request)


def activate(request, uidb64, token):
    return activate_auth(request, uidb64, token)


@login_required(login_url="/login/")
def account_activation_sent(request):
    if User.objects.count() == 1:
        request.user.profile.email_confirmed = True
        request.user.save()

    if request.user.profile.email_confirmed:
        return render(request, 'landing/index.html')

    return render(request, 'landing/account_activation_sent.html')


@require_http_methods('GET')
@login_required(login_url="/login/")
def account(request):
    if request.user.profile.pending_purchase_id is not None:
        if "payment" in request.GET:
            if request.GET["payment"] == request.user.profile.pending_purchase_id:
                request.user.profile.credits += request.user.profile.pending_purchase_amount
                request.user.profile.pending_purchase_id = None
                request.user.profile.pending_purchase_amount = None
                request.user.profile.pending_purchase_link = None
                request.user.save()

                return render(request, 'landing/account.html', {'credits': request.user.profile.credits})

        return render(request, 'landing/account.html', {'credits': request.user.profile.credits,
                                                        'init_point': request.user.profile.pending_purchase_link})

    return render(request, 'landing/account.html', {'credits': request.user.profile.credits})


@require_http_methods('POST')
@login_required(login_url="/login/")
def pay(request):
    c = request.POST["credits"]

    if c is None or c == "":
        return render(request, 'landing/account.html', {'error': "Inserte un valor mayor o igual a 10 creditos."})

    desired_credits = int(c)

    if desired_credits < 10 or desired_credits > 100000:
        return render(request, 'landing/account.html', {'error': "Inserte un valor entre 10 y 100.000 creditos."})

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
            "success": f"http://{os.environ['DEPLOY_URL']}/account/?payment="+id
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


@require_http_methods('POST')
@login_required(login_url="/login/")
def cancel(request):
    if request.user.profile.pending_purchase_id is None:
        return render(request, 'landing/account.html', {'credits': request.user.profile.credits})

    request.user.profile.pending_purchase_id = None
    request.user.profile.pending_purchase_amount = None
    request.user.profile.pending_purchase_link = None
    request.user.save()

    return render(request, 'landing/account.html', {'credits': request.user.profile.credits})

