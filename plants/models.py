from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

# Create your models here.
class Plant(models.Model):
    common_name = models.CharField(max_length=255, null=True)
    family = models.CharField(max_length=255, null=True)
    image_url = models.URLField(null=True)
    publication_year = models.SmallIntegerField(null=True)
    api_id = models.IntegerField(unique=True, null=True)
    users = models.ManyToManyField(User, blank=True)

    def __str__(self):
        return self.common_name

class Note(models.Model):
    entry = models.CharField(max_length=500, null=True)
    upload = models.FileField(upload_to='profile/', null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    # has to have a realationship to a plant and to a user

    def __str__(self):
        return self.title
