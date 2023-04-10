from django.http import JsonResponse
from django.http import HttpResponse
from ..models import Student


def test(request):
    return HttpResponse("test")

def getStudentNameFromId(request):
    ID = request.GET.get('id')
    # ID=1011;
    try:
        return JsonResponse(Student.objects.all().values(), safe=False)
    except Student.DoesNotExist:
        return JsonResponse(ID,safe=False)
