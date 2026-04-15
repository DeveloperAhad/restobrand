import uuid
from django.db import models
from accounts.models import User


class Restaurant(models.Model):
    """Restaurant model with brand kit storage."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='restaurants')
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)
    
    # Restaurant details
    cuisine_type = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    currency = models.CharField(max_length=3, default='USD')
    
    # Brand tone
    TONE_CHOICES = [
        ('casual', 'Casual'),
        ('premium', 'Premium'),
        ('playful', 'Playful'),
        ('professional', 'Professional'),
    ]
    tone = models.CharField(max_length=20, choices=TONE_CHOICES, default='casual')
    
    LANGUAGE_CHOICES = [
        ('en', 'English'),
        ('es', 'Spanish'),
        ('fr', 'French'),
        ('ar', 'Arabic'),
        ('zh', 'Chinese'),
        ('other', 'Other'),
    ]
    language = models.CharField(max_length=20, choices=LANGUAGE_CHOICES, default='en')
    
    # Brand kit (JSONB for PostgreSQL, JSON for others)
    brand_kit = models.JSONField(default=dict, blank=True)
    
    # Logo and branding
    logo_url = models.URLField(blank=True, null=True)
    favicon_url = models.URLField(blank=True, null=True)
    bio = models.TextField(blank=True)
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'restaurants'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name
    
    def get_brand_colors(self):
        """Return brand colors as dict."""
        bk = self.brand_kit or {}
        return {
            'primary': bk.get('primary_color', '#1A1A2E'),
            'secondary': bk.get('secondary_color', '#E94560'),
            'accent': bk.get('accent_color', '#F7F6F4'),
        }
    
    def get_brand_fonts(self):
        """Return brand fonts."""
        bk = self.brand_kit or {}
        return {
            'heading': bk.get('heading_font', 'Inter'),
            'body': bk.get('body_font', 'Inter'),
        }
