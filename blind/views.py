from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import TemplateView
from .models import *

from blind.utils import DataMixin


class IndexView(DataMixin, TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return self.get_mixin_context(context, title='Главная страница')


class TheoryView(DataMixin, TemplateView):
    template_name = 'theory.html'
    extra_context = {
        'title': 'Теория',
        'posts': Theory.objects.all()
    }

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return self.get_mixin_context(context)


def show_post(request, post_slug):
    return HttpResponse("Страница поста " + post_slug)


def forum(request):
    return HttpResponse("Страница форума")


def competition(request):
    return HttpResponse("Страница соревнований")


def practice(request):
    return HttpResponse("Страница практики")
