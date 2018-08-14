from django.http import JsonResponse

from ads.models import Contract
from badds.utils import get_client_country, get_client_ip


def get_resource(request):
    if request.method == "POST":
        apikey = request.POST.get("apikey", None)
        space_id = request.POST.get("space", None)
        client_ip = request.POST.get("clientIp", None)

        if client_ip is None:
            client_ip = get_client_ip(request)

        country = get_client_country(client_ip)

        # Check if country restriction, if yes, check country and only return if correct
        # Add ip to ip log if not added, reduce print if unique
        # if reduced print, add credits to Space owner equal to ppp_usd of contract
        # Check if print count is 0 after reducing, if 0, end contract active = false

        # return json response from cloudinary

        try:
            contract = Contract.objects.get(space_id=space_id, active=True)
        except Contract.DoesNotExist:
            return JsonResponse({'error': "Contract not found for space."}, status=404)

        if contract.space.application.key != apikey:
            return JsonResponse({'error': "Bad API key."}, status=403)

        if contract.advertisement.resources.all().count() == 0:
            return JsonResponse({'error': "Advertisement has no resources assigned."}, status=500)

        return JsonResponse({'resource': contract.advertisement.resources.filter(advertisement_id=contract.advertisement_id).first().path})
    return JsonResponse({'error': "Only POST supported."}, status=405)
