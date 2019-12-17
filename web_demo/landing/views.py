import os
from os import path

import requests
from django.shortcuts import render


def index(request):
    api_key = os.environ.get("DEMO_API_KEY", "")
    space_id = os.environ.get("DEMO_SPACE_ID", "")
    full_url = f"http://badds:8080/ads/ad/?apiKey={api_key}&space={space_id}"

    response = requests.get(full_url)
    res = response.json()

    img_url = "https://res.cloudinary.com/geminis/image/upload/v1575435915/placeholder-images-image_large.png"
    link = "https://badds.geminis.dev"
    text = "Ad placeholder."
    file_name = "placeholder-images-image_large.png"

    if response.status_code == 200:
        img_url = res["resource"]
        link = res["link"]
        text = res["text"]
        file_name = res["resource"].split("/")[-1]

    file_path = f"static/resources/{file_name}"

    if not path.exists(file_path):
        r = requests.get(img_url, stream=True)

        if r.status_code == 200:
            with open(file_path, 'wb') as f:
                for chunk in r.iter_content(1024):
                    f.write(chunk)

    return render(request, 'landing/index.html', {"ad_url": f"/{file_path}", "ad_url_link": link, "ad_text": text})
