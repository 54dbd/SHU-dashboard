from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework import serializers

from dashboard.models import User
from dashboard.serializers.student import StudentSerializer
from dashboard.serializers.teacher import TeacherSerializer

class UserSerializer(serializers.ModelSerializer):
    permissions = serializers.SerializerMethodField()
    student = StudentSerializer()
    teacher = TeacherSerializer()
    class Meta:
        model = User
        fields = [
            'username',
            'password',
            'student',
            'teacher',
            'permissions',
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def get_permissions(self, obj):
        if obj.is_superuser:
            return "admin"
        elif obj.is_staff:
            return "teacher"
        else:
            return "student"
    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        return super().update(instance, validated_data)

    def validate_password(self, value: str) -> str:
        """
        Hash value passed by user.

        :param value: password of a user
        :return: a hashed version of the password
        """
        return make_password(value)