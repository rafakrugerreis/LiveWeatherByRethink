# djangojson/urls.py

from django.urls import path
from .views import dados_json, micropar

urlpatterns = [
    path('dados/', dados_json, name='dados_json'),
    path('microparticulas/', micropar, name='micropar'),
    # ... outras rotas, se houver
]
