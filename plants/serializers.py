from rest_framework import serializers
from .models import Plant, Note


class PlantSerializer(serializers.ModelSerializer):

    class Meta:
        model = Plant
        fields = '__all__'

class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = '__all__'

class PlantDetailSerializer(serializers.ModelSerializer):
    notes = NoteSerializer(many=True, read_only=True)

    class Meta:
        model = Plant
        fields = ('common_name', 'family', 'image', 'image_url', 'publication_year', 'api_id', 'user', 'notes')
