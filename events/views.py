from django.shortcuts import render

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Event

@api_view(["GET"])
def events_list(request):
    events = Event.objects.all().values()
    return Response([
  {
    "id": 1,
    "name": "Hackathon 2026",
    "department": "Computer Science",
    "date": "2026-03-20",
    "venue": "Main Auditorium",
    "coordinator": "Dr. Smith",
    "status": "approved"
  }
])