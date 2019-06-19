import cloudinary.uploader


def upload(base64):
    return cloudinary.uploader.upload(base64)['secure_url']
