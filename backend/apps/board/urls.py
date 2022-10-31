from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter(trailing_slash=False)
router.register('notice', NoticeBoardViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
