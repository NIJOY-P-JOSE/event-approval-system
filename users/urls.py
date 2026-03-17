from django.urls import path
from .views import *

urlpatterns = [
    path("login/", login, name="login"),
    path("profile/", profile),
    path("faculty/", faculty_list),

   # path("logout/", views.logout_view, name="logout"),
]

