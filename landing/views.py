from django.shortcuts import render

from landing.auth import register_auth, login_auth, activate_auth
from landing.models import Profile


def index(request):
    return render(request, 'landing/index.html')

def contact(request):
    return render(request, 'landing/contact.html')

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

def elements(request):
    return render(request, 'landing/elements.html')
