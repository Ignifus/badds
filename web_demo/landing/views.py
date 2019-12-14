import os

import requests
from django.shortcuts import render


def index(request):
    api_key = os.environ.get("DEMO_API_KEY", "")
    space_id = os.environ.get("DEMO_SPACE_ID", "")
    full_url = f"http://badds:8080/ads/ad/?apiKey={api_key}&space={space_id}"
    res = requests.get(full_url).json()

    r = requests.get(res["resource"], stream=True)
    file_name = res["resource"].split("/")[-1]
    print(r)
    if r.status_code == 200:
        with open(f"static/resources/{file_name}", 'wb') as f:
            for chunk in r.iter_content(1024):
                f.write(chunk)

    return render(request, 'landing/index.html', {"ad_url": f"/static/resources/{file_name}"})
