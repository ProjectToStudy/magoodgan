from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import *

urlpatterns = [
    path('users', ManageUsers.as_view()),
    path('auth/activate/<uuid:user>', ActivateUser.as_view()),
    path('auth/login/check', CheckToken.as_view()),
    path('auth/login/kakao', KakaoCallback.as_view())
    ]
