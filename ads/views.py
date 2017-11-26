from django.shortcuts import render, redirect

from ads.api import get_resource


def index(request):
    if request.user.is_authenticated:
        return render(request, 'ads/index.html')
    return redirect('/login')


def ad(request):
    return get_resource(request)
