from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, UserRegistrationSerializer, LoginSerializer

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    """User registration endpoint."""
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Auto-login after registration
        login(request, user)
        
        return Response({
            'user': UserSerializer(user).data,
            'message': 'Registration successful. 50 credits added to your account!'
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    """User login endpoint."""
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        
        user = authenticate(request, username=email, password=password)
        
        if user:
            login(request, user)
            return Response({
                'user': UserSerializer(user).data,
                'message': 'Login successful'
            })
        
        return Response(
            {'error': 'Invalid email or password'},
            status=status.HTTP_401_UNAUTHORIZED
        )


class LogoutView(APIView):
    """User logout endpoint."""
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'})


class UserProfileView(generics.RetrieveUpdateAPIView):
    """Get and update user profile."""
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user


class CreditBalanceView(APIView):
    """Get user credit balance and history."""
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        user = request.user
        ledger_entries = user.credit_ledger.all()[:10]  # Last 10 transactions
        
        return Response({
            'credit_balance': user.credit_balance,
            'plan': user.plan,
            'credits_expire_at': user.credits_expire_at,
            'recent_transactions': [
                {
                    'action_type': entry.get_action_type_display(),
                    'credits_delta': entry.credits_delta,
                    'balance_after': entry.balance_after,
                    'created_at': entry.created_at.isoformat()
                }
                for entry in ledger_entries
            ]
        })
