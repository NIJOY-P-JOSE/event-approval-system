from django.shortcuts import render

# Create your views here.
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from users.models import User

from rest_framework.permissions import IsAuthenticated




@api_view(["POST"])
def login(request):

    username = request.data.get("username")
    password = request.data.get("password")
    role = request.data.get("role")

    user = authenticate(username=username, password=password)

    if user is None:
        return Response({"error": "Invalid credentials"}, status=401)

    if user.role != role:
        return Response({"error": "Role mismatch"}, status=403)

    refresh = RefreshToken.for_user(user)

    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "role": user.role,
        "username": user.username
    })


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user

    return Response({
        "username": user.username,
        "role": user.role,
        "email": user.email,
        "department": user.department
    })



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def faculty_list(request):
    faculty = User.objects.filter(role="faculty")
    data = [
        {
            "id": f.id,
            "name": f.username
        }
        for f in faculty
    ]
    return Response(data)

