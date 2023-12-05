# liveWA/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('json/', include('djangojson.urls')),  # Inclua as rotas do seu aplicativo Django aqui
    # ... outras rotas, se houver
]
