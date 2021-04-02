# Generated by Django 3.1.7 on 2021-04-02 15:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('plants', '0009_remove_note_title'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='plant',
            name='users',
        ),
        migrations.AddField(
            model_name='note',
            name='plant',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='plants.plant'),
        ),
        migrations.AddField(
            model_name='plant',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='plants/'),
        ),
        migrations.AddField(
            model_name='plant',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='note',
            name='upload',
            field=models.FileField(null=True, upload_to='notes/'),
        ),
    ]