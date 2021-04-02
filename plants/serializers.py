from rest_framework import serializers
from .models import Plant, Note


class PlantSerializer(serializers.ModelSerializer):

    class Meta:
        model = Plant
        fields = '__all__'

class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = ('entry', 'upload',)
