from rest_framework import status, generics, permissions, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.text import slugify
from .models import Restaurant
from .serializers import RestaurantSerializer, RestaurantCreateSerializer


class RestaurantViewSet(viewsets.ModelViewSet):
    """CRUD operations for restaurants."""
    serializer_class = RestaurantSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Restaurant.objects.filter(owner=self.request.user, is_active=True)
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class RestaurantCreateView(generics.CreateAPIView):
    """Create restaurant during onboarding."""
    serializer_class = RestaurantCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        # Check plan limits
        user = request.user
        from django.conf import settings
        plan_limits = settings.PLAN_LIMITS.get(user.plan, settings.PLAN_LIMITS['free'])
        
        current_count = Restaurant.objects.filter(owner=user).count()
        if current_count >= plan_limits['restaurants']:
            return Response(
                {'error': f'Your plan allows maximum {plan_limits["restaurants"]} restaurant(s). Upgrade to add more.'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Auto-generate slug
        name = serializer.validated_data['name']
        base_slug = slugify(name)
        slug = base_slug
        counter = 1
        while Restaurant.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{counter}"
            counter += 1
        
        restaurant = Restaurant.objects.create(
            owner=user,
            slug=slug,
            **serializer.validated_data
        )
        
        return Response({
            'restaurant': RestaurantSerializer(restaurant).data,
            'message': 'Restaurant created successfully!'
        }, status=status.HTTP_201_CREATED)


class RestaurantDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Get, update, or delete a specific restaurant."""
    serializer_class = RestaurantSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Restaurant.objects.filter(owner=self.request.user)


class OnboardingWizardView(APIView):
    """Handle onboarding wizard completion."""
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        """Complete onboarding and create restaurant + mood board."""
        data = request.data
        
        # Step 1-3: Restaurant info from wizard
        restaurant_data = {
            'name': data.get('restaurant_name'),
            'cuisine_type': data.get('cuisine_type'),
            'city': data.get('city'),
            'country': data.get('country', 'US'),
            'tone': data.get('tone', 'casual'),
            'language': data.get('language', 'en'),
        }
        
        # Create restaurant
        serializer = RestaurantCreateSerializer(data=restaurant_data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        
        user = request.user
        base_slug = slugify(data.get('restaurant_name'))
        slug = base_slug
        counter = 1
        while Restaurant.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{counter}"
            counter += 1
        
        restaurant = Restaurant.objects.create(
            owner=user,
            slug=slug,
            **serializer.validated_data
        )
        
        # Trigger mood board generation (will be handled by branding app)
        return Response({
            'restaurant': RestaurantSerializer(restaurant).data,
            'next_step': 'brand_mood_board',
            'message': 'Restaurant created! Now generating your brand mood board...'
        })
