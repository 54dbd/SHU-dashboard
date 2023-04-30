from rest_framework import serializers

from dashboard.models import Class, Course, Semester, Teacher
from dashboard.serializers.course import CourseSerializer
from dashboard.serializers.semester import SemesterSerializer
from dashboard.serializers.teacher import TeacherSerializer


class ClassSerializer(serializers.HyperlinkedModelSerializer):
    course = CourseSerializer(read_only=True)
    semester = SemesterSerializer(read_only=True)
    teacher = TeacherSerializer(read_only=True)

    class Meta:
        model = Class
        fields = [
            'class_id',
            'course',
            'semester',
            'teacher',
            'classroom',
            'current_selection',
            'max_selection',
            'remaining_selection',
            'time',
            'start',
            'end',
        ]

    def create(self, validated_data):
        course_id = self.initial_data.get('course_id', None)
        semester_id = self.initial_data.get('semester_id', None)
        teacher_id = self.initial_data.get('teacher_id', None)
        course = Course.objects.get(pk=course_id)
        semester = Semester.objects.get(pk=semester_id)
        teacher = Teacher.objects.get(teacher_id=teacher_id)
        validated_data.update(course=course, semaster=semester, teacher=teacher)
        return super(ClassSerializer, self).create(validated_data)
