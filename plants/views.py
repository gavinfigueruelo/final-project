import os
import requests
from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework import generics, status, permissions
from .permissions import IsOwnerOrReadOnly
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import PlantSerializer, NoteSerializer, PlantDetailSerializer
from .models import Plant, Note

# User = get_user_model()

# Create your views here.

class UserPlantListAPIView(generics.ListCreateAPIView):
    serializer_class = PlantDetailSerializer
    # permission_classes = [permissions.IsAdminUser | IsOwnerOrReadOnly,]

    def get_queryset(self):
        return self.request.user.plant_set.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PlantDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Plant.objects.all()
    serializer_class = PlantDetailSerializer
    # permission_classes = [permissions.IsAdminUser | IsOwnerOrReadOnly,]

class NoteDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class NoteCreateAPIView(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


@api_view(['GET'])
@permission_classes((permissions.IsAuthenticatedOrReadOnly, ))
def get_plants_by_name(request):
    # import pdb; pdb.set_trace()
    query = request.query_params.get('q') #set up query to search
    response = requests.get(f"https://trefle.io/api/v1/plants/search?q={query}&token={os.environ.get('TREFLE_TOKEN')}")
    return Response(response.json())


# get initial plant list from trefle api
@api_view(['GET'])
@permission_classes((permissions.IsAuthenticatedOrReadOnly, ))
def get_plants(request):
    page = request.query_params.get('page') #set up query to search

    response = requests.get(f"https://trefle.io/api/v1/plants?token={os.environ.get('TREFLE_TOKEN')}&page={page}")
    return Response(response.json())




# create the plant if it doesn't exists and add user to plant's user's list (many-to-many relationship)
@api_view(['POST'])
def add_plant(request):
    request.data['user'] = request.user.id
    # api_id = request.data['api_id']
    #
    # try:
    #     Plant.objects.get(api_id=api_id)
    #     obj = Plant.objects.get(api_id=api_id)
    #     obj.users.add(request.user)
    #     serializer = PlantSerializer(obj)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED)
    # except Plant.DoesNotExist:
    serializer = PlantSerializer(data=request.data)
    if serializer.is_valid():
        obj = serializer.save()
        # obj.users.add(request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
