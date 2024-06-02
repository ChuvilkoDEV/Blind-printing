from random import randint

from django.db import models
from django.db.models import Count
from django.urls import reverse
from authentication.models import User
from django.db.models import F, Func, Value


class TextTemplatesManager(models.Manager):
    def random(self):
        count = self.aggregate(count=Count('id'))['count']
        random_index = randint(0, count - 1)
        return self.all()[random_index]


class TextTemplates(models.Model):
    text = models.TextField(verbose_name="Текст")
    difficulty = models.CharField(max_length=10, choices=[('Easy', 'Easy'), ('Medium', 'Medium'), ('Hard', 'Hard')],
                                  default='Medium', verbose_name="Сложность")
    character_count = models.IntegerField(blank=True, null=True, verbose_name="Количество символов")

    objects = TextTemplatesManager()

    class Meta:
        verbose_name = 'Текст'
        verbose_name_plural = 'Текста'


class TypingResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Имя пользователя', default='anonymous')
    characters_typed = models.IntegerField(verbose_name='Количество символов')
    errors_count = models.IntegerField(verbose_name='Количество ошибок')
    time_taken = models.IntegerField(verbose_name='Время')
    accuracy = models.FloatField(verbose_name='Аккуратность', blank=True, null=True)
    print_speed = models.FloatField(verbose_name='Количество символов в минуту', blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата')

    def __str__(self):
        return f'{self.user.username} - {self.created_at}'


class TheoryManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().annotate(short_text=Func(F('content'), Value(50), function='LEFT', output_field=models.CharField()))


class Theory(models.Model):
    title = models.CharField(max_length=200, verbose_name="Заголовок")
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")
    content = models.TextField(db_index=True, verbose_name="Текст")
    date_of_publication = models.DateTimeField(auto_now_add=True, verbose_name="Дата публикации")
    image = models.CharField(max_length=200, blank=True, null=True)

    objects = models.Manager()
    preview = TheoryManager()

    def get_absolute_url(self):
        return reverse('post', kwargs={'post_slug': self.slug})

    class Meta:
        verbose_name = 'Теория'
        verbose_name_plural = 'Теория'
