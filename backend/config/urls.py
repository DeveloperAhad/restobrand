from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/', include('accounts.urls')),
    path('api/v1/restaurants/', include('restaurants.urls')),
    path('api/v1/branding/', include('branding.urls')),
    # path('api/v1/content/', include('content.urls')),
    # path('api/v1/posts/', include('posts.urls')),
    # path('api/v1/subscriptions/', include('subscriptions.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
