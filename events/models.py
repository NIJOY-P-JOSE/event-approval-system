from django.db import models

# Create your models here.

from django.db import models
from users.models import User

class Event(models.Model):

    name = models.CharField(max_length=200)

    department = models.CharField(max_length=100)

    description = models.TextField()

    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="created_events"
    )

    faculty_coordinator = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name="faculty_events"
    )

    date = models.DateField()

    venue = models.CharField(max_length=200)

    status = models.CharField(
        max_length=50,
        default="draft"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    

class EventCoordinator(models.Model):

    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    student = models.ForeignKey(User, on_delete=models.CASCADE)

    role = models.CharField(max_length=50)