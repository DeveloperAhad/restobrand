import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Custom user model with subscription and credit tracking."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    google_sub = models.CharField(max_length=255, blank=True, null=True, unique=True)
    
    # Subscription plan
    PLAN_CHOICES = [
        ('free', 'Free'),
        ('starter', 'Starter'),
        ('ultra', 'Ultra'),
        ('business', 'Business'),
    ]
    plan = models.CharField(max_length=20, choices=PLAN_CHOICES, default='free')
    
    # Credit balance
    credit_balance = models.IntegerField(default=0)
    credits_expire_at = models.DateTimeField(null=True, blank=True)
    
    # Stripe integration
    stripe_customer_id = models.CharField(max_length=255, blank=True, null=True)
    stripe_subscription_id = models.CharField(max_length=255, blank=True, null=True)
    
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    
    def __str__(self):
        return self.email
    
    def has_enough_credits(self, amount):
        return self.credit_balance >= amount
    
    def deduct_credits(self, amount, action_type, restaurant=None, reference_id=None):
        """Atomically deduct credits and create ledger entry."""
        from subscriptions.models import CreditLedger
        
        if not self.has_enough_credits(amount):
            return False
        
        self.credit_balance -= amount
        self.save(update_fields=['credit_balance'])
        
        CreditLedger.objects.create(
            user=self,
            restaurant=restaurant,
            action_type=action_type,
            credits_delta=-amount,
            balance_after=self.credit_balance,
            reference_id=reference_id
        )
        return True
    
    def add_credits(self, amount, action_type, restaurant=None, reference_id=None, expires_at=None):
        """Add credits to user account."""
        from subscriptions.models import CreditLedger
        
        self.credit_balance += amount
        if expires_at:
            self.credits_expire_at = expires_at
        self.save(update_fields=['credit_balance', 'credits_expire_at'])
        
        CreditLedger.objects.create(
            user=self,
            restaurant=restaurant,
            action_type=action_type,
            credits_delta=amount,
            balance_after=self.credit_balance,
            reference_id=reference_id
        )
