from rest_framework import status
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


class ActivateException(APIException):
    status_code = status.HTTP_409_CONFLICT
    default_detail = 'This user is already activated.'
    default_code = 'conflict'


class NeedsAgreementException(APIException):
    status_code = status.HTTP_401_UNAUTHORIZED
    default_detail = 'Agree to Terms of Service & Privacy Policy & Terms of Location-Based Services.'
    default_code = 'needs_agreement'
