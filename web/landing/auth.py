from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import redirect, render
from django.template.loader import render_to_string
from django.urls import reverse
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

from django.core.mail import send_mail

from badds.settings import DEFAULT_FROM_EMAIL
from landing.captcha import check_captcha
from landing.forms import SignUpForm, LoginForm, RecoverForm
from landing.models import Profile
from landing.tokens import account_activation_token


def login_auth(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)

        if not check_captcha(request):
            form.add_error(None, "Bad Captcha")
            render(request, 'landing/login.html', {'form': form})

        if form.is_valid():
            if form.clean() is not None:
                user = User.objects.get(username=form.cleaned_data.get('username'))
                login(request, form.user_cache)
                if user.profile.email_confirmed:
                    return redirect('/ads/')
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
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = True
            user.save()
            login(request, user)
            return send_mail_int(request)
    else:
        form = SignUpForm()
    return render(request, 'landing/register.html', {'form': form})


def send_mail_int(request):
    if request.user.is_authenticated:
        profile = Profile.objects.get(user=request.user)
        if not profile.email_confirmed:
            current_site = get_current_site(request)
            subject = 'Badds: confirme su cuenta'
            query = reverse('landing:activate', kwargs={'uidb64': urlsafe_base64_encode(force_bytes(request.user.pk)),
                                                        'token': account_activation_token.make_token(request.user)})
            message = render_to_string('landing/account_activation_email.html', {
                'user': request.user,
                'domain': current_site.domain,
                'query': query,
            })
            send_mail(subject, message, 'admin@geminis.io', [request.user.email], fail_silently=False)
            return render(request, 'landing/account_activation_sent.html')
    return redirect('/')


def recover_auth(request):
    if request.method == 'POST':
        form = RecoverForm(data=request.POST)
        if form.is_valid():
            if form.clean() is not None:
                form.save(
                    subject_template_name='landing/password_reset_subject.txt',
                    email_template_name='landing/password_reset_email.html',
                    use_https=False,
                    from_email=DEFAULT_FROM_EMAIL, request=request
                )

                return render(request, 'landing/recover_sent.html')
    else:
        form = RecoverForm()
    return render(request, 'landing/recover.html', {'form': form})


def resend_mail(request):
    if request.method == 'POST':
        return send_mail_int(request)
    return render(request, 'landing/account_activation_sent.html')


def activate_auth(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and account_activation_token.check_token(user, token):
        user.profile.email_confirmed = True
        user.save()
        login(request, user)
        return redirect('/ads/')
    else:
        return render(request, 'landing/account_activation_invalid.html')
