from django.db import models
from django.conf import settings

# Create your models here.
class Community(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE, null = True)
    post = models.CharField(max_length=350, help_text='Ask a question or Leave a comment!')
    image_upload = models.ImageField(null = True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.post
