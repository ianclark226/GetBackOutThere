from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import Organizer
from .serializers import OrganizerSerializer

class OrganizerListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Organizer.objects.all()
    serializer_class = OrganizerSerializer
    pagination_class = None

class OrganizerView(RetrieveAPIView):
    queryset = Organizer.objects.all()
    serializer_class = OrganizerSerializer


