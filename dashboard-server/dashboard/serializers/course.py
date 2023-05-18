from rest_framework import serializers

from dashboard.models import Major, Course, Department
from dashboard.serializers.department import DepartmentSerializer


class CourseSerializer(serializers.HyperlinkedModelSerializer):
    dept_id = DepartmentSerializer(read_only=True)

    class Meta:
        model = Course
        fields = [
            'course_id',
            'name',
            'credit',
            'gp_percentage',
            'dept_id',
        ]

    def create(self, validated_data):
        dept_id = validated_data.get('dept_id', None)
        dept = Department.objects.get(pk=dept_id)
        validated_data.update(dept_id=dept)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        course_id = self.data.get('course_id', None)
        course = Course.objects.get(course_id=course_id)
        dept_id = self.initial_data.get('dept_id', None)
        dept = course.dept_id
        if dept_id is not None:
            dept = Department.objects.get(pk=dept_id)
        validated_data.update(dept_id=dept)
        return super().update(instance, validated_data)
