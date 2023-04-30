from rest_framework import serializers

from dashboard.models import Major


class MajorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Major
        fields = [
            'major_id',
            'name',
        ]
