from django.db import models

class Department(models.Model):
    dept_id = models.CharField(max_length=2,primary_key=True)
    dept_name = models.CharField(max_length=10)
    address = models.CharField(max_length=20)
    phone_code = models.CharField(max_length=20)

    def __str__(self):
        return self.dept_id

    class Meta:
        db_table = "department"
        app_label = 'department'

class Student(models.Model):
    student_id = models.CharField(max_length=4, primary_key=True)
    name = models.CharField(max_length=10)
    sex = models.CharField()
    date_of_birth = models.DateField()
    dept_id = models.ForeignKey(Department,db_column='dept_id', on_delete=models.CASCADE)
    username = models.CharField(max_length=10)
    password = models.CharField(max_length=10)

    def getName(self):
        return self.name
    def getSex(self):
        return self.sex
    def getUsername(self):
        return self.username
    def getPassword(self):
        return self.password
    def __str__(self):
        return self

    class Meta:
        db_table="student"
        app_label = 'student'



class Teacher(models.Model):
    staff_id = models.CharField(max_length=4,primary_key=True)
    name = models.CharField(max_length=10)
    sex = models.CharField()
    date_of_birth = models.DateField()
    category = models.CharField(max_length=10)
    dept_id = models.ForeignKey(Department,db_column='dept_id', on_delete=models.CASCADE)
    username = models.CharField(max_length=10)
    password = models.CharField(max_length=10)

    def __str__(self):
        return self.staff_id

    class Meta:
        db_table = "teacher"
        app_label = 'teacher'
class Course(models.Model):
    course_id = models.CharField(max_length=8,primary_key=True)
    course_name = models.CharField(max_length=10)
    credit = models.IntegerField()
    dept_id = models.ForeignKey(Department,db_column='dept_id', on_delete=models.CASCADE)
    staff_id = models.ForeignKey(Teacher,db_column='staff_id',on_delete=models.CASCADE)

    class Meta:
        db_table = "course"
        app_label = 'course'
class CourseSelection(models.Model):
    student_id = models.ForeignKey(Student, primary_key=True, db_column='student_id', on_delete=models.CASCADE)
    course_id = models.ForeignKey(Course, primary_key=True, db_column='course_id', on_delete=models.CASCADE)
    score = models.DecimalField()
    point = models.DecimalField()

    def __str__(self):
        return self.course_id

    def getDetails(self):
        return self.course_id,self.score,self.point

    def can_delete(self):
        return self.score == -1 and self.point == -1

    class Meta:
        db_table = "course_selection"
        app_label = 'course_selection'
