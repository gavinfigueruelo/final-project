from rest_framework import serializers
from .models import PlantJournal


class PlantJournal(serializers.Model.serializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = PlantJournal
        fields = '__all__'
