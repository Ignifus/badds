import os
from binascii import hexlify

from django.db.models import Q
from rest_framework import viewsets
from rest_framework.exceptions import PermissionDenied, ValidationError
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


class AdvertisementViewSet(viewsets.ModelViewSet):
    serializer_class = AdvertisementSerializer

    def get_queryset(self):
        return Advertisement.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


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


class BiddingViewSet(viewsets.ModelViewSet):
    queryset = Bidding.objects.all()
    serializer_class = BiddingSerializer

    def get_serializer_context(self):
        return {'request': self.request}

    def perform_create(self, serializer):
        if self.request.user.profile.credits < serializer.validated_data['ppp_usd']:
            raise ValidationError(detail="User does not have enough credits.")

        serializer.save(user=self.request.user)

        self.request.user.profile.credits -= serializer.validated_data['ppp_usd'] * serializer.validated_data['auction'].prints
        self.request.user.save()

    def perform_update(self, serializer):
        if serializer.instance.user != self.request.user:
            raise PermissionDenied()
        serializer.save()

    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise PermissionDenied()
        instance.delete()

        self.request.user.profile.credits += instance.ppp_usd * instance.auction.prints
        self.request.user.save()


class AuctionViewSet(viewsets.ModelViewSet):
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer

    def get_serializer_context(self):
        return {'request': self.request}

    def perform_update(self, serializer):
        raise PermissionDenied()

    def perform_destroy(self, instance):
        raise PermissionDenied()

    def perform_create(self, serializer):
        auctions = Auction.objects.filter(space=serializer.validated_data["space"], status=AuctionStatus.objects.filter(status='Active'))
        if len(auctions) != 0:
            raise ValidationError(detail="There is an active auction with that space.")

        contract = Contract.objects.filter(space=serializer.validated_data["space"], active=True)
        if len(contract) != 0:
            raise ValidationError(detail="There is an active contract with that space.")
        serializer.save()


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

    def get_serializer_context(self):
        return {'request': self.request}

    def perform_update(self, serializer):
        serializer.save(path=upload(self.request.data['image']))

    def perform_create(self, serializer):
        serializer.save(path=upload(self.request.data['image']))

    def get_queryset(self):
        return Resource.objects.filter(advertisement__user=self.request.user)


class ContractViewSet(viewsets.ModelViewSet):
    serializer_class = ContractSerializer

    def perform_update(self, serializer):
        raise PermissionDenied()

    def perform_destroy(self, instance):
        raise PermissionDenied()

    def get_queryset(self):
        return Contract.objects.filter(Q(space__application__user=self.request.user), Q(advertisement__user=self.request.user))


class ApplicationCountView(APIView):
    renderer_classes = (JSONRenderer, )

    def get(self, request, format=None):
        count = Application.objects.filter(user=request.user).count()
        content = {'count': count}
        return Response(content)


class AdvertisementCountView(APIView):
    renderer_classes = (JSONRenderer, )

    def get(self, request, format=None):
        count = Advertisement.objects.filter(user=request.user).count()
        content = {'count': count}
        return Response(content)


class SpaceCountView(APIView):
    renderer_classes = (JSONRenderer, )

    def get(self, request, format=None):
        count = Space.objects.filter(application__user=request.user).count()
        content = {'count': count}
        return Response(content)


class ContractCountView(APIView):
    renderer_classes = (JSONRenderer, )

    def get(self, request, format=None):
        count = Contract.objects.filter(advertisement__user=request.user).count()
        content = {'count': count}
        return Response(content)


class RestrictionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Restriction.objects.all()
    serializer_class = RestrictionSerializer


class ApplicationCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ApplicationCategory.objects.all()
    serializer_class = ApplicationCategorySerializer


class AuctionStatusViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AuctionStatus.objects.all()
    serializer_class = AuctionStatusSerializer
