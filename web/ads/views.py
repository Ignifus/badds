from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from ads.api import get_resource


@login_required(login_url='/login')
def index(request):
    return render(request, 'ads/index.html')

@login_required(login_url='/login')
def publisher(request):
    return render(request, 'ads/panel-publisher.html')

@login_required(login_url='/login')
def advertiser(request):
    return render(request, 'ads/panel-advertiser.html')

@csrf_exempt
def ad(request):
    return get_resource(request)
