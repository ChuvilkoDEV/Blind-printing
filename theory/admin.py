from django.contrib import admin

from .models import *


class TheoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'slug')
    list_display_links = ('id', 'title')


admin.site.register(Theory, TheoryAdmin)
