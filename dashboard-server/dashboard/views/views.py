from rest_framework.decorators import action, api_view

from dashboard.models import Student, User, Course, Department, Class, Teacher, Major, Semester, CourseSelection
from dashboard.permission import IsAdminUserOrReadOnly, IsSelfOrAdmin, IsAdminOrTeacher, IsAdminOrTeacherOrReadOnly
from dashboard.serializers.course import CourseSerializer
from dashboard.serializers.courseSelection import CourseSelectionSerializer
from dashboard.serializers.department import DepartmentSerializer
from dashboard.serializers.major import MajorSerializer
from dashboard.serializers.myclass import ClassSerializer
from dashboard.serializers.semester import SemesterSerializer
from dashboard.serializers.student import StudentSerializer
from dashboard.serializers.teacher import TeacherSerializer
from dashboard.serializers.user import UserSerializer
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, serializers, generics
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response


# Create your views here.
class CourseSelectionViewSet(viewsets.ModelViewSet):
    queryset = CourseSelection.objects.all()
    serializer_class = CourseSelectionSerializer
    lookup_field = 'course_selection_id'
    permission_classes = [IsSelfOrAdmin]

    def perform_create(self, serializer):
        # 如果学生id和课程id在数据库中都存在，那么就不用再传了
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

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

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
    allowed_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS', 'TRACE']
    http_method_names = ['put', 'get', 'delete', 'post', 'patch']
    # TODO:CRUD

    # 创建新课程
    def perform_create(self, serializer):
        # 主动设置class_id
        class_id = self.request.data.get('class_id')
        teacher_id = self.request.data.get('teacher_id')
        semester_id = self.request.data.get('semester_id')
        course_id = self.request.data.get('course_id')
        serializer.save(class_id=class_id, course_id=course_id, semester_id=semester_id, teacher_id=teacher_id)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # 修改课程信息
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    # 删除课程
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # 如果课程已经有学生选了，就不能删除
        if instance.current_selection != 0:
            raise serializers.ValidationError({'class_id': '该课程已经有学生选了，不能删除'})
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    # 课程查询
    def get_queryset(self):
        if self.request.user.is_superuser or self.request.user.is_staff:
            return Class.objects.all()
        else:
            return Class.objects.filter(teacher_id=self.request.user.id)


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    lookup_field = 'course_id'
    permission_classes = [IsAdminUserOrReadOnly]

    def perform_create(self, serializer):
        dept_id = self.request.data.get('dept_id')
        serializer.save(dept_id=dept_id)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # 如果课程已经有学生选了，就不能删除
        if instance.current_selection != 0:
            raise serializers.ValidationError({'course_id': '该课程已经有学生选了，不能删除'})
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_queryset(self):
        if self.request.user.is_superuser or self.request.user.is_staff:
            return Course.objects.all()
        else:
            return Course.objects.filter(dept_id=self.request.user.dept_id)

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAdminUserOrReadOnly]

    # TODO:CRUD
    # 创建新系
    def perform_create(self, serializer):
        # 主动设置dept_id
        dept_id = self.request.data.get('dept_id')
        serializer.save(dept_id=dept_id)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # 修改系信息
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        # 如果系已经有学生了，就不能修改
        if instance.current_student != 0:
            raise serializers.ValidationError({'dept_id': '该系已经有学生了，不能修改'})
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    # 删除系
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # 如果系已经有学生了，就不能删除
        if instance.current_student != 0:
            raise serializers.ValidationError({'dept_id': '该系已经有学生了，不能删除'})
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    # 系查询
    def get_queryset(self):
        if self.request.user.is_superuser or self.request.user.is_staff:
            return Department.objects.all()
        else:
            return Department.objects.filter(teacher_id=self.request.user.id)

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

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Teacher.objects.all()
        elif self.request.user.is_staff:
            return Teacher.objects.filter(user_id=self.request.user.id)


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


class TeacherCourseSelectionListView(generics.ListAPIView):
    serializer_class = CourseSelectionSerializer

    def get_queryset(self):
        id = self.kwargs['teacher_id']

        if len(id) is 2:
            course_selections = CourseSelection.objects.filter(class_id__teacher_id=id)
            return course_selections
        elif len(id) is 4:
            username = id
            teacher_user = User.objects.get(username=username)
            course_selections = CourseSelection.objects.filter(class_id__teacher_id=teacher_user.id)
            return course_selections
        else:
            raise f"f{len(id)} is not valid!"

    # TODO: perform_update
