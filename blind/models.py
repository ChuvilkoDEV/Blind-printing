from django.db import models
from django.urls import reverse


class Text(models.Model):
    difficulty = models.CharField(max_length=15)
    text = models.TextField()


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