from rest_framework import serializers
from .models import Restaurant


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'slug', 'cuisine_type', 'city', 'country', 
                  'currency', 'tone', 'language', 'brand_kit', 'logo_url', 
                  'favicon_url', 'bio', 'is_active', 'created_at']
        read_only_fields = ['id', 'slug', 'created_at', 'owner']
    
    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)


class RestaurantCreateSerializer(serializers.ModelSerializer):
    """Serializer for onboarding wizard."""
    
    class Meta:
        model = Restaurant
        fields = ['name', 'cuisine_type', 'city', 'country', 'tone', 'language']
    
    def validate_cuisine_type(self, value):
        # Validate against allowed cuisine types
        allowed = ['Italian', 'Mediterranean', 'Asian', 'American', 'Mexican',
                   'Middle Eastern', 'French', 'Indian', 'Japanese', 'Other']
        if value not in allowed:
            raise serializers.ValidationError(f"Cuisine type must be one of: {allowed}")
        return value
