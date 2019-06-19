from django.http import JsonResponse

from ads.models import Contract, Ip, ContractIpLog
from badds.utils import get_client_country, get_client_ip


def get_resource(request):
    apikey = request.POST.get("apikey", None)
    space_id = request.POST.get("space", None)
    client_ip = request.POST.get("clientIp", None)
    age = request.POST.get("age", None)
    gender = request.POST.get("gender", None)

    if client_ip is None:
        client_ip = get_client_ip(request)

    ip = Ip.objects.filter(ip=client_ip)
    if ip not in client_ip:
        ip = Ip()
        ip.ip = client_ip
        ip.country = get_client_country(client_ip)
        ip.save()

    try:
        contract = Contract.objects.get(space_id=space_id, active=True)
    except Contract.DoesNotExist:
        return JsonResponse({'error': "Contract not found for space."}, status=404)

    if contract.space.application.key != apikey:
        return JsonResponse({'error': "Bad API key."}, status=403)

    if contract.advertisement.resources.all().count() == 0:
        return JsonResponse({'error': "Advertisement has no resources assigned."}, status=500)

    ip_log = ContractIpLog.objects.filter(contract=contract, ip=ip)

    if len(ip_log) == 0:
        ip_log = ContractIpLog()
        ip_log.contract = contract
        ip_log.ip = ip
        ip_log.save()
    else:
        contract.prints -= 1
        if contract.prints == 0:
            contract.active = False
        contract.save()
        user = contract.space.application.user
        user.profile.credits += contract.ppp_usd

    # TODO Check age, gender and country restrictions to filter the advertisement ID

    return JsonResponse({'resource': contract.advertisement.resources.filter(advertisement_id=contract.advertisement_id).first().path})
