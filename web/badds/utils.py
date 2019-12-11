import json
from urllib.request import urlopen

from badds.settings import IPSTACK_KEY


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[-1].strip()
    else:
        ip = request.META.get('X-Real-IP')
    return ip


def get_client_country(ip):
    url = f'http://api.ipstack.com/{ip}?access_key={IPSTACK_KEY}&fields=country_code'
    response = urlopen(url)
    data = json.load(response)
    return data['country_code']
