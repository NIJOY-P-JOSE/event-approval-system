from django.db import models

# Create your models here.

from django.db import models
from users.models import User
from events.models import Event

class EventApproval(models.Model):

    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    approved_by = models.ForeignKey(User, on_delete=models.CASCADE)

    role = models.CharField(max_length=100)

    status = models.CharField(
        max_length=20,
        choices=[
            ('pending','Pending'),
            ('approved','Approved'),
            ('rejected','Rejected')
        ],
        default='pending'
    )

    comments = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)