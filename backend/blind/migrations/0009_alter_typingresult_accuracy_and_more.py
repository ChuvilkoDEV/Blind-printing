# Generated by Django 5.0.4 on 2024-05-11 20:40

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blind', '0008_typingresult_accuracy_typingresult_print_speed_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='typingresult',
            name='accuracy',
            field=models.FloatField(blank=True, null=True, verbose_name='Аккуратность'),
        ),
        migrations.AlterField(
            model_name='typingresult',
            name='print_speed',
            field=models.FloatField(blank=True, null=True, verbose_name='Количество символов в минуту'),
        ),
        migrations.AlterField(
            model_name='typingresult',
            name='user',
            field=models.ForeignKey(default='anonymous', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Имя пользователя'),
        ),
    ]