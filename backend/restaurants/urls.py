from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RestaurantViewSet, RestaurantCreateView, RestaurantDetailView, OnboardingWizardView

router = DefaultRouter()
router.register(r'', RestaurantViewSet, basename='restaurant')

urlpatterns = [
    path('', include(router.urls)),
    path('create/', RestaurantCreateView.as_view(), name='restaurant-create'),
    path('onboarding/', OnboardingWizardView.as_view(), name='onboarding-wizard'),
    path('<uuid:pk>/', RestaurantDetailView.as_view(), name='restaurant-detail'),
]
