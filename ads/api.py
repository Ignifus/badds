from django.http import HttpResponse, JsonResponse

from ads.models import Resource
from badds.utils import get_client_ip


def get_resource(request):
    if request.method == "GET":
        apikey = request.GET.get("apikey", None)
        domain = request.GET.get("domain", None)
        space_id = request.GET.get("spaceid", None)
        client_ip = get_client_ip(request)

        resource = Resource.objects.find(pk=1)
        with open(resource.path, "rb") as f:
            return HttpResponse(f.read(), content_type=resource.data_type)
    return JsonResponse({'error': "Only GET supported."})
