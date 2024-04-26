# Generated by Django 5.0.4 on 2024-04-25 17:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Theory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=64)),
                ('content', models.TextField(db_index=True, max_length=4096)),
                ('slug', models.SlugField(max_length=128)),
                ('date_of_publication', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]