from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['email', 'plan', 'credit_balance', 'is_active', 'date_joined']
    list_filter = ['plan', 'is_active', 'date_joined']
    search_fields = ['email', 'stripe_customer_id']
    ordering = ['-date_joined']
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Subscription', {'fields': ('plan', 'credit_balance', 'credits_expire_at')}),
        ('Stripe', {'fields': ('stripe_customer_id', 'stripe_subscription_id')}),
        ('Google Auth', {'fields': ('google_sub',)}),
    )
