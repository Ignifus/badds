from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from django.http import HttpResponse

from ads.api import get_resource
from ads.tasks import test


@require_http_methods('GET')
@login_required(login_url='/login/')
def index(request):
    if not request.user.profile.email_confirmed:
        return redirect('/account_activation_sent')
    f = open("static/panel/index.html", "r")
    r = HttpResponse(f.read())
    f.close()
    return r


@require_http_methods('GET')
@csrf_exempt
def ad(request):
    return get_resource(request)
