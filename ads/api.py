import cloudinary
import cloudinary.uploader
import cloudinary.api
from cloudinary.utils import cloudinary_url
from django.http import HttpResponse, JsonResponse

from ads.models import Resource, Space, Contract
from badds.utils import get_client_ip


def get_resource(request):
    if request.method == "GET":
        apikey = request.GET.get("apikey", None)
        domain = request.GET.get("domain", None)
        space_id = request.GET.get("spaceid", None)
        client_ip = get_client_ip(request)

        # Add ip to ip log, reduce print if unique, add ip with country if unique
        # if reduced print, add credits to Space owner equal to ppp_usd of contract
        # Check if country restriction, if yes, check country and only return if correct
        # Check if print count is 0 after reducing, if 0, end contract active = false

        # return json response from cloudinary

        return JsonResponse({'resource': Contract.objects.get(space_id=space_id).advertisement.resources.get(data_type='png').path})
    return JsonResponse({'error': "Only GET supported."})


def upload(request):
    return JsonResponse(cloudinary.uploader.upload("badds.png", public_id="badds", width=1037, height=677))
