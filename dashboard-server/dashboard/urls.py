from django.urls import path
from django.conf.urls import url
from .views.home import *
 
urlpatterns = [
    path('api/students',getStudentNameById,name='getStudentNameById'),
    path('api/test', test, name="test"),
    path('api/courseSelection',getCourseById,name='getCourseSelectionById'),
    path('api/selectableCourses', getAllCourses,name='getAllCourses'),
]
