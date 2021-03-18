from django.url import path

from .views import CommunityListView, CommunityDetailView

app_name = 'community'

urlpatterns = [
    path('', views.CommunityListView.as_view()),
    path('<int:pk>/', views.CommunityDetailView.as_view()),
    path('edit<int:pk>/', views.CommunityDetailView.as_view()),
]
