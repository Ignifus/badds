from cloudinary.templatetags import cloudinary


def upload(base64):
    return cloudinary.uploader.upload(base64)['secure_url']
