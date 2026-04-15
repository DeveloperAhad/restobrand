from rest_framework import serializers
from .models import BrandMoodBoard


class BrandMoodBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = BrandMoodBoard
        fields = '__all__'
        read_only_fields = ['id', 'restaurant', 'version', 'created_at']
