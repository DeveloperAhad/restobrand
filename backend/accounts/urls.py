from django.urls import path
from .views import RegisterView, LoginView, LogoutView, UserProfileView, CreditBalanceView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('credits/', CreditBalanceView.as_view(), name='credit-balance'),
]
