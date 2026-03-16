
# Register your models here.

# from django.contrib import admin
# from .models import User

# admin.site.register(User)

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

# Unregister the default registration first

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


class CustomUserAdmin(UserAdmin):
    model = User

    # Add role field to admin display
    fieldsets = UserAdmin.fieldsets + (
        ("Custom Fields", {"fields": ("role",)}),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Custom Fields", {"fields": ("role",)}),
    )


admin.site.register(User, CustomUserAdmin)