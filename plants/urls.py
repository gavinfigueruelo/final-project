from django.urls import path

from . import views

app_name = 'plants'

urlpatterns = [
    path('user/plants/add/', views.add_plant),
    path('user/plants/', views.PlantListAPIView.as_view()),
    path('<int:pk>/', views.PlantDetailAPIView.as_view()),
    path('trefle/plants/', views.get_plants),
]
