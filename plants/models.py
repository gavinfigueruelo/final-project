from django.db import models

# Create your models here.
class PlantJournal(models.Model):
    title = models.CharField(max_length=50)
    text = models.CharField(max_length=500, help_text='Start a journal on a plant!')
    image_upload = models.ImageField(null = True)
    # author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE, null = True)

    def __srt__(self):
        return self.title[:50]
