from django.urls import path, include

app_name = 'api_v1'

urlspatterns = [
    path('', include('plants.urls', namespace='planting')),
]
