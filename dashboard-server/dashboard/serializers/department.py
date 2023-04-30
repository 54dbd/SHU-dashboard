from rest_framework import serializers

from dashboard.models import Department


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = [
            'dept_id',
            'name',
            'address',
            'phone',
        ]
