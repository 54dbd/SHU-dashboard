from django.urls import path
from django.conf.urls import url
from .views.home import *
 
urlpatterns = [
    path('api/students',getStudentNameFromId,name='get_students'),
    path('api/test', test, name="test")
]
