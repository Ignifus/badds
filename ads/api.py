import cloudinary
import cloudinary.uploader
import cloudinary.api
from cloudinary.utils import cloudinary_url
from django.http import HttpResponse, JsonResponse

from ads.models import Resource, Space, Contract, Advertisement
from badds.utils import get_client_ip


def get_resource(request):
    if request.method == "GET":
        apikey = request.GET.get("apikey", None)
        space_id = request.GET.get("spaceid", None)
        client_ip = get_client_ip(request)

        # check api key
        # Add ip to ip log, reduce print if unique, add ip with country if unique
        # if reduced print, add credits to Space owner equal to ppp_usd of contract
        # Check if country restriction, if yes, check country and only return if correct
        # Check if print count is 0 after reducing, if 0, end contract active = false

        # return json response from cloudinary

        try:
            contract = Contract.objects.get(pk=space_id)
        except Contract.DoesNotExist:
            return JsonResponse({'error': "Space not found."})

        return JsonResponse({'resource': contract.advertisement.resources.get(advertisement_id=contract.advertisement_id).path})
    return JsonResponse({'error': "Only GET supported."})
