from datetime import timedelta

from rest_framework.response import Response


class CheckModelMixin:

    def check(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data)


class LoginMixin:

    def login(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = {
            'uid': serializer.data['uid'],
            'uuid': serializer.data['uuid'],
            'access_token': serializer.data['access_token']
        }
        response = Response(data)
        expires = timedelta(days=14)
        max_age = expires.total_seconds()
        response.set_cookie(
            key='refresh_token', value=serializer.data['refresh_token'],
            max_age=max_age, expires=expires, httponly=True, secure=True)
        return response
