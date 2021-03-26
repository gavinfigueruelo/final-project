# Generated by Django 3.1.7 on 2021-03-24 19:53

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('plants', '0004_auto_20210324_1800'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plant',
            name='users',
            field=models.ManyToManyField(blank=True, null=True, to=settings.AUTH_USER_MODEL),
        ),
    ]