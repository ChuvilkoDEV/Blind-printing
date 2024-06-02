"""
URL configuration for myproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

import blind
from blind.views import IndexView, TheoryView, forum, LeaderboardView, practice, show_post, TheoryAPIView


schema_view = get_schema_view(
    openapi.Info(
        title="My API",
        default_version='v1',
        description="API для практики скорости печати",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@myapi.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('home/', IndexView.as_view(), name='home'),
    path('admin/', admin.site.urls, name='admin'),
    path('forum/', forum, name='forum'),
    path('leaderboard/', LeaderboardView.as_view(), name='leaderboard'),
    path('practice/', practice, name='practice'),
    path('theory/', TheoryView.as_view(), name='theory'),
    path('theory/<slug:post_slug>/', show_post, name='theory_article'),

    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path('api/v1/theorylist/', blind.views.TheoryAPIView.as_view()),
    path('api/v1/random-text/', blind.views.RandomTextView.as_view(), name='random-text'),
]
