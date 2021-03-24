from rest_framework import serializers
from .models import Plant


class PlantSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Plant
        fields = '__all__'

    def create(self, validated_data):
        user = self.request.user
        plant = Plant.objects.create(**validated_data)
        plant.users.add(user)
        return plant

    def update(self, instance, validated_data):
        user = self.request.user
        instance.users.add(user)
        return plant
