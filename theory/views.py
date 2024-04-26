from django.http import HttpResponse
from django.shortcuts import render
from .models import *
from django.views.generic import TemplateView

from blind.utils import DataMixin

# def theory(request):
#     posts =
#     data = {
#         "title": 'Theory',
#         "menu": menu,
#         'posts': posts,
#     }
#     return render(request, 'theory.html', data)


