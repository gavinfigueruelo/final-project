from django.db import models

# Create your models here.
class Community(models.Model):
    title = models.CharField(max_length=50)
    # author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE, null = True)
    post = models.CharField(max_length=350, help_text='Ask a question or Leave a comment!')
    image_upload = models.ImageField(null = True)

    def __str__(self):
        return self.title[:50]
