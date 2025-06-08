from django.db import models

class Student(models.Model):
    first_name = models.CharField(max_length=100, default=1)
    last_name = models.CharField(max_length=100, default=1)
    student_number = models.CharField(max_length=20, default=1)
    course = models.CharField(max_length=100, default=1)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Subject(models.Model):
    subj = models.CharField(max_length=1000)

    def __str__(self):
        return self.subj

class Grade(models.Model):
    GRADE_CHOICES = (
        ('Activity', 'Activity'),
        ('Quiz', 'Quiz'),
        ('Exam', 'Exam'),
    )
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    subj = models.ForeignKey(Subject, on_delete=models.CASCADE)
    grade_choices = models.CharField(max_length=10, choices=GRADE_CHOICES)
    score = models.FloatField()

    def __str__(self):
        return f"{self.student.student_name} - ({self.grade_choices})"