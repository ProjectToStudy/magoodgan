from rest_framework.exceptions import APIException
from rest_framework.views import exception_handler


def get_code(response):
    code = dict()
    for key, value in response.data.items():
        if len(response.data.items()) > 1:
            code[key] = value[0].code
        else:
            if isinstance(value, list):
                if len(value) == 1:
                    code = value[0].code
                else:
                    temp = []
                    for val in value:
                        temp.append(val)
                    code[key] = temp
            else:
                code = value.code
    return code


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if isinstance(response.data, dict):
        code = response.data.get('code')
        if not code:
            code = get_code(response)
        response.data['code'] = code
    elif isinstance(response.data, list):
        code = response.data[0].code
        data = {
            'code': code,
            'non_field_errors': response.data
        }
        response.data = data

    return response
