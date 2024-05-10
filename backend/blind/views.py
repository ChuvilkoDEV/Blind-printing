from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.generic import TemplateView
from .models import *
import json
import django_tables2 as tables

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
        data = json.loads(request.body)
        result = TypingResult.objects.create(
            user=request.user,
            characters_typed=data['characters_typed'],
            errors_count=data['errors_count'],
            time_taken=data['time_taken'],
            print_speed=data['print_speed'],
            accuracy=data['accuracy'],
        )
        result.save()
        return JsonResponse({'message': 'POST request received'})


class TheoryView(DataMixin, TemplateView):
    template_name = 'theory.html'
    extra_context = {
        'title': 'Теория',
        'posts': Theory.objects.all()
    }

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return self.get_mixin_context(context)


class TypingResultTable(tables.Table):
    user = tables.Column(accessor='user.username', verbose_name='Имя пользователя')
    accuracy = tables.Column(verbose_name='Точность')
    print_speed = tables.Column(verbose_name='Скорость печати')
    time_taken = tables.Column(verbose_name='Затраченное время')
    created_at = tables.Column(verbose_name='Дата')

    class Meta:
        model = TypingResult
        fields = ('user', 'accuracy', 'print_speed', 'time_taken', 'created_at')


class LeaderboardView(DataMixin, tables.SingleTableView):
    table_class = TypingResultTable
    queryset = TypingResult.objects.all()
    template_name = "leaderboard.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return self.get_mixin_context(context)

def show_post(request, post_slug):
    return HttpResponse("Страница поста " + post_slug)


def forum(request):
    return render(request, 'index.html')


def practice(request):
    return HttpResponse("Страница практики")
