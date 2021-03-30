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

    # def __str__(self):
    #     return self.common_name[:50]

class Note(models.Model):
    pass
