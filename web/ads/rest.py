import os
from binascii import hexlify

from django.db.models import Q
from rest_framework import viewsets
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_bulk import BulkModelViewSet

from ads.image import upload
from ads.restriction_solvers import solve_age
from ads.serializers import *
from landing.models import CreditsLog


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(pk=self.request.user.id)


class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        return Application.objects.filter(user=self.request.user, active=True)

    def perform_update(self, serializer):
        if "image" in self.request.data:
            serializer.save(logo=upload(self.request.data['image']))
        else:
            serializer.save()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, logo=upload(self.request.data['image']), key=hexlify(os.urandom(32)).decode())


class AdvertisementViewSet(viewsets.ModelViewSet):
    serializer_class = AdvertisementSerializer

    def get_queryset(self):
        return Advertisement.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SpaceViewSet(viewsets.ModelViewSet):
    serializer_class = SpaceSerializer

    def get_serializer_context(self):
        return {'request': self.request}

    def get_queryset(self):
        return Space.objects.filter(application__user=self.request.user, active=True)


class AllSpacesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Space.objects.filter(active=True)
    serializer_class = SpaceSerializer

    def get_serializer_context(self):
        return {'request': self.request, "view": self}


class BiddingViewSet(viewsets.ModelViewSet):
    serializer_class = BiddingSerializer

    def get_queryset(self):
        return Bidding.objects.filter(user=self.request.user, auction__status=True)

    def get_serializer_context(self):
        return {'request': self.request}

    def perform_create(self, serializer):
        if self.request.user.profile.credits < (serializer.validated_data['ppp_usd'] * serializer.validated_data['auction'].prints):
            raise ValidationError(detail="User does not have enough credits.")

        serializer.save(user=self.request.user)

        self.request.user.profile.credits -= serializer.validated_data['ppp_usd'] * serializer.validated_data['auction'].prints
        self.request.user.save()

    def perform_destroy(self, instance):
        instance.delete()

        self.request.user.profile.credits += instance.ppp_usd * instance.auction.prints
        self.request.user.save()


class AllBiddingsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Bidding.objects.filter(auction__status=True)
    serializer_class = AllBiddingsSerializer


class AuctionViewSet(viewsets.ModelViewSet):
    serializer_class = AuctionSerializer

    def get_queryset(self):
        return Auction.objects.filter(space__application__user=self.request.user, status=True)

    def get_serializer_context(self):
        return {'request': self.request}

    def perform_update(self, serializer):
        raise PermissionDenied("Update not allowed on Auction.")

    def perform_destroy(self, instance):
        raise PermissionDenied("Delete not allowed on Auction.")

    def perform_create(self, serializer):
        auctions = Auction.objects.filter(space=serializer.validated_data["space"], status=True)
        if len(auctions) != 0:
            raise ValidationError(detail="There is an active auction with that space.")

        contract = Contract.objects.filter(space=serializer.validated_data["space"], active=True)
        if len(contract) != 0:
            raise ValidationError(detail="There is an active contract with that space.")
        serializer.save()


class AllAuctionsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Auction.objects.filter(status=True)
    serializer_class = AllAuctionsSerializer


class SpaceRestrictionViewSet(BulkModelViewSet):
    serializer_class = SpaceRestrictionSerializer

    def get_serializer_context(self):
        return {'request': self.request, "view": self}

    def perform_create(self, serializer):
        space = serializer.validated_data[0]["space"]
        SpaceRestriction.objects.filter(space=space).delete()

        serializer.save()

    def get_queryset(self):
        return SpaceRestriction.objects.filter()


class ResourceRestrictionViewSet(BulkModelViewSet):
    serializer_class = ResourceRestrictionSerializer

    def get_serializer_context(self):
        return {'request': self.request, "view": self}

    def perform_create(self, serializer):
        resource = serializer.validated_data[0]["resource"]
        ResourceRestriction.objects.filter(resource=resource).delete()

        serializer.save()

    def get_queryset(self):
        return ResourceRestriction.objects.filter(resource__advertisement__user=self.request.user)


