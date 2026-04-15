import uuid
from django.db import models
from restaurants.models import Restaurant


class BrandMoodBoard(models.Model):
    """Brand identity mood board for a restaurant."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    restaurant = models.OneToOneField(Restaurant, on_delete=models.CASCADE, related_name='mood_board')
    
    # Colors
    primary_color = models.CharField(max_length=7, default='#1A1A2E')  # Hex
    secondary_color = models.CharField(max_length=7, default='#E94560')
    accent_color = models.CharField(max_length=7, default='#F7F6F4')
    
    # Fonts
    heading_font = models.CharField(max_length=50, default='Inter')
    body_font = models.CharField(max_length=50, default='Inter')
    
    # Tone and style
    TONE_CHOICES = [
        ('casual', 'Casual'),
        ('premium', 'Premium'),
        ('playful', 'Playful'),
        ('professional', 'Professional'),
    ]
    tone = models.CharField(max_length=20, choices=TONE_CHOICES, default='casual')
    
    VISUAL_STYLE_CHOICES = [
        ('minimal', 'Minimal'),
        ('bold', 'Bold'),
        ('rustic', 'Rustic'),
        ('modern', 'Modern'),
        ('warm', 'Warm'),
    ]
    visual_style = models.CharField(max_length=20, choices=VISUAL_STYLE_CHOICES, default='warm')
    
    # Brand voice keywords (3 words)
    voice_keywords = models.JSONField(default=list)  # Array of 3 strings
    
    # Imagery style description
    imagery_style = models.TextField(blank=True)
    
    # Raw AI output for audit
    raw_ai_output = models.JSONField(default=dict, blank=True)
    
    version = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'brand_mood_boards'
        ordering = ['-version']
    
    def __str__(self):
        return f"{self.restaurant.name} - Mood Board v{self.version}"
    
    def to_dict(self):
        """Return brand kit as dictionary for AI prompts."""
        return {
            'primary_color': self.primary_color,
            'secondary_color': self.secondary_color,
            'accent_color': self.accent_color,
            'heading_font': self.heading_font,
            'body_font': self.body_font,
            'tone': self.tone,
            'visual_style': self.visual_style,
            'voice_keywords': self.voice_keywords,
            'imagery_style': self.imagery_style,
        }
