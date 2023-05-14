from rest_framework import serializers

from dashboard.models import Class, Course, Semester, Teacher
from dashboard.serializers.course import CourseSerializer
from dashboard.serializers.semester import SemesterSerializer
from dashboard.serializers.teacher import TeacherSerializer


class ClassSerializer(serializers.HyperlinkedModelSerializer):
    course_id = CourseSerializer(read_only=True)
    semester_id = SemesterSerializer(read_only=True)
    teacher_id = TeacherSerializer(read_only=True)

    class Meta:
        model = Class
        fields = [
            'class_id',
            'course_id',
            'semester_id',
            'teacher_id',
            'classroom',
            'current_selection',
            'max_selection',
            'remaining_selection',
            'time',
            'start',
            'end',
        ]

    def create(self, validated_data):
        course_id = validated_data.get('course_id', None)
        semester_id = validated_data.get('semester_id', None)
        teacher_id = validated_data.get('teacher_id', None)
        class_id = validated_data.get('class_id', None)
        course = Course.objects.get(pk=course_id)
        semester = Semester.objects.get(pk=semester_id)
        teacher = Teacher.objects.get(teacher_id=teacher_id)
        validated_data.update(class_id=class_id, course_id=course, semester_id=semester, teacher_id=teacher)
        return super(ClassSerializer, self).create(validated_data)
