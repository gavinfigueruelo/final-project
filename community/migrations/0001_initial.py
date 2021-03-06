# Generated by Django 3.1.7 on 2021-03-30 14:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Community',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('post', models.CharField(help_text='Ask a question or Leave a comment!', max_length=350)),
                ('image_upload', models.ImageField(null=True, upload_to='')),
            ],
        ),
    ]
