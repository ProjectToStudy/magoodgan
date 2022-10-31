from datetime import datetime, timedelta

from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from apps.user.models import User
from apps.user.serializers import UserSerializer, LoginSerializer, CheckIDSerializer, CheckEmailSerializer, CheckNicknameSerializer


class CheckID(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = CheckIDSerializer
    permission_classes = [AllowAny]

    def check(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """
        ID 중복 확인

        ___
        check
        """
        return self.check(request, *args, **kwargs)


class CheckEmail(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = CheckEmailSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        """
        이메일 중복 확인

        ___
        check
        """
        return self.check(request, *args, **kwargs)


class CheckNickname(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = CheckNicknameSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        """
        닉네임 중복 확인

        ___
        check
        """
        return self.check(request, *args, **kwargs)


class UserViewSet(ModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        """
        회원 목록 조회

        ___
        list
        """
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        """
        회원 가입

        ___
        create
        """
        return super().create(request, *args, **kwargs)


class LoginView(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def login(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = {
            'uid': serializer.data['uid'],
            'access_token': serializer.data['access_token']
        }
        response = Response(data)
        expires = timedelta(days=14)
        max_age = expires.total_seconds()
        response.set_cookie(
            key='refresh_token', value=serializer.data['refresh_token'],
            max_age=max_age, expires=expires, httponly=True, secure=True)
        return response

    def post(self, request, *args, **kwargs):
        """
        로그인

        ___
        login
        """
        return self.login(request, *args, **kwargs)
