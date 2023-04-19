from django.http import JsonResponse
from django.http import HttpResponse
from ..models import Student, CourseSelection, Course, Teacher
from django.views.decorators.csrf import csrf_exempt



def test(request):
    return HttpResponse("test")

def getStudentById(request):
    ID = request.GET.get('id')
    try:
        data = list(Student.objects.filter(student_id=ID).select_related('dept_id__name').values('name','sex','date_of_birth','dept_id__dept_name'))
        new_list = [{'name': item['name'], 'sex': item['sex'], 'age': item['date_of_birth'],'dept': item['dept_id__dept_name']}
                    for item in data]
        return JsonResponse(new_list, safe=False)
    except Student.DoesNotExist:
        print("student does not exist")
        return HttpResponse(ID)

def getCourseById(request):
    ID = request.GET.get('id')
    try:
        data = list(CourseSelection.objects.filter(student_id=ID).select_related('course_id__course_name').values('course_id','course_id__course_name','point','course_id__dept_id__dept_name','course_id__staff_id__name','course_id__credit'))
        new_list = [{'id': item['course_id'], 'name': item['course_id__course_name'], 'point': item['point'], 'credit':item['course_id__credit'],
                     'dept': item['course_id__dept_id__dept_name'], 'teacher': item['course_id__staff_id__name']} for
                    item in data]

        return JsonResponse(new_list,safe=False)
    except CourseSelection.DoesNotExist:
        print("student does not exist")
        return HttpResponse(ID)

def getAllCourses(request):
    try:
        data = list(Course.objects.all().select_related('staff_id__name').values('course_id','course_name','credit','dept_id__dept_name','staff_id__name'))
        print(data)
        new_list = [{'id': item['course_id'], 'name': item['course_name'], 'point': item['credit'],
                     'dept': item['dept_id__dept_name'], 'teacher': item['staff_id__name']} for
                    item in data]
        return JsonResponse(new_list,safe=False)
    except Course.DoesNotExist:
        return HttpResponse("no course")

@csrf_exempt
def addCourse(request):
    ID = request.GET.get('id')
    CourseId = request.GET.get('course_id')
    try:
        print(ID,CourseId)
        course = Course.objects.get(course_id=CourseId)
        student = Student.objects.get(student_id=ID)
        # 检查课程是否已经选过
        if CourseSelection.objects.filter(course_id=CourseId, student_id=ID).exists():
            return HttpResponse('该课程已经选过')
        # 创建选课记录
        CourseSelection.objects.create(course_id=course, student_id=student,score=-1,point=-1)
        return HttpResponse('添加成功')
    except Course.DoesNotExist:
        print("course does not exist")
        return HttpResponse(CourseId)
    except Student.DoesNotExist:
        print("student does not exist")
        return HttpResponse(ID)


def removeCourse(request):
    ID = request.GET.get('id')
    CourseId = request.GET.get('course_id')
    try:
        selection = CourseSelection.objects.get(course_id=CourseId, student_id=ID)
        if not selection.can_delete():
            return HttpResponse('已有成绩，不能删除')
        selection.delete()
        return HttpResponse(200)
    except Course.DoesNotExist:
        print("course does not exist")
        return HttpResponse(CourseId)
    except Student.DoesNotExist:
        print("student does not exist")
        return HttpResponse(ID)