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

    ip = Ip.objects.filter(ip=client_ip).first()
    if ip not in client_ip:
        ip = Ip()
        ip.ip = client_ip
        ip.country = get_client_country(client_ip)
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
        ip_log.age = age
        ip_log.gender = gender
        ip_log.save()

        contract.prints -= 1
        if contract.prints == 0:
            contract.active = False
        contract.save()

        user = contract.space.application.user
        user.profile.credits += contract.ppp_usd
        user.save()
    else:
        ip_log.age = age
        ip_log.gender = gender
        ip_log.save()

    resources = contract.advertisement.resources

    for res in resources:
        age_restrictions = res.restrictions.filter(restriction="AGE")
        if ">18" in age_restrictions and age < 18:
            continue

        gender_restriction = res.restrictions.filter(restriction="GENDER")
        if len(gender_restriction) > 0 and gender not in gender_restriction:
            continue

        country_whitelist = res.restrictions.filter(restricton="COUNTRY_WHITELIST")
        if len(country_whitelist) > 0 and ip.country not in country_whitelist:
            continue

        country_blacklist = res.restrictions.filter(restricton="COUNTRY_BLACKLIST")
        if ip.country in country_blacklist:
            continue

        return JsonResponse({'resource': res.path})

    return JsonResponse({'resource': "https://res.cloudinary.com/geminis/image/upload/v1575435915/placeholder-images-image_large.png"})
