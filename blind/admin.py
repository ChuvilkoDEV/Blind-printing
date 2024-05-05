from django.contrib import admin

from .models import *


class TextTemplatesAdmin(admin.ModelAdmin):
    list_display = ('id', 'difficulty', 'character_count')
    list_display_links = ('difficulty', 'character_count')


class TheoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'slug')
    list_display_links = ('id', 'title')


admin.site.register(Theory, TheoryAdmin)
admin.site.register(TextTemplates, TextTemplatesAdmin)
