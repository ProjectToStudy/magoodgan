import copy

from rest_framework.generics import GenericAPIView, get_object_or_404

from magoodgan.exceptions import NeedsAgreementException
from magoodgan.mixins import LoginMixin
from user.models import User
from user.serializers import UserSerializer


class CustomGenericAPIView(GenericAPIView):
    action = None
    lookup_kwargs = None
    path_segment = None

    def get_lookup_kwargs(self):
        kwargs = copy.deepcopy(self.kwargs)
        if self.lookup_kwargs[self.action] and self.lookup_kwargs[self.action] not in kwargs:
            kwargs[self.lookup_kwargs[self.action]] = kwargs.pop(self.path_segment)
        return kwargs

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())

        if not isinstance(self.lookup_field[self.action], list):
            self.lookup_field[self.action] = [self.lookup_field[self.action]]
        filter_kwargs = dict()
        for i in self.lookup_field[self.action]:
            assert i in self.request.data or self.kwargs, (
                    'Expected view %s to be called with a URL keyword argument '
                    'named "%s". Fix your URL conf, or set the `.lookup_field` '
                    'attribute on the view correctly.' %
                    (self.__class__.__name__, self.lookup_field)
            )

            filter_kwargs[i] = self.get_lookup_kwargs()[i] if i in self.get_lookup_kwargs() else self.request.data[i]

        if 'user' in filter_kwargs:
            filter_kwargs['user__uuid'] = filter_kwargs.pop('user')

        obj = get_object_or_404(queryset, **filter_kwargs)

        self.check_object_permissions(self.request, obj)

        return obj


class SocialLoginCallback(LoginMixin, CustomGenericAPIView):

    def get(self, request, *args, **kwargs):
        pass

    def preprocess_login(self, request, *args, **kwargs):
        self.action = 'login'
        try:
            serializer = self.get_serializer(data=kwargs, context=self.get_serializer_context())
            serializer.is_valid(raise_exception=True)
            self.kwargs['validated_data'] = serializer.validated_data
        except User.DoesNotExist:
            kwargs['password'] = None
            serializer = UserSerializer(data=kwargs, context=self.get_serializer_context())
            serializer.is_valid(raise_exception=True)
            self.kwargs['validated_data'] = serializer.validated_data
            serializer.save()
            raise NeedsAgreementException
        return self.login(request, *args, **kwargs)
