from rest_framework import generics
from .serializers import UserSerializer,AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from core import serializers

class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer

class LoginView(ObtainAuthToken):

    serializer_class = AuthTokenSerializer

    def post(self, request, *args,**kwargs):
        serializers = self.serializer_class(data=request.data,context={'request':request})
        serializers.is_valid(raise_exception=True)
        user = serializers.validated_data['user']
        token,created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username': user.username,
            'user_id': user.id,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        })