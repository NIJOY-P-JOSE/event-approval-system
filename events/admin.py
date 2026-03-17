from django.contrib import admin
from .models import Event, EventCoordinator

admin.site.register(Event)
admin.site.register(EventCoordinator)