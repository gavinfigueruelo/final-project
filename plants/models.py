from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

# Create your models here.
class Plant(models.Model):
    common_name = models.CharField(max_length=255, null=True)
    family = models.CharField(max_length=255, null=True)
    image_url = models.URLField(null=True)
    publication_year = models.SmallIntegerField(null=True)
    users = models.ManyToManyField(User)

    def __srt__(self):
        return self.common_name[:50]
