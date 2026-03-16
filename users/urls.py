from django.urls import path
from . import views 

urlpatterns = [
    path("api/login/", views.login, name="login"),
    path("api/profile/", views.profile)
   # path("logout/", views.logout_view, name="logout"),
]

