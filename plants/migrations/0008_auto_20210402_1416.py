# Generated by Django 3.1.7 on 2021-04-02 14:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plants', '0007_note'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='note',
            name='plant',
        ),
        migrations.AlterField(
            model_name='note',
            name='upload',
            field=models.FileField(null=True, upload_to='profile/'),
        ),
    ]
