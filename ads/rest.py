import os
from binascii import hexlify

from rest_framework import viewsets

from ads.image import upload
from ads.serializers import *


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(pk=self.request.user.id)


class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        return Application.objects.filter(user_id=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, key=hexlify(os.urandom(32)).decode())


class AdvertisementViewSet(viewsets.ModelViewSet):
    queryset = Advertisement.objects.all()
    serializer_class = AdvertisementSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SpaceViewSet(viewsets.ModelViewSet):
    queryset = Space.objects.all()
    serializer_class = SpaceSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BiddingViewSet(viewsets.ModelViewSet):
    queryset = Bidding.objects.all()
    serializer_class = BiddingSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AuctionViewSet(viewsets.ModelViewSet):
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer


class RestrictionViewSet(viewsets.ModelViewSet):
    queryset = Restriction.objects.all()
    serializer_class = RestrictionSerializer


class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer

    def perform_create(self, serializer):
        serializer.save(path=upload(self.request.data['path']))


class ContractViewSet(viewsets.ModelViewSet):
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer


class ApplicationCategoryViewSet(viewsets.ModelViewSet):
    queryset = ApplicationCategory.objects.all()
    serializer_class = ApplicationCategorySerializer


class AdvertisementCategoryViewSet(viewsets.ModelViewSet):
    queryset = AdvertisementCategory.objects.all()
    serializer_class = AdvertisementCategorySerializer
