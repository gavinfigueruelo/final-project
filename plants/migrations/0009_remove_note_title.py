# Generated by Django 3.1.7 on 2021-04-02 14:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('plants', '0008_auto_20210402_1416'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='note',
            name='title',
        ),
    ]
