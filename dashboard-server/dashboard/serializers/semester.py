from rest_framework import serializers

from dashboard.models import Semester


class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = [
            'semester_id',
            'name',
        ]
