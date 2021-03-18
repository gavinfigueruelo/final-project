from django.shortcuts import render
from rest_framework import generics
from .serializers import CommunitySerializer
from .import models

# Create your views here.
class CommunityListView(generics, ListCreateAPIView):
    queryset = models.Community.objects.all()
    serializer_class = CommunitySerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class CommunityDetailView(generics, RetrieveUpdateDestroyAPIView):
    queryset = models.Community.objects.all()
    serializer_class = CommunitySerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
