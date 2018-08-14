from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt

from ads.api import get_resource


@login_required(login_url='/login')
def index(request):
    return redirect("/static/panel/index.html")

@csrf_exempt
def ad(request):
    return get_resource(request)
