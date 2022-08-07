from rest_framework import serializers
from rest_framework.serializers import raise_errors_on_nested_writes
from rest_framework.validators import UniqueValidator

from .models import User


class UserSerializer(serializers.ModelSerializer):
    uid = serializers.CharField(validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(allow_null=True, write_only=True)
    name = serializers.CharField()
    nickname = serializers.CharField(validators=[UniqueValidator(queryset=User.objects.all())])
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

