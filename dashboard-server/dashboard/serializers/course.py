from rest_framework import serializers

from dashboard.models import Major, Course, Department
from dashboard.serializers.department import DepartmentSerializer


class CourseSerializer(serializers.HyperlinkedModelSerializer):
    dept = DepartmentSerializer(read_only=True)

    class Meta:
        model = Course
        fields = [
            'course_id',
            'name',
            'credit',
            'gp_percentage',
            'dept',
        ]

    def create(self, validated_data):
        dept_id = self.initial_data.get('dept_id', None)
        dept = Department.objects.get(pk=dept_id)
        validated_data.update(dept=dept)
        return super(CourseSerializer, self).create(validated_data)
