from datetime import datetime

import requests
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from apps.user.models import User
from apps.user.serializers import UserSerializer, LoginSerializer, CheckIDSerializer, CheckEmailSerializer, \
    CheckNicknameSerializer, SocialLoginSerializer, CheckTokenSerializer
from common.mixins import CheckModelMixin, LoginMixin
from common.utils import preprocess_profile


class CheckID(CheckModelMixin, GenericAPIView):
    queryset = User.objects.all()
    serializer_class = CheckIDSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        """
        ID 중복 확인

        ___
        check
        """
        return self.check(request, *args, **kwargs)


class CheckEmail(CheckModelMixin, GenericAPIView):
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


class CheckNickname(CheckModelMixin, GenericAPIView):
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


class LoginView(LoginMixin, GenericAPIView):
    queryset = User.objects.all()
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        """
        로그인

        ___
        login
        """
        return self.login(request, *args, **kwargs)


class KakaoLoginView(CreateModelMixin, LoginMixin, GenericAPIView):
    serializer_class = SocialLoginSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        code = request.query_params.get('code', None)
        client_id = 'b01a0f1848a2d09c9756246fdaa22c1f'
        redirect_uri = request.scheme + '://' + request.get_host() + '/user/login/kakao'
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
        access_token = data.get('access_token', None)
        user_info_url = 'https://kapi.kakao.com/v2/user/me'
        authorization = 'Bearer ' + access_token

        user_info_header = {
            "Authorization": authorization,
            "Content-type": "application/x-www-form-urlencoded"
        }

        user_info = requests.get(user_info_url, headers=user_info_header)
        info = user_info.json().get('kakao_account', None)

        profile = info.get('profile', None)
        email = info.get('email', None)
        birthyear = info.get('birthyear', None)
        birthday = info.get('birthday', None)
        gender = info.get('gender', None)
        nickname = email[:20]

        if profile:
            profile_image_url = profile.get('profile_image_url', None)
            profile_image = preprocess_profile(profile_image_url)
        else:
            profile_image = None

        if not birthyear:
            birthyear = '1004'

        if birthyear and birthday:
            birth = birthyear + birthday
            datetime.strptime(birth, '%Y%m%d').date()
        else:
            birth = None

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

        return self.login(request, *args, **kwargs)



class CheckToken(GenericAPIView):
    serializer_class = CheckTokenSerializer
    permission_classes = [AllowAny]

    def check(self, request, *args, **kwargs):
        if kwargs.get('access_token'):
            print(kwargs)
            data = {**kwargs, **request.COOKIES}
            print(data)
        else:
            data = {**request.data, **request.COOKIES}
            print(data)
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        return Response(data=serializer.validated_data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        """
        토큰 확인

        ___
        check
        """
        return self.check(request, *args, **kwargs)
