from badds.settings import CAPTCHA_PUBLIC


def export_vars(request):
    data = {'captcha_key': CAPTCHA_PUBLIC}
    return data
