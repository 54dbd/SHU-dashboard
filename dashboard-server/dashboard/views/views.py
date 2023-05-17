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
        if self.request.user.is_superuser or self.request.user.is_staff:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            try:
                serializer.is_valid(raise_exception=True)
                self.perform_update(serializer)
            except serializers.ValidationError as e:
                return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
            # 成功更新后，返回更新后的数据，状态码为200
            return Response(serializer.data, status=status.HTTP_200_OK)

    def get_queryset(self):
        semester_id = self.request.query_params.get('semester_id', None)
        course_id = self.request.query_params.get('course_id', None)
        # 获取符合条件的 CourseSelection 对象
        if semester_id is not None:
            queryset = CourseSelection.objects.filter(class_id__semester_id=semester_id)
        else:
            queryset = CourseSelection.objects.all()
        # 添加额外的过滤条件
        if course_id is not None:
            queryset = queryset.filter(class_id__course_id=course_id)
        # 根据用户角色返回不同的数据
        if self.request.user.is_superuser:
            return queryset.all()
        elif self.request.user.is_staff:
            if course_id is None:
                teacher = Teacher.objects.get(user_id_id=self.request.user.id)
                return queryset.filter(class_id__teacher_id=teacher)
            elif queryset.filter(class_id__course_id=course_id, class_id__teacher_id__user_id=self.request.user.id).exists():
                return queryset.filter(class_id__course_id=course_id)
        else:
            return queryset.filter(student_id=self.request.user.id)


class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer
    lookup_field = 'class_id'
    permission_classes = [IsAdminUserOrReadOnly]

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
    def perform_destroy(self, instance):
        if instance.teacher_id.user_id.id != self.request.user.id:
            raise serializers.ValidationError({'class_id': '您不是该课程的教师，不能删除'})
        # 如果课程已经有学生选了，就不能删除
        if instance.current_selection != 0:
            raise serializers.ValidationError({'class_id': '该课程已经有学生选了，不能删除'})
        instance.delete()

    # 课程查询
    def get_queryset(self):
        if self.request.user.is_superuser:
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

    def get_queryset(self):
        if self.request.user.is_superuser or self.request.user.is_staff:
            return Course.objects.all()
        else:
            return Course.objects.filter(dept_id=self.request.user.dept_id)


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAdminUserOrReadOnly]

    # 创建新系
    def perform_create(self, serializer):
        # 主动设置dept_id
        dept_id = self.request.data.get('dept_id')
        serializer.save(dept_id=dept_id)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


    # 删除系
    def perform_destroy(self,instance):
        # 如果系已经有学生了，就不能删除
        if Student.objects.filter(dept_id=instance.dept_id).exists():
            raise serializers.ValidationError({'dept_id': '该系已经有学生了，不能删除'})
        instance.delete()

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
        dept_id = self.request.data.get('dept_id')
        major_id = self.request.data.get('major_id')
        serializer.save(user_id=user)


    def perform_destroy(self, instance):
        if CourseSelection.objects.filter(student_id=instance.student_id).exists():
            raise serializers.ValidationError({'student_id': '该学生已经选了课，不能删除'})
        instance.user_id.delete()
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
        if Class.objects.filter(teacher_id=instance.teacher_id).exists():
            raise serializers.ValidationError({'teacher_id': '该教师已经有课程了，不能删除'})
        instance.user_id.delete()
        instance.delete()

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Teacher.objects.all()
        elif self.request.user.is_staff:
            return Teacher.objects.filter(user_id=self.request.user.id)

    @action(detail=True, methods=['get'])
    def courses(self, request, *args, **kwargs):
        teacher = self.get_object()
        teacher = Teacher.objects.get(user_id=teacher.user_id)

        courses = Class.objects.filter(teacher_id_id=teacher).values('course_id_id', 'course_id__name').distinct()
        return Response(courses)

    @action(detail=True, methods=['get'])
    def semesters(self, request, *args, **kwargs):
        teacher = self.get_object()
        teacher = Teacher.objects.get(user_id=teacher.user_id)
        semesters = Class.objects.filter(teacher_id_id=teacher).values('semester_id_id', 'semester_id__name').distinct()
        return Response(semesters)


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
