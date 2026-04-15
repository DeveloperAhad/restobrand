from django.urls import path
from .views import MoodBoardGenerateView, MoodBoardDetailView

urlpatterns = [
    path('<uuid:restaurant_id>/generate/', MoodBoardGenerateView.as_view(), name='moodboard-generate'),
    path('<uuid:pk>/', MoodBoardDetailView.as_view(), name='moodboard-detail'),
]
