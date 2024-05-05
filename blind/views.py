from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.generic import TemplateView
from .models import *
import json

from blind.utils import DataMixin


class IndexView(DataMixin, TemplateView):
    template_name = 'index.html'
    extra_context = {
        'title': 'Главная страница',
    }

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs, textTemplates=TextTemplates.objects.random().text)
        return self.get_mixin_context(context, )

    def post(self, request, *args, **kwargs):
        # Обработка POST-запроса
        data = json.loads(request.body)  # Получаем данные из POST-запроса
        # Здесь можно выполнить нужные действия с данными, например, сохранить их в базе данных
        return JsonResponse({'message': 'POST request received', 'data': data})


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
    return render(request, 'test.html')


def competition(request):
    return HttpResponse("Страница соревнований")


def practice(request):
    return HttpResponse("Страница практики")
