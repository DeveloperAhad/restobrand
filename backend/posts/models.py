import uuid
from django.db import models
from restaurants.models import Restaurant
from content.models import GeneratedAsset


class PostDraft(models.Model):
    """Social media post draft with scheduling."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='posts')
    asset = models.ForeignKey(GeneratedAsset, on_delete=models.CASCADE, related_name='posts', null=True, blank=True)
    
    # Platform-specific captions
    caption_ig = models.TextField(blank=True)  # Instagram (150 chars recommended)
    caption_fb = models.TextField(blank=True)  # Facebook (300 chars)
    caption_tiktok = models.TextField(blank=True)  # TikTok (100 chars)
    
    # Hashtags
    hashtags = models.JSONField(default=list)
    
    # Target platforms
    platforms = models.JSONField(default=list)  # ['instagram', 'facebook', 'tiktok']
    
    # Scheduling
    scheduled_at = models.DateTimeField(null=True, blank=True)
    published_at = models.DateTimeField(null=True, blank=True)
    celery_task_id = models.CharField(max_length=255, blank=True, null=True)
    
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('scheduled', 'Scheduled'),
        ('publishing', 'Publishing'),
        ('published', 'Published'),
        ('failed', 'Failed'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    failure_reason = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'post_drafts'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Post {self.status} - {self.restaurant.name}"


class SocialAccount(models.Model):
    """Connected social media accounts."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='social_accounts')
    
    PLATFORM_CHOICES = [
        ('instagram', 'Instagram'),
        ('facebook', 'Facebook'),
        ('tiktok', 'TikTok'),
    ]
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    
    platform_user_id = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    
    # Encrypted tokens (AES-Fernet)
    access_token_encrypted = models.TextField()
    refresh_token_encrypted = models.TextField(blank=True, null=True)
    token_expires_at = models.DateTimeField(null=True, blank=True)
    
    # OAuth scopes
    scopes = models.JSONField(default=list)
    
    is_active = models.BooleanField(default=True)
    connected_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'social_accounts'
        unique_together = ['restaurant', 'platform']
        ordering = ['platform']
    
    def __str__(self):
        return f"{self.platform} - {self.username}"
