from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.serializers import raise_errors_on_nested_writes
from rest_framework.validators import UniqueValidator

from .models import User


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
            'uid', 'password', 'name', 'nickname', 'email', 'contact', 'residence', 'homepage', 'blog', 'birth', 'job', 'profile', 'social', 'mailing', 'message'
        )

    def create(self, validated_data):
        raise_errors_on_nested_writes('create', self, validated_data)
        ModelClass = self.Meta.model
        instance = ModelClass._default_manager.create_user(**validated_data)
        return instance


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)

    def validate_email(self, value):
        try:
            user = User.objects.get(email=value)
            if user.social:
                raise serializers.ValidationError(f'Log in with {user.social}.', code='not_own_account')
        except User.DoesNotExist:
            pass
        return value

    def validate(self, attrs):
        user = authenticate(**attrs)
        if not user:
            raise serializers.ValidationError('The email or password is wrong.')
        return attrs


class SocialLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    nickname = serializers.CharField(required=True)
    profile = serializers.ImageField(required=False, allow_empty_file=True, use_url=False, allow_null=True)
    gender = serializers.CharField(required=False, allow_null=True)
    birth = serializers.DateField(required=False, allow_null=True)
    social = serializers.CharField(required=True)

    def validate(self, attrs):
        user = User.objects.get(email=attrs['email'])
        if not user.is_active:
            self.context['view'].kwargs['uuid'] = user.uuid
            raise NeedsAgreementException
        if user.social != attrs['social']:
            raise serializers.ValidationError(f'Log in to {user.social}.', code='does_not_match')
        return attrs


class ActivateSerializer(serializers.Serializer):
    user = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='uuid', write_only=True)

    def validate(self, attrs):
        user = attrs['user']
        if user.is_active:
            raise ActivateException
        return attrs
