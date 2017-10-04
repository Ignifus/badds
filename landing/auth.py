from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login, logout
import requests

from landing.forms import SignUpForm


def login_auth(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(username=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('/')
        else:
            context = {'error': 'Usuario no encontrado o contraseña inválida', 'email': email, 'password': password}
            return render(request, 'landing/login.html', context)
    else:
            return redirect('/login/')


def logout_auth(request):
    logout(request)
    return redirect('/')


def register_auth(request):
    if request.POST:
        firstname = request.POST['firstname']
        lastname = request.POST['lastname']
        email = request.POST['email']
        password = request.POST['password']

        if grecaptcha_verify(request):
            user = authenticate(username=email, password=password)
            login(request, user)
            context = {'message': 'Se ha registrado correctamente.'}
            return render(request, 'landing/register.html', context)
        else:
            context = {'error': 'Captcha inválido', 'firstname': firstname, 'lastname': lastname, 'password': password, 'email': email}
            return render(request, 'landing/login.html', context)
    else:
        return redirect('/register/')


def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('home')
    else:
        form = SignUpForm()
    return render(request, 'landing/register.html', {'form': form})


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
            'secret': "6LfgTzIUAAAAAL6wwrLSv5ZcyYpTHjarnft0SSpT",
            'response': captcha_rs,
            'remoteip': get_client_ip(request)
        }
        verify_rs = requests.get(url, params=params, verify=True)
        verify_rs = verify_rs.json()
        return verify_rs.get("success", False)