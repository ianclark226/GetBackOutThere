from django.urls import path
from .views import OrganizerListView, OrganizerView

urlpatterns = [
    path('', OrganizerListView.as_view()),
    path('<pk>', OrganizerView.as_view()),
]