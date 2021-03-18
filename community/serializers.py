from rest_framework import serializers
from .models import Community

class Community(serializers.models.serializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Community
        fields = '__all__'
