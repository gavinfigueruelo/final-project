from django.url import path

from .views import PlantJournalListView, PlantJournalDetailView

app_name = 'plants'

urlpatterns = [
    path('', views.PlantJournalListView.as_view()),
    path('<int:pk>/', views.PlantJournalDetailView.as_view()),
    path('edit<int:pk>/', views.PlantJournalDetailView.as_view()),
]
