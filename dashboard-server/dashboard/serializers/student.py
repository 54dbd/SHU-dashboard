from rest_framework import serializers

from dashboard.models import Student, Department, Major, User
from dashboard.serializers.department import DepartmentSerializer
from dashboard.serializers.major import MajorSerializer


class StudentSerializer(serializers.HyperlinkedModelSerializer):
    dept_id = DepartmentSerializer(read_only=True)
    major_id = MajorSerializer(read_only=True)

    class Meta:
        model = Student
        fields = [
            'student_id',
            'name',
            'gpa',
            'dept_id',
            'major_id',
        ]

    def create(self, validated_data):
        dept_id = self.initial_data.get('dept_id', None)
        major_id = self.initial_data.get('major_id', None)
        user = self.context['request'].user
        dept = Department.objects.get(pk=dept_id)
        major = Major.objects.get(pk=major_id)
        validated_data.update(dept_id=dept, major_id=major)
        return super(StudentSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        student_id = self.initial_data.get('student_id', None)
        student = Student.objects.get(student_id=student_id)
        dept = student.dept_id
        major = student.major_id
        dept_id = self.initial_data.get('dept_id', None)
        major_id = self.initial_data.get('major_id', None)
        if dept_id is not None:
            dept = Department.objects.get(pk=dept_id)
        if major_id is not None:
            major = Major.objects.get(pk=major_id)
        validated_data.update(dept=dept, major=major)
        return super(StudentSerializer, self).update(instance, validated_data)