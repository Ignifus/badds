from django.shortcuts import render

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
        return render(request, 'ads/index.html')
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


def elements(request):
    return render(request, 'landing/elements.html')
