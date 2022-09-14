import sys
from io import BytesIO

import requests
from PIL import Image
from django.core.files import File
from django.core.files.uploadedfile import InMemoryUploadedFile


def preprocess_profile(url):
    image_name = url.split('/')[-1]
    extension = image_name.split('.')[-1]
    if extension == 'jpg':
        content_type = 'jpeg'
    else:
        content_type = extension
    response = requests.get(url)
    profile_bytes = response.content
    temp = BytesIO()
    temp.write(profile_bytes)
    temp.seek(0)
    image_file = Image.open(File(temp))
    if image_file.size > (192, 192):
        image_file = image_file.resize((192, 192), Image.ANTIALIAS)
    output = BytesIO()
    image_file.save(output, format=content_type)
    output.seek(0)
    temp = InMemoryUploadedFile(file=output,
                                field_name='ImageField',
                                name=f'profile.{extension}',
                                content_type=f'image/{content_type}',
                                size=sys.getsizeof(output),
                                charset=None)
    return temp
