from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentPage, StudentProfilePage, StudentViewSet, SubjectViewSet, GradeViewSet

router = DefaultRouter()
router.register(r'students', StudentViewSet)
router.register(r'subjects', SubjectViewSet)
router.register(r'grades', GradeViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('', StudentPage.as_view(), name='student'),
    path('student_profile/<int:pk>/', StudentProfilePage.as_view(), name='student_profile'),
]
