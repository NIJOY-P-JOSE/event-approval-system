from django.db import models

# Create your models here.

from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):

    ROLE_CHOICES = [
        ('faculty', 'Faculty Coordinator'),
        ('student_coord', 'Student Coordinator'),
        ('sub_coord', 'Sub Coordinator'),
        ('volunteer', 'Volunteer'),
        ('lab_staff', 'Lab Staff'),
        ('electric_staff', 'Electric Staff'),
        ('treasurer', 'Treasurer'),
        ('dept_head', 'Department Techfest Head'),
        ('hod', 'HOD'),
    ]

    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    department = models.CharField(max_length=100, blank=True)