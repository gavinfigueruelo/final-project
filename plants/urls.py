from django.urls import path

from . import views

app_name = 'plants'

urlpatterns = [
    path('user/plants/add/', views.add_plant),
    path('user/plants/', views.UserPlantListAPIView.as_view()),
    path('user/plants/<int:pk>/', views.PlantDetailAPIView.as_view()),
    path('user/plants/note/', views.NoteCreateAPIView.as_view()),
    path('user/plants/note/<int:pk>/', views.NoteDetailAPIView.as_view()),
    path('plants/search/', views.get_plants_by_name),
    path('plants/', views.get_plants),
]