class ResourceViewSet(viewsets.ModelViewSet):
    serializer_class = ResourceSerializer

    def get_serializer_context(self):
        return {'request': self.request}

    def perform_update(self, serializer):
        if "image" in self.request.data:
            serializer.save(path=upload(self.request.data['image']))
        else:
            serializer.save()

    def perform_create(self, serializer):
        serializer.save(path=upload(self.request.data['image']))

    def get_queryset(self):
        return Resource.objects.filter(advertisement__user=self.request.user)


class ContractViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ContractSerializer

    def get_queryset(self):
        return Contract.objects.filter(Q(space__application__user=self.request.user) | Q(advertisement__user=self.request.user))


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


class ContractIpLogViewSetPublisher(viewsets.ReadOnlyModelViewSet):
    serializer_class = ContractIpLogSerializer

    def get_object(self):
        raise ValidationError

    def get_queryset(self):
        id_lookup = self.request.query_params.get('contract', None)
        if id_lookup is None:
            return ContractIpLog.objects.filter(contract__space__application__user=self.request.user)

        return ContractIpLog.objects.filter(contract__space__application__user=self.request.user, contract__pk=id_lookup)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)

        males, females = count_gender(serializer.data)
        countries = count_countries(serializer.data)
        age_distribution = count_distribution(serializer.data)

        return Response({
            "contract_history": serializer.data,
            "credits": request.user.profile.credits,
            "total_spaces": Space.objects.filter(application__user=request.user).count(),
            "total_applications": Application.objects.filter(user=request.user).count(),
            "active_contracts": Contract.objects.filter(active=True, space__application__user=request.user).count(),
            "active_auctions": Auction.objects.filter(status=True, space__application__user=request.user).count(),
            "males": males,
            "females": females,
            "countries": countries,
            "age_distribution": age_distribution,
            "credits_history": CreditsLog.objects.filter(user=request.user).values("credits", "time")
        })


class ContractIpLogViewSetAdvertiser(viewsets.ReadOnlyModelViewSet):
    serializer_class = ContractIpLogSerializer

    def get_object(self):
        raise ValidationError

    def get_queryset(self):
        id_lookup = self.request.query_params.get('contract', None)
        if id_lookup is None:
            return ContractIpLog.objects.filter(contract__advertisement__user=self.request.user)

        return ContractIpLog.objects.filter(contract__advertisement__user=self.request.user, contract__pk=id_lookup)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)

        males, females = count_gender(serializer.data)
        countries = count_countries(serializer.data)
        age_distribution = count_distribution(serializer.data)

        return Response({
            "contract_history": serializer.data,
            "credits": request.user.profile.credits,
            "total_ads": Advertisement.objects.filter(user=request.user).count(),
            "active_contracts": Contract.objects.filter(active=True, advertisement__user=request.user).count(),
            "active_biddings": Bidding.objects.filter(auction__status=True, user=request.user).count(),
            "males": males,
            "females": females,
            "countries": countries,
            "age_distribution": age_distribution,
            "credits_history": CreditsLog.objects.filter(user=request.user).values("credits", "time")
        })


def count_gender(data):
    males = 0
    females = 0

    for o in data:
        for i, (key, value) in enumerate(o.items()):
            if key == "gender":
                if value[0] == "M":
                    males += 1
                elif value[0] == "F":
                    females += 1

    return males, females


def count_countries(data):
    countries = {}

    for o in data:
        for i, (key, value) in enumerate(o.items()):
            if key == "ip":
                for i2, (key2, value2) in enumerate(value.items()):
                    if key2 == "country":
                        if value2 == "" or value2 is None:
                            continue

                        if value2 in countries:
                            countries[value2] = countries[value2] + 1
                        else:
                            countries[value2] = 1

    return countries


def count_distribution(data):
    ranges = [
        "<18",
        "18-29",
        "30-49",
        ">50"
    ]
    age_distribution = {}
    for v in ranges:
        age_distribution[v] = 0

    for o in data:
        for i, (key, value) in enumerate(o.items()):
            if key == "age":
                for v in ranges:
                    if solve_age(v, {"age": value}):
                        age_distribution[v] = age_distribution[v] + 1

    return age_distribution
