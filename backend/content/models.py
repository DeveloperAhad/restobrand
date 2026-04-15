import uuid
from django.db import models
from restaurants.models import Restaurant


class GeneratedAsset(models.Model):
    """AI-generated or uploaded asset (banners, memes, photos, motion)."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='assets')
    
    ASSET_TYPE_CHOICES = [
        ('banner', 'Banner'),
        ('motion', 'Motion Video'),
        ('snap_photo', 'Snap-to-Post Photo'),
        ('meme', 'Meme'),
        ('upload', 'User Upload'),
    ]
    asset_type = models.CharField(max_length=20, choices=ASSET_TYPE_CHOICES)
    
    # File storage
    file_url = models.URLField()
    cloudinary_public_id = models.CharField(max_length=255, blank=True, null=True)
    
    # Source tracking
    SOURCE_CHOICES = [
        ('banner_gen', 'Banner Generation'),
        ('motion_gen', 'Motion Generation'),
        ('snap_to_post', 'Snap-to-Post'),
        ('meme_gen', 'Meme Generation'),
        ('upload', 'User Upload'),
    ]
    source = models.CharField(max_length=20, choices=SOURCE_CHOICES)
    
    # AI generation metadata
    prompt_used = models.TextField(blank=True)
    brand_kit_version = models.IntegerField(default=1)
    fal_request_id = models.CharField(max_length=255, blank=True, null=True)
    
    # Aspect ratio
    ASPECT_RATIO_CHOICES = [
        ('1:1', 'Square (1:1)'),
        ('9:16', 'Story/Reel (9:16)'),
        ('16:9', 'Landscape (16:9)'),
        ('1.91:1', 'Facebook (1.91:1)'),
    ]
    aspect_ratio = models.CharField(max_length=10, default='1:1')
    
    # Additional metadata
    metadata = models.JSONField(default=dict, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'generated_assets'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.get_asset_type_display()} - {self.restaurant.name}"


class MemeContent(models.Model):
    """Meme content with text overlays."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='memes')
    
    # Meme concept
    concept_text = models.TextField()  # The humor premise
    top_text = models.CharField(max_length=255, blank=True)
    bottom_text = models.CharField(max_length=255, blank=True)
    
    FORMAT_CHOICES = [
        ('top_bottom', 'Top/Bottom Text'),
        ('comparison', 'Comparison'),
        ('pov', 'POV'),
        ('nobody', 'Nobody:/Restaurant:'),
    ]
    format = models.CharField(max_length=20, choices=FORMAT_CHOICES)
    
    # Linked asset
    asset = models.OneToOneField(GeneratedAsset, on_delete=models.CASCADE, related_name='meme')
    
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('approved', 'Approved'),
        ('scheduled', 'Scheduled'),
        ('published', 'Published'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'meme_content'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Meme: {self.concept_text[:50]}"
