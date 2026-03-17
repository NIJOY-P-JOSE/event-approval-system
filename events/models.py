from django.db import models
from users.models import User


class Event(models.Model):

    DEPARTMENT_CHOICES = [
        ("CSE", "Computer Science"),
        ("ECE", "Electronics"),
        ("ME", "Mechanical"),
        ("CE", "Civil"),
        ("AIML","AI & ML"),
    ]

    STATUS_CHOICES = [
        ("draft", "Draft"),
        ("submitted", "Submitted"),
        ("faculty_approved", "Faculty Approved"),
        ("dept_head_approved", "Department Head Approved"),
        ("hod_approved", "HOD Approved"),
        ("rejected", "Rejected"),
    ]

    name = models.CharField(max_length=200)

    department = models.CharField(
        max_length=10,
        choices=DEPARTMENT_CHOICES
    )

    description = models.TextField(blank=True)


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

    date = models.DateField(null=True, blank=True)

    venue = models.CharField(max_length=200,blank=True)
    

    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default="draft"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    proposal_pdf = models.FileField(
        upload_to="event_proposals/",
        null=True,
        blank=True
    )


    def __str__(self):
        return self.name


class EventCoordinator(models.Model):

    ROLE_CHOICES = [
        ("student_coord", "Student Coordinator"),
        ("sub_coord", "Sub Coordinator"),
        ("volunteer", "Volunteer"),
    ]

    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name="coordinators"
    )

    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES
    )

    class Meta:
        unique_together = ("event", "student")