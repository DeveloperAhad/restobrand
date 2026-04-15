import uuid
from django.db import models
from accounts.models import User
from restaurants.models import Restaurant


class CreditLedger(models.Model):
    """Audit trail for all credit transactions."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='credit_ledger')
    restaurant = models.ForeignKey(Restaurant, on_delete=models.SET_NULL, null=True, blank=True, related_name='credit_ledger')
    
    ACTION_TYPE_CHOICES = [
        ('mood_board', 'Mood Board Generation'),
        ('banner_gen', 'Banner Generation'),
        ('motion_gen', 'Motion Generation'),
        ('meme_gen', 'Meme Generation'),
        ('snap_to_post', 'Snap-to-Post'),
        ('caption_gen', 'Caption Generation'),
        ('hashtag', 'Hashtag Generation'),
        ('topup', 'Credit Top-Up Purchase'),
        ('subscription_refill', 'Monthly Subscription Refill'),
        ('signup_bonus', 'Signup Bonus'),
    ]
    action_type = models.CharField(max_length=30, choices=ACTION_TYPE_CHOICES)
    
    credits_delta = models.IntegerField()  # Positive = added, Negative = consumed
    balance_after = models.IntegerField()  # Snapshot after transaction
    
    reference_id = models.CharField(max_length=255, blank=True, null=True)  # Links to asset/post
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'credit_ledger'
        ordering = ['-created_at']
    
    def __str__(self):
        sign = '+' if self.credits_delta > 0 else ''
        return f"{self.user.email}: {sign}{self.credits_delta} ({self.get_action_type_display()})"


class SubscriptionPlan(models.Model):
    """Subscription plan definitions (for reference)."""
    
    name = models.CharField(max_length=20, unique=True)  # free, starter, ultra, business
    price_monthly = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    monthly_credits = models.IntegerField(default=0)
    max_restaurants = models.IntegerField(default=1)
    topup_enabled = models.BooleanField(default=False)
    features = models.JSONField(default=list)
    
    class Meta:
        db_table = 'subscription_plans'
    
    def __str__(self):
        return self.name


class CreditTopUp(models.Model):
    """Credit top-up purchase records."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='topups')
    
    CREDIT_PACKAGES = [
        (100, 5.00),
        (300, 12.00),
        (1000, 35.00),
    ]
    
    credits_purchased = models.IntegerField()
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    
    stripe_payment_intent_id = models.CharField(max_length=255, blank=True, null=True)
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'credit_topups'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.email} - {self.credits_purchased} credits"
