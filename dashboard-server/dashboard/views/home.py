from django.http import JsonResponse
from django.http import HttpResponse
from ..models import Student, CourseSelection, Course, Teacher
from django.core import serializers
import json


def test(request):
    return HttpResponse("test")

def getStudentNameById(request):
    ID = request.GET.get('id')
    try:
        data = Student.objects.get(pk=ID)
        name = data.getName()
        return JsonResponse({'name': name})
    except Student.DoesNotExist:
        print("student does not exist")
        return HttpResponse(ID)

def getCourseById(request):
    ID = request.GET.get('id')
    try:
        data = list(CourseSelection.objects.filter(student_id=ID).select_related('course_id__course_name').values('course_id','course_id__course_name','point','course_id__dept_id__dept_name','course_id__staff_id__name'))
        new_list = [{'id': item['course_id'], 'name': item['course_id__course_name'], 'point': item['point'],
                     'dept': item['course_id__dept_id__dept_name'], 'teacher': item['course_id__staff_id__name']} for
                    item in data]

        return JsonResponse(new_list,safe=False)
    except CourseSelection.DoesNotExist:
        print("student does not exist")
        return HttpResponse(ID)

def getAllCourses(request):
    try:
        data = list(Course.objects.all().select_related('course_id__course_name').values('course_id','course_id__course_name','point','course_id__dept_id__dept_name','course_id__staff_id__name'))
        print(data)
        new_list = [{'id': item['course_id'], 'name': item['course_id__course_name'], 'point': item['point'],
                     'dept': item['course_id__dept_id__dept_name'], 'teacher': item['course_id__staff_id__name']} for
                    item in data]
        return JsonResponse(new_list,safe=False)
    except Course.DoesNotExist:
        return HttpResponse("no course")
