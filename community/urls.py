from django.urls import path

from . import views

app_name = 'community'

urlpatterns = [
    path('community/', views.CommunityListView.as_view()),
    path('community/<int:pk>/', views.CommunityDetailView.as_view()),
]
