import os 

def export_vars(request):
    data = {'captcha_key': os.environ['BADDS_CAPTCHA_PUBLIC']}
    return data
