from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import Realtor
from .serializers import RealtorSerialzer

class RealtorListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Realtor.objects.all()
    serializer_class = RealtorSerialzer
    pagination_class = None
    
class RealtorView(RetrieveAPIView):
    queryset = Realtor.objects.all()
    serializer_class = RealtorSerialzer
    
class TopSellerView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Realtor.objects.filter(top_seller=True)
    serializer_class = RealtorSerialzer
    pagination_class = None