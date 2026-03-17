from django.shortcuts import render

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Event
from .serializers import EventSerializer
from rest_framework import generics

from rest_framework.permissions import IsAuthenticated



# @api_view(["GET"])
# def events_list(request):
#     events = Event.objects.all().values()
#     return Response([
#   {
#     "id": 1,
#     "name": "Hackathon 2026",
#     "department": "Computer Science",
#     "date": "2026-03-20",
#     "venue": "Main Auditorium",
#     "coordinator": "Dr. Smith",
#     "status": "approved"
#   }
# ])


class EventListCreateView(generics.ListCreateAPIView):

    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

        

class EventDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Event.objects.all()
    serializer_class = EventSerializer