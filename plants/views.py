import os
import requests
from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import PlantSerializer
from .models import Plant

# User = get_user_model()

# Create your views here.

class PlantListAPIView(generics.ListCreateAPIView):
    serializer_class = PlantSerializer

    def get_queryset(self):
        user = self.request.user
        return user.plant_set.all()


class PlantDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Plant.objects.all()
    serializer_class = PlantSerializer


@api_view(['GET'])
def get_plants(request):
    response = requests.get(f"https://trefle.io/api/v1/plants?token={os.environ.get('TREFLE_TOKEN')}")
    return Response(response.json())
