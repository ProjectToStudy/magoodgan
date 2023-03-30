from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import UntypedToken, RefreshToken, AccessToken

from apps.user.models import User


class CheckIDSerializer(serializers.ModelSerializer):
    uid = serializers.CharField(validators=[UniqueValidator(queryset=User.objects.all())])

    class Meta:
        model = User
        fields = ('uid', )


class CheckEmailSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())])

    class Meta:
        model = User
        fields = ('email', )


class CheckNicknameSerializer(serializers.ModelSerializer):
    nickname = serializers.CharField(validators=[UniqueValidator(queryset=User.objects.all())])

    class Meta:
        model = User
        fields = ('nickname', )


class UserSerializer(serializers.ModelSerializer):
    uid = serializers.CharField(validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(allow_null=True, write_only=True)
    name = serializers.CharField(required=False)
    nickname = serializers.CharField(required=False, validators=[UniqueValidator(queryset=User.objects.all())])
    email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())])
    contact = serializers.CharField(required=False, allow_null=True)
    residence = serializers.CharField(required=False, allow_null=True)
    homepage = serializers.URLField(required=False, allow_null=True)
    blog = serializers.URLField(required=False, allow_null=True)
    birth = serializers.DateField(required=False, allow_null=True)
    job = serializers.CharField(required=False, allow_null=True)
    profile = serializers.ImageField(required=False, allow_empty_file=True, use_url=False, allow_null=True)
    social = serializers.CharField(required=False, allow_null=True)
    mailing = serializers.BooleanField(default=False)
    message = serializers.ChoiceField(choices=['OPN', 'LMT', 'CLS'], default='OPN')

    class Meta:
        model = User
        fields = (
            'uid', 'password', 'name', 'nickname', 'email', 'contact', 'residence',
            'homepage', 'blog', 'birth', 'job', 'profile', 'social', 'mailing', 'message'
        )

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    uid = serializers.CharField()
    uuid = serializers.UUIDField(read_only=True)
    password = serializers.CharField(write_only=True)
    refresh_token = serializers.CharField(read_only=True)
    access_token = serializers.CharField(read_only=True)

    def validate(self, attrs):
        user = authenticate(**attrs)
        if user:
            token = TokenObtainPairSerializer.get_token(user)
            return {
                'uid': attrs['uid'],
                'uuid': user.uuid,
                'refresh_token': token,
                'access_token': token.access_token,
            }
        else:
            raise serializers.ValidationError('The email or password is wrong.')


class SocialLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    nickname = serializers.CharField(required=True)
    profile = serializers.ImageField(required=False, allow_empty_file=True, use_url=False, allow_null=True)
    gender = serializers.CharField(required=False, allow_null=True)
    birth = serializers.DateField(required=False, allow_null=True)
    social = serializers.CharField(required=True)

    def validate(self, attrs):
        try:
            user = User.objects.get(email=attrs['email'])
            if not user.is_active:
                self.context['view'].kwargs['uuid'] = user.uuid
                raise
            if user.social != attrs['social']:
                raise serializers.ValidationError(f'Log in to {user.social}.', code='does_not_match')
        except User.DoesNotExist:
            raise serializers.ValidationError('User does not exist.', code='does_not_exist')
        return attrs


class CheckTokenSerializer(serializers.Serializer):
    access_token = serializers.CharField(required=True)
    refresh_token = serializers.CharField(required=True)
    token_class = RefreshToken

    def validate(self, attrs):
        try:
            access_token = UntypedToken(attrs['access_token'])
        except TokenError:
            try:
                refresh = self.token_class(attrs['refresh_token'])
            except TokenError:
                raise serializers.ValidationError('The refresh token has expired or is not valid.')
            access_token = str(refresh.access_token)
        user_id = AccessToken(access_token).payload['user_id']
        user = User.objects.get(id=user_id)
        return {
            'access_token': AccessToken(access_token).token,
            'uuid': user.uuid,
            'email': user.email,
        }
