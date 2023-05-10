from django.contrib.auth import get_user_model
from rest_framework import generics, viewsets, status, serializers
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import action
from rest_framework.response import Response

from dashboard.models import Student, User, Course, Department, Class, Teacher, Major, Semester, CourseSelection
from dashboard.permission import IsAdminUserOrReadOnly, IsSelfOrAdmin, IsAdminOrTeacher, IsAdminOrTeacherOrReadOnly
from dashboard.serializers.myclass import ClassSerializer
from dashboard.serializers.course import CourseSerializer
from dashboard.serializers.department import DepartmentSerializer
from dashboard.serializers.major import MajorSerializer
from dashboard.serializers.semester import SemesterSerializer
from dashboard.serializers.student import StudentSerializer
from dashboard.serializers.teacher import TeacherSerializer
from dashboard.serializers.user import UserSerializer
from dashboard.serializers.courseSelection import CourseSelectionSerializer

# Create your views here.

class CourseSelectionViewSet(viewsets.ModelViewSet):
    queryset = CourseSelection.objects.all()
    serializer_class = CourseSelectionSerializer
    lookup_field = 'course_selection_id'
    permission_classes = [IsSelfOrAdmin]

    def perform_create(self, serializer):
        print(self.request.data)
        print(self.request.user.id)
        #如果学生id和课程id在数据库中都存在，那么就不用再传了
        student = Student.objects.get(user_id=self.request.user.id)
        if CourseSelection.objects.filter(student_id=student, class_id=self.request.data['class_id']).exists():
            print("已经存在");
            raise serializers.ValidationError({'class_id': '您已选过该课程'})
        serializer.save(student_id=student, class_id=self.request.data['class_id'])

    def perform_destroy(self, instance):
        instance.delete()

    def delete(self, request, *args, **kwargs):
        print(self.request.data)
        print(self.request.user.id)
        student = Student.objects.get(user_id=self.request.user.id)
        # 如果这个同学这门课已经有成绩，就不能删除
        if CourseSelection.objects.get(student_id=student, class_id=self.request.data['class_id']).grade is not None:
            raise serializers.ValidationError({'class_id': '该课程有成绩'})

        course_selection = CourseSelection.objects.get(student_id=student, class_id=self.request.data['class_id'])
        course_selection.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_queryset(self):
        if self.request.user.is_superuser or self.request.user.is_staff:
            return CourseSelection.objects.all()
        else:
            return CourseSelection.objects.filter(student_id=self.request.user.id)
class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer
    lookup_field = 'class_id'
    permission_classes = [IsAdminUserOrReadOnly]


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    lookup_field = 'course_id'
    permission_classes = [IsAdminUserOrReadOnly]


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAdminUserOrReadOnly]


class MajorViewSet(viewsets.ModelViewSet):
    queryset = Major.objects.all()
    serializer_class = MajorSerializer
    permission_classes = [IsAdminUserOrReadOnly]


class SemesterViewSet(viewsets.ModelViewSet):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer
    permission_classes = [IsAdminUserOrReadOnly]


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    lookup_field = 'student_id'
    permission_classes = [IsAdminOrTeacherOrReadOnly]

    def get_queryset(self):
        if self.request.user.is_superuser or self.request.user.is_staff:
            # 如果当前用户是超级用户或教师，允许他们查看所有学生的信息
            return Student.objects.all()
        else:
            # 否则，只允许当前用户查看自己的信息
            # print(self.request.user.id, "trying to check own info")
            return Student.objects.filter(user_id=self.request.user.id)

    def perform_create(self, serializer):
        django_user = get_user_model()
        user = django_user.objects.create_user(username=serializer.validated_data['student_id'], password='password')
        serializer.save(user=user)

    def perform_destroy(self, instance):
        instance.user.delete()
        instance.delete()


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    lookup_field = 'teacher_id'
    permission_classes = [IsAdminOrTeacher]

    def perform_create(self, serializer):
        django_user = get_user_model()
        user = django_user.objects.create_user(username=serializer.validated_data['teacher_id'], password='password')
        serializer.save(user=user)

    def perform_destroy(self, instance):
        instance.user.delete()
        instance.delete()

 
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'
    permission_classes = [IsSelfOrAdmin]
    def get_queryset(self):
        if self.request.user.is_superuser or self.request.user.is_staff:
            return User.objects.all()
        else:
            return User.objects.filter(id=self.request.user.id)
    def get_permissions(self):
        if self.request.method == 'PUT' or self.request.method == 'GET':
            self.permission_classes = [IsSelfOrAdmin]
        else:
            self.permission_classes = [IsAdminUser]

        return super().get_permissions()
