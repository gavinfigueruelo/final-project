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

class PlantListAPIView(generics.ListAPIView):
    serializer_class = PlantSerializer

    def get_queryset(self):
        user = self.request.user
        return user.plant_set.all()


class PlantDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Plant.objects.all()
    serializer_class = PlantSerializer


@api_view(['GET'])
def get_plants(request):
    # get initial plant list from trefle api
    response = requests.get(f"https://trefle.io/api/v1/plants?token={os.environ.get('TREFLE_TOKEN')}")
    return Response(response.json())


@api_view(['POST'])
def add_plant(request):
    # create the plant if it doesn't exists and add user to plant's user's list (many-to-many relationship)
    # import pdb; pdb.set_trace()
    plant, created = Plant.objects.get_or_create(
        api_id=request.data.get('api_id'),
        common_name=request.data.get('common_name'),
        family=request.data.get('family'),
        image_url=request.data.get('image_url'),
        publication_year=request.data.get('publication_year'),
        )
    plant.users.add(request.user)
    return Response("It worked")
