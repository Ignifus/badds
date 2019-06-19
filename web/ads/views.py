from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from ads.api import get_resource


@require_http_methods('GET')
@login_required(login_url='/login/')
def index(request):
    return redirect("/static/panel/index.html")


@require_http_methods('GET')
@csrf_exempt
def ad(request):
    return get_resource(request)
