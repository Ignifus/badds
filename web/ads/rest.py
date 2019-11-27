import os
from binascii import hexlify

from rest_framework import viewsets
from rest_framework.exceptions import PermissionDenied
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from ads.image import upload
from ads.serializers import *


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(pk=self.request.user.id)


class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        return Application.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, key=hexlify(os.urandom(32)).decode())


class ApplicationCountView(APIView):
    renderer_classes = (JSONRenderer, )

    def get(self, request, format=None):
        count = Application.objects.filter(user=request.user).count()
        content = {'count': count}
        return Response(content)


class AdvertisementViewSet(viewsets.ModelViewSet):
    serializer_class = AdvertisementSerializer

    def get_queryset(self):
        return Advertisement.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AdvertisementCountView(APIView):
    renderer_classes = (JSONRenderer, )

    def get(self, request, format=None):
        count = Advertisement.objects.filter(user=request.user).count()
        content = {'count': count}
        return Response(content)


class SpaceViewSet(viewsets.ModelViewSet):
    queryset = Space.objects.all()
    serializer_class = SpaceSerializer

    def perform_update(self, serializer):
        if serializer.instance.application.user != self.request.user:
            raise PermissionDenied()
        serializer.save()

    def perform_destroy(self, instance):
        if instance.application.user != self.request.user:
            raise PermissionDenied()
        instance.delete()


class SpaceCountView(APIView):
    renderer_classes = (JSONRenderer, )

    def get(self, request, format=None):
        count = Space.objects.filter(application__user=request.user).count()
        content = {'count': count}
        return Response(content)


class BiddingViewSet(viewsets.ModelViewSet):
    queryset = Bidding.objects.all()
    serializer_class = BiddingSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        if serializer.instance.user != self.request.user:
            raise PermissionDenied()
        serializer.save()

    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise PermissionDenied()
        instance.delete()


class AuctionViewSet(viewsets.ModelViewSet):
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer

    def get_serializer_context(self):
        return {'request': self.request}

    def perform_update(self, serializer):
        if serializer.instance.space.application.user != self.request.user:
            raise PermissionDenied()
        serializer.save()

    def perform_destroy(self, instance):
        if instance.space.application.user != self.request.user:
            raise PermissionDenied()
        instance.delete()


class RestrictionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Restriction.objects.all()
    serializer_class = RestrictionSerializer


class SpaceRestrictionViewSet(viewsets.ModelViewSet):
    serializer_class = SpaceRestrictionSerializer

    def get_serializer_context(self):
        return {'request': self.request}

    def get_queryset(self):
        return SpaceRestriction.objects.filter(space__application__user=self.request.user)


class ResourceRestrictionViewSet(viewsets.ModelViewSet):
    serializer_class = ResourceRestrictionSerializer

    def get_queryset(self):
        return ResourceRestriction.objects.filter(resource__advertisement__user=self.request.user)


class ResourceViewSet(viewsets.ModelViewSet):
    serializer_class = ResourceSerializer

    def perform_create(self, serializer):
        serializer.save(path=upload(self.request.data['image']))

    def get_serializer_context(self):
        return {'request': self.request}

    def get_queryset(self):
        return Resource.objects.filter(advertisement__user=self.request.user)


class ContractViewSet(viewsets.ModelViewSet): # TODO RESTRICT PUT AND DELETE
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer


class ContractCountView(APIView):
    renderer_classes = (JSONRenderer, )

    def get(self, request, format=None):
        count = Contract.objects.filter(advertisement__user=request.user).count()
        content = {'count': count}
        return Response(content)


class ApplicationCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ApplicationCategory.objects.all()
    serializer_class = ApplicationCategorySerializer


class AuctionStatusViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AuctionStatus.objects.all()
    serializer_class = AuctionStatusSerializer
