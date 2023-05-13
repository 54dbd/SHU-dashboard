from rest_framework import serializers

from dashboard.models import Class, CourseSelection, Student
from dashboard.serializers.myclass import ClassSerializer
from dashboard.serializers.student import StudentSerializer


class CourseSelectionSerializer(serializers.HyperlinkedModelSerializer):
    class_id = ClassSerializer(read_only=True)
    student_id = StudentSerializer(read_only=True)

    class Meta:
        model = CourseSelection
        fields = [
            'class_id',
            'student_id',
            'grade',
            'gp',
            'gpa',
            'exam',
        ]

    def create(self, validated_data):
        class_id = self.initial_data.get('class_id', None)
        CLASS = Class.objects.get(pk=class_id)
        validated_data.update(class_id=CLASS)
        return super(CourseSelectionSerializer, self).create(validated_data)
