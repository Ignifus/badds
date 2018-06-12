import os
from binascii import hexlify

from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

from ads.image import upload
from ads.serializers import *


class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserSerializer
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)

    def get_queryset(self):
        return User.objects.filter(pk=self.request.user.id)


class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)

    def get_queryset(self):
        return Application.objects.filter(user_id=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, key=hexlify(os.urandom(32)).decode())


class AdvertisementViewSet(viewsets.ModelViewSet):
    queryset = Advertisement.objects.all()
    serializer_class = AdvertisementSerializer
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SpaceViewSet(viewsets.ModelViewSet):
    queryset = Space.objects.all()
    serializer_class = SpaceSerializer
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BiddingViewSet(viewsets.ModelViewSet):
    queryset = Bidding.objects.all()
    serializer_class = BiddingSerializer
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AuctionViewSet(viewsets.ModelViewSet):
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)


class RestrictionViewSet(viewsets.ModelViewSet):
    queryset = Restriction.objects.all()
    serializer_class = RestrictionSerializer
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)


class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)

    def perform_create(self, serializer):
        serializer.save(path=upload(self.request.data['path']))


class ContractViewSet(viewsets.ModelViewSet):
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)


class ApplicationCategoryViewSet(viewsets.ModelViewSet):
    queryset = ApplicationCategory.objects.all()
    serializer_class = ApplicationCategorySerializer
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
