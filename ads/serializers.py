from django.contrib.auth.models import User
from rest_framework import serializers

from ads.models import Application, Space


class SpaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Space
        fields = '__all__'


class ApplicationSerializer(serializers.ModelSerializer):
    spaces = SpaceSerializer(many=True, read_only=True)

    class Meta:
        model = Application
        exclude = ('user',)
        depth = 1

class UserSerializer(serializers.ModelSerializer):
    applications = ApplicationSerializer(many=True, read_only=True)

    class Meta:
        model = User
        exclude = ('password', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')


