from django.http import JsonResponse

from ads.models import Contract, Ip, ContractIpLog, ResourceRestriction
from ads.restriction_solvers import *
from badds.utils import get_client_country, get_client_ip


def get_resource(request):
    apikey = request.GET.get("apiKey", "")
    space_id = request.GET.get("space", "")
    client_ip = request.GET.get("clientIp", "")
    age = request.GET.get("age", "0")
    gender = request.GET.get("gender", "U")

    if client_ip is "":
        client_ip = get_client_ip(request)

    if client_ip is None:
        client_ip = "10.0.0.0"

    ip = Ip.objects.filter(ip=client_ip).first()
    if ip is None or ip.ip not in client_ip:
        ip = Ip()
        ip.ip = client_ip
        ip.country = get_client_country(client_ip)
        if ip.country is None:
            ip.country = ""
        ip.save()

    try:
        contract = Contract.objects.get(space_id=space_id, active=True)
    except Contract.DoesNotExist:
        return JsonResponse({'error': "Contract not found for space."}, status=400)

    if contract.space.application.key != apikey:
        return JsonResponse({'error': "Bad API key."}, status=403)

    if contract.advertisement.resources.all().count() == 0:
        return JsonResponse({'error': "Advertisement has no resources assigned."}, status=400)

    ip_log = ContractIpLog.objects.filter(contract=contract, ip=ip).first()

    if ip_log is None:
        ip_log = ContractIpLog()
        ip_log.contract = contract
        ip_log.ip = ip
        ip_log.age = int(age)
        ip_log.gender = gender[0]
        ip_log.save()

        contract.prints -= 1
        if contract.prints == 0:
            contract.active = False
        contract.save()

        user = contract.space.application.user
        user.profile.credits += contract.ppp_usd
        user.save()
    else:
        ip_log.age = int(age)
        ip_log.gender = gender[0]
        ip_log.save()

    resources = contract.advertisement.resources.all()

    validate = {
        "AGE": solve_age,
        "GENDER": solve_gender,
        "COUNTRY_WHITELIST": solve_country_whitelist,
        "COUNTRY_BLACKLIST": solve_country_blacklist
    }

    params = {
        "age": age,
        "gender": gender,
        "country": ip.country
    }

    for res in resources:
        all_restrictions = ResourceRestriction.objects.select_related('restriction').filter(resource=res).values('restriction__restriction', 'value')

        filtered = False

        for restriction in all_restrictions:
            if not validate[restriction["restriction__restriction"]](restriction["value"], params):
                filtered = True

        if not filtered:
            return JsonResponse({'resource': res.path, "link": res.url_link, "text": res.text})

    return JsonResponse({'error': "No resource found matching restrictions, serving placeholder.", 'resource': "https://res.cloudinary.com/geminis/image/upload/v1575435915/placeholder-images-image_large.png"})
