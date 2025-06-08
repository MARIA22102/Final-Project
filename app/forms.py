from django import forms
from .models import Student, Grade

class StudentForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = ['student_name']

class GradeForm(forms.ModelForm):
    class Meta:
        model = Grade
        fields = ['student_name', 'subj', 'grade_choices', 'score']
