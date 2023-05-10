from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    first_name = models.CharField(max_length=30, null=True, blank=True)
    last_name = models.CharField(max_length=150, null=True, blank=True)
    email = models.EmailField(max_length=254, null=True, blank=True)
class Class(models.Model):
    class_id = models.AutoField(primary_key=True)
    course_id = models.ForeignKey('Course', models.DO_NOTHING)
    semester_id = models.ForeignKey('Semester', models.DO_NOTHING)
    teacher_id = models.ForeignKey('Teacher', models.DO_NOTHING)
    classroom = models.CharField(max_length=100, blank=True, null=True)
    current_selection = models.IntegerField(blank=True, null=True)
    max_selection = models.IntegerField(blank=True, null=True)
    remaining_selection = models.IntegerField(blank=True, null=True)
    time = models.CharField(max_length=100, blank=True, null=True)
    start = models.CharField(max_length=100, blank=True, null=True)
    end = models.CharField(max_length=100, blank=True, null=True)


class Course(models.Model):
    course_id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    credit = models.IntegerField(blank=True, null=True)
    gp_percentage = models.FloatField(blank=True, null=True)
    dept_id = models.ForeignKey('Department', models.DO_NOTHING, blank=True, null=True)


class CourseSelection(models.Model):
    course_selection_id = models.AutoField(primary_key=True)
    student_id = models.ForeignKey('Student', models.DO_NOTHING)  # Field renamed because it was a Python reserved word.
    class_id = models.ForeignKey(Class, models.DO_NOTHING,
                                    db_column='class_id')  # Field renamed because it was a Python reserved word.
    gp = models.FloatField(blank=True, null=True)
    exam = models.FloatField(blank=True, null=True)
    grade = models.FloatField(blank=True, null=True)
    #    can_drop            tinyint(1) not null,
    gpa = models.FloatField(blank=True, null=True)
    can_drop = models.IntegerField(blank=True, null=True)


class Department(models.Model):
    dept_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=9999, blank=True, null=True)
    phone = models.CharField(max_length=100, blank=True, null=True)


class Major(models.Model):
    major_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True, null=True)


class Semester(models.Model):
    semester_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True, null=True)


class Student(models.Model):
    user_id = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    student_id = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    gpa = models.FloatField(blank=True, null=True)
    dept_id = models.ForeignKey(Department, models.DO_NOTHING)
    major_id = models.ForeignKey(Major, models.DO_NOTHING)


class Teacher(models.Model):
    user_id = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    teacher_id = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    dept_id = models.ForeignKey(Department, models.DO_NOTHING)
