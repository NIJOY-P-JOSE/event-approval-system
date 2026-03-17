from rest_framework import serializers
from .models import Event, EventCoordinator


class EventCoordinatorSerializer(serializers.ModelSerializer):

    class Meta:
        model = EventCoordinator
        fields = "__all__"


class EventSerializer(serializers.ModelSerializer):

    coordinators = EventCoordinatorSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Event
        fields = "__all__"