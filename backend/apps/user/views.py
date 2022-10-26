import datetime

import requests
from django.shortcuts import redirect
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from common.generics import SocialLoginCallback, CustomGenericAPIView
from common.mixins import CheckMixin, LoginMixin
from common.utils import preprocess_profile
from .models import User
from .serializers import UserSerializer, ActivateSerializer, SocialLoginSerializer, TokenCheckSerializer, \
    CheckIDSerializer, CheckEmailSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class CheckID(CheckMixin, GenericAPIView):
    queryset = User.objects.all()
    serializer_class = CheckIDSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        return self.check(request, *args, **kwargs)


class CheckEmail(CheckMixin, GenericAPIView):
    queryset = User.objects.all()
    serializer_class = CheckEmailSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        return self.check(request, *args, **kwargs)


class ActivateUser(LoginMixin, GenericAPIView):
    serializer_class = ActivateSerializer
    permission_classes = [AllowAny]

    @swagger_auto_schema()
    def get(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=kwargs)
        serializer.is_valid(raise_exception=True)
        self.kwargs['validated_data'] = serializer.validated_data['user']
        user = serializer.validated_data['user']
        user.is_active = True
        user.save()
        return self.preprocess_login(request, *args, **kwargs)


class KakaoLogin(GenericAPIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema()
    def get(self, request, *args, **kwargs):
        url = 'https://kauth.kakao.com/oauth/authorize'
        client_id = 'ce696f5a464cf2d45d2b8c9a68816b0b'
        redirect_uri = request.get_host() + '/member/login/kakao'

        request_uri = f"{url}?response_type=code&client_id={client_id}&redirect_uri={redirect_uri}"

        return redirect(request_uri)


class KakaoCallback(SocialLoginCallback):
    serializer_class = SocialLoginSerializer
    permission_classes = [AllowAny]
    parser_classes = (MultiPartParser,)

    @swagger_auto_schema()
    def get(self, request, *args, **kwargs):
        code = request.query_params.get('code', None)
        client_id = 'ce696f5a464cf2d45d2b8c9a68816b0b'
        redirect_uri = request.get_host() + '/member/login/kakao'
        token_url = 'https://kauth.kakao.com/oauth/token'

        parameter = {
            'grant_type': 'authorization_code',
            'client_id': client_id,
            'redirect_url': redirect_uri,
            'code': code,
            'client_secret': 'v4CfIRh29c4YFGAzpxXJGl0D4yWzeamM'
        }

        token_header = {
            'Content-type': 'application/x-www-form-urlencoded'
        }

        response = requests.post(token_url, parameter, token_header)
        data = response.json()
        access_token = data.get('access_token')
        user_info_url = 'https://kapi.kakao.com/v2/user/me'
        authorization = 'Bearer ' + access_token

        user_info_header = {
            "Authorization": authorization,
            "Content-type": "application/x-www-form-urlencoded"
        }

        user_info_response = requests.get(user_info_url, headers=user_info_header)
        user_info = user_info_response.json().get('kakao_account')

        profile = user_info.get('profile')
        email = user_info.get('email')
        birthyear = user_info.get('birthyear')
        birthday = user_info.get('birthday')
        gender = user_info.get('gender')
        nickname = email[:20]

        if profile:
            profile_image_url = profile.get('profile_image_url')
            profile_image = preprocess_profile(profile_image_url)
        else:
            profile_image = None

        if birthyear and birthday:
            birth = birthyear + birthday
        elif not birthyear and birthday:
            birth = '1896' + birthday
        else:
            birth = None

        if birth:
            birth = datetime.datetime.strptime(birth, '%Y%m%d').date()

        if gender:
            if gender == 'male':
                gender = 'M'
            else:
                gender = 'F'

        kwargs = {
            'email': email,
            'nickname': nickname,
            'profile': profile_image,
            'birth': birth,
            'gender': gender,
            'social': 'kakao',
        }

        return self.preprocess_login(request, *args, **kwargs)


class CheckToken(CustomGenericAPIView):
    serializer_class = TokenCheckSerializer
    permission_classes = [AllowAny]

    def check(self, request, *args, **kwargs):
        if kwargs.get('access_token'):
            data = {**kwargs, **request.COOKIES}
        else:
            data = {**request.data, **request.COOKIES}
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        return Response(data=serializer.validated_data, status=status.HTTP_200_OK)

    @swagger_auto_schema()
    def post(self, request, *args, **kwargs):
        return self.check(request, *args, **kwargs)
