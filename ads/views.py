from django.shortcuts import render, redirect


def index(request):
    if request.user.is_authenticated:
        return render(request, 'ads/index.html')
    return redirect('/login')
