import requests
from rest_framework import generics, status, permissions
from django.shortcuts import render
from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
#to use generic views
from .models import Profile
from .serializers import ProfileSerializer

class ProfileListView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_object(self):
        return get_object_or_404(Profile, user=self.request.user)


class ProfileRetrieveView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_object(self):
        user = self.request.user
        return user

# @api_view(['POST'])
# def update_user(request):
#
#     try:
#         profile = Profile.objects.get(user=request.user)
#         serializer = ProfileSerializer(obj)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     except Profile.DoesNotExist:
#         serializer = ProfileSerializer(data=request.data)
#         if serializer.is_valid():
#             obj = serializer.save()
#             obj.users.add(request.user)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
