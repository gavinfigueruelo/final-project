from rest_framework import serializers
from .models import Plant


class PlantSerializer(serializers.ModelSerializer):

    class Meta:
        model = Plant
        fields = ('api_id', 'common_name', 'family', 'image_url', 'publication_year')
