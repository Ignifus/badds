import requests

from badds.settings import CAPTCHA_SECRET


def check_captcha(request):
    if CAPTCHA_SECRET is None:
        return True

    c = request.POST.get("captcha", None)
    if c is None:
        return False

    res = requests.post("https://www.google.com/recaptcha/api/siteverify", {"secret": CAPTCHA_SECRET, "response": c})
    success = res.json()["success"]
    score = res.json()["score"]

    return success and score > 0.3
