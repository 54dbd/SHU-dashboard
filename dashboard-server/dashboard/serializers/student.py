from django.contrib.auth import get_user_model
from rest_framework import serializers

from dashboard.models import Student, Department, Major
from dashboard.serializers.department import DepartmentSerializer
from dashboard.serializers.major import MajorSerializer


class StudentSerializer(serializers.HyperlinkedModelSerializer):
    dept = DepartmentSerializer(read_only=True)
    major = MajorSerializer(read_only=True)

    class Meta:
        model = Student
        fields = [
            'student_id',
            'name',
            'gpa',
            'dept',
            'major',
        ]

    def create(self, validated_data):
        dept_id = self.initial_data.get('dept_id', None)
        major_id = self.initial_data.get('major_id', None)
        dept = Department.objects.get(pk=dept_id)
        major = Major.objects.get(pk=major_id)
        validated_data.update(dept=dept, major=major)
        return super(StudentSerializer, self).create(validated_data)
