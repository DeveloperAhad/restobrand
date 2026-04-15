import json
from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
from .models import BrandMoodBoard
from restaurants.models import Restaurant


class MoodBoardGenerateView(APIView):
    """Generate brand mood board using AI."""
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, restaurant_id):
        """Generate mood board for a restaurant."""
        try:
            restaurant = Restaurant.objects.get(id=restaurant_id, owner=request.user)
        except Restaurant.DoesNotExist:
            return Response({'error': 'Restaurant not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Check credits
        user = request.user
        cost = settings.CREDIT_COSTS['mood_board']
        
        if not user.has_enough_credits(cost):
            return Response(
                {'error': f'Insufficient credits. Need {cost} credits for mood board generation.'},
                status=status.HTTP_402_PAYMENT_REQUIRED
            )
        
        # Get wizard data from request
        data = request.data
        
        # Simulate AI generation (in production, call Gemma API)
        # This is a mock implementation - replace with actual AI call
        brand_kit = self._generate_mock_brand_kit(data, restaurant)
        
        # Deduct credits
        user.deduct_credits(cost, 'mood_board', restaurant)
        
        # Create or update mood board
        mood_board, created = BrandMoodBoard.objects.update_or_create(
            restaurant=restaurant,
            defaults={
                **brand_kit,
                'version': (restaurant.mood_board.version + 1) if hasattr(restaurant, 'mood_board') else 1
            }
        )
        
        # Update restaurant brand_kit
        restaurant.brand_kit = mood_board.to_dict()
        restaurant.save(update_fields=['brand_kit'])
        
        return Response({
            'mood_board': {
                'id': str(mood_board.id),
                'colors': {
                    'primary': mood_board.primary_color,
                    'secondary': mood_board.secondary_color,
                    'accent': mood_board.accent_color,
                },
                'fonts': {
                    'heading': mood_board.heading_font,
                    'body': mood_board.body_font,
                },
                'tone': mood_board.tone,
                'visual_style': mood_board.visual_style,
                'voice_keywords': mood_board.voice_keywords,
                'imagery_style': mood_board.imagery_style,
            },
            'credits_remaining': user.credit_balance,
            'message': 'Brand mood board generated successfully!'
        })
    
    def _generate_mock_brand_kit(self, data, restaurant):
        """Generate mock brand kit based on inputs."""
        tone = data.get('tone', restaurant.tone)
        vibe_words = data.get('vibe_words', ['warm', 'cozy', 'traditional'])
        
        # Color palettes based on tone
        palettes = {
            'casual': {'primary': '#1A1A2E', 'secondary': '#E94560', 'accent': '#F7F6F4'},
            'premium': {'primary': '#0D1B2A', 'secondary': '#C9A227', 'accent': '#F8F8F8'},
            'playful': {'primary': '#FF6B6B', 'secondary': '#4ECDC4', 'accent': '#FFE66D'},
            'professional': {'primary': '#2C3E50', 'secondary': '#3498DB', 'accent': '#ECF0F1'},
        }
        
        colors = palettes.get(tone, palettes['casual'])
        
        return {
            'primary_color': colors['primary'],
            'secondary_color': colors['secondary'],
            'accent_color': colors['accent'],
            'heading_font': 'Inter',
            'body_font': 'Inter',
            'tone': tone,
            'visual_style': data.get('visual_style', 'warm'),
            'voice_keywords': vibe_words[:3],
            'imagery_style': f"{tone} {restaurant.cuisine_type} restaurant aesthetic",
            'raw_ai_output': {},
        }


class MoodBoardDetailView(generics.RetrieveUpdateAPIView):
    """Get and update mood board."""
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return BrandMoodBoard.objects.filter(restaurant__owner=self.request.user)
    
    def get_serializer_class(self):
        from .serializers import BrandMoodBoardSerializer
        return BrandMoodBoardSerializer
