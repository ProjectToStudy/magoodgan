import datetime
from django.contrib.auth import user_logged_in
from django.contrib.auth.models import update_last_login
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from user.models import User


class LoginMixin:
    default_login_response = {
        'code': 'ok',
        'detail': 'Login Success',
        'access_token': str,
        'email': str,
        'uuid': str
    }

    def preprocess_login(self, request, *args, **kwargs):
        self.event = 'login'
        return self.login(request, *args, **kwargs)

    def get_user(self, request, *args, **kwargs):
        validated_data = self.kwargs.pop('validated_data', None)
        if isinstance(validated_data, dict):
            email = validated_data['email']
            return User.objects.get(email=email)
        elif isinstance(validated_data, User):
            return validated_data
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        validated_data.pop('password')
        return User.objects.get(**validated_data)

    def login(self, request, *args, **kwargs):
        user = self.get_user(request, *args, **kwargs)
        user_logged_in.send(sender=user.__class__, request=request, user=user)
        update_last_login(None, user)
        data = self.get_token(user)
        return self.get_success_response(data)

    def get_token(self, user):
        token = TokenObtainPairSerializer.get_token(user)
        return {
            'token': token,
            'user': user
        }

    def get_success_response(self, data):
        refresh_token = str(data.get('token'))
        token = data.get('token')
        user = data.get('user')
        access_token = str(token.access_token)

        self.default_login_response['access_token'] = access_token
        self.default_login_response['uuid'] = user.uuid
        self.default_login_response['email'] = user.email

        if self.event == 'create':
            response = Response(data=self.default_login_response, status=status.HTTP_201_CREATED)
        else:
            response = Response(data=self.default_login_response, status=status.HTTP_200_OK)
        max_age = 7 * 24 * 60 * 60
        expires = datetime.datetime.strftime(
            datetime.datetime.utcnow() + datetime.timedelta(seconds=max_age),
            "%a, %d-%b-%Y %H:%M:%S GMT",
        )
        response.set_cookie(key='refresh_token', value=refresh_token, max_age=max_age,
                            expires=expires, httponly=True, secure=True)
        return response
