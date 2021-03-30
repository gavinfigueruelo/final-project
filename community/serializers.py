from rest_framework import serializers
from .models import Community

class CommunitySerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Community
        fields = '__all__'
