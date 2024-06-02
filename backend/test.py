
# Настройки Django Rest Framework (при необходимости)
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ],
}

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TextTemplates
from .serializers import TextTemplatesSerializer