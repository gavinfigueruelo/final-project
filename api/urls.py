from django.urls import path, include

app_name = 'api_v1'

urlpatterns = [
    # path('', include('plants.urls', namespace='plants')),
    path('', include('accounts.urls', namespace="accounts")),
]
