from django.urls import path
from django.conf.urls import url
from .views.home import *
 
urlpatterns = [
    path('api/students',getStudentById,name='getStudentById'),
    path('api/test', test, name="test"),
    path('api/courseSelection',getCourseById,name='getCourseSelectionById'),
    path('api/selectableCourses', getAllCourses,name='getAllCourses'),
    path('api/addCourse', addCourse, name='addCourse'),
    path('api/removeCourse', removeCourse, name='removeCourse'),

]
