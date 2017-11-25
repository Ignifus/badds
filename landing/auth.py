import requests

from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login, logout
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

from badds.settings import CAPTCHA_SECRET
from landing.forms import SignUpForm, LoginForm
from landing.models import Profile
from landing.tokens import account_activation_token


def login_auth(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            if grecaptcha_verify(request):
                if form.clean() is not None:
                    user = User.objects.get(username=form.cleaned_data.get('username'))
                    login(request, form.user_cache)
                    if user.profile.email_confirmed:
                        return redirect('/')
                    else:
                        return redirect('/account_activation_sent')
    else:
        form = LoginForm()
    return render(request, 'landing/login.html', {'form': form})


def logout_auth(request):
    logout(request)
    return redirect('/')


def register_auth(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if grecaptcha_verify(request):
            if form.is_valid():
                user = form.save(commit=False)
                user.is_active = True
                user.save()
                login(request, user)
                return send_mail(request)
    else:
        form = SignUpForm()
    return render(request, 'landing/register.html', {'form': form})


def send_mail(request):
    if request.user.is_authenticated:
        profile = Profile.objects.get(user=request.user)
        if not profile.email_confirmed:
            current_site = get_current_site(request)
            subject = 'Badds: confirme su cuenta'
            message = render_to_string('landing/account_activation_email.html', {
                'user': request.user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(request.user.pk)),
                'token': account_activation_token.make_token(request.user),
            })
            request.user.email_user(subject, message)
            return render(request, 'landing/account_activation_sent.html')
    return redirect('/')


def resend_mail(request):
    if request.method == 'POST':
        if grecaptcha_verify(request):
            return send_mail(request)
    return render(request, 'landing/account_activation_sent.html')


def activate_auth(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.profile.email_confirmed = True
        user.save()
        login(request, user)
        return redirect('/')
    else:
        return render(request, 'landing/account_activation_invalid.html')


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def grecaptcha_verify(request):
    if request.method == 'POST':
        data = request.POST
        captcha_rs = data.get('g-recaptcha-response')
        url = "https://www.google.com/recaptcha/api/siteverify"
        params = {
            'secret': CAPTCHA_SECRET,
            'response': captcha_rs,
            'remoteip': get_client_ip(request)
        }
        verify_rs = requests.get(url, params=params, verify=True)
        verify_rs = verify_rs.json()
        return verify_rs.get("success", False)
