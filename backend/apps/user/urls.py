from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter(trailing_slash=False)
router.register('users', UserViewSet)

urlpatterns = [
    path('check/id', CheckID.as_view()),
    path('check/email', CheckEmail.as_view()),
    path('check/nickname', CheckNickname.as_view()),
    path('', include(router.urls)),
    path('login', LoginView.as_view())
]
