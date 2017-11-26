from rest_framework import viewsets

from ads.serializers import *


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(pk=self.request.user.id)

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

class AdvertisementViewSet(viewsets.ModelViewSet):
    queryset = Advertisement.objects.all()
    serializer_class = AdvertisementSerializer

class SpaceViewSet(viewsets.ModelViewSet):
    queryset = Space.objects.all()
    serializer_class = SpaceSerializer

class AuctionViewSet(viewsets.ModelViewSet):
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer

class BiddingViewSet(viewsets.ModelViewSet):
    queryset = Bidding.objects.all()
    serializer_class = BiddingSerializer

class RestrictionViewSet(viewsets.ModelViewSet):
    queryset = Restriction.objects.all()
    serializer_class = RestrictionSerializer

class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
