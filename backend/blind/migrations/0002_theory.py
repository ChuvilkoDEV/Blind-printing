# Generated by Django 5.0.4 on 2024-04-26 13:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blind', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Theory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('slug', models.SlugField(max_length=255, unique=True, verbose_name='URL')),
                ('content', models.TextField(db_index=True, max_length=4096)),
                ('date_of_publication', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'Теория',
                'verbose_name_plural': 'Теория',
            },
        ),
    ]
