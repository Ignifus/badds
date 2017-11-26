from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import render, redirect

from ads.serializers import UserSerializer


def index(request):
    if request.user.is_authenticated:
        return render(request, 'ads/index.html')
    return redirect('/login')


def context(request):
    user_context = User.objects.get(id=request.user.id)
    return JsonResponse({'user': UserSerializer(user_context).data})
