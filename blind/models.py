from random import randint

from django.db import models
from django.db.models import Count
from django.urls import reverse


class TextTemplatesManager(models.Manager):
    def random(self):
        count = self.aggregate(count=Count('id'))['count']
        random_index = randint(0, count - 1)
        return self.all()[random_index]


class TextTemplates(models.Model):
    text = models.TextField()
    difficulty = models.CharField(max_length=10, choices=[('Easy', 'Easy'), ('Medium', 'Medium'), ('Hard', 'Hard')],
                                  default='Medium')
    character_count = models.IntegerField(blank=True, null=True)

    objects = TextTemplatesManager()

    class Meta:
        verbose_name = 'Текст'
        verbose_name_plural = 'Текста'


class Theory(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")
    content = models.TextField(max_length=4096, db_index=True)
    date_of_publication = models.DateTimeField(auto_now_add=True)

    def get_absolute_url(self):
        return reverse('post', kwargs={'post_slug': self.slug})

    class Meta:
        verbose_name = 'Теория'
        verbose_name_plural = 'Теория'
