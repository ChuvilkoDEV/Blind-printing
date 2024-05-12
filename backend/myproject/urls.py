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
from blind.views import IndexView, TheoryView, forum, LeaderboardView, practice, show_post, TheoryAPIView

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('home/', IndexView.as_view(), name='home'),
    path('admin/', admin.site.urls, name='admin'),
    path('forum/', forum, name='forum'),
    path('leaderboard/', LeaderboardView.as_view(), name='leaderboard'),
    path('practice/', practice, name='practice'),
    path('theory/', TheoryView.as_view(), name='theory'),
    path('theory/<slug:post_slug>/', show_post, name='theory_article'),
    path('users/', include('users.urls', namespace="users")),
    path('api/v1/theorylist/', TheoryAPIView.as_view())
]
