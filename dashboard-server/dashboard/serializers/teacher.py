from django.contrib.auth import get_user_model
from rest_framework import serializers

from dashboard.models import Department, Teacher
from dashboard.serializers.department import DepartmentSerializer


class TeacherSerializer(serializers.HyperlinkedModelSerializer):
    dept = DepartmentSerializer(read_only=True)

    class Meta:
        model = Teacher
        fields = [
            'teacher_id',
            'name',
            'dept',
        ]

    def create(self, validated_data):
        dept_id = self.initial_data.get('dept_id', None)
        dept = Department.objects.get(pk=dept_id)
        validated_data.update(dept=dept)
        return super(TeacherSerializer, self).create(validated_data)
