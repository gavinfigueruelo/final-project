from rest_framework import serializers
from .models import Community

class CommunitySerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    is_author = serializers.SerializerMethodField("created_by")

    def created_by(self, obj):
        request = self.context.get('request', None)
        return request.user == obj.author

    class Meta:
        model = Community
        fields = '__all__'
