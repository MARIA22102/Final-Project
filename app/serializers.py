from rest_framework import serializers
from .models import Student, Subject, Grade

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'

class GradeSerializer(serializers.ModelSerializer):
    subj_name = serializers.CharField(source='subj.subj', read_only=True)
    grade_type_display = serializers.CharField(source='get_grade_choices_display', read_only=True)
    
    class Meta:
        model = Grade
        fields = '__all__'