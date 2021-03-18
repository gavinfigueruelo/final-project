from django.shortcuts import render
from rest_framework import generics
from .serializers import PlantJournalSerializer
from . import models


# Create your views here.

class PlantJournalListView(generics, ListCreateAPIView):
    queryset = PlantJournal.objects.all()
    serializer_class = PlantJournalSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PlantJournalDetailView(generics, RetrieveUpdateDestroyAPIView):
    queryset = models.PlantJournal.objects.all()
    serializer_class = PlantJournalSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
