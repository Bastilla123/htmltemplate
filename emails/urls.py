from django.urls import path, include
from emails import views



urlpatterns = [
    path('viewpage/', views.viewpage, name="viewpage"),
]