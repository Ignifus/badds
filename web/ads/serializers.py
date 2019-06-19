from rest_framework import serializers
from rest_framework.fields import DateField

from ads.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')


class ApplicationCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationCategory
        fields = '__all__'


class ContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = '__all__'


class RestrictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restriction
        fields = '__all__'


class SpaceRestrictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpaceRestriction
        fields = '__all__'


class ResourceRestrictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourceRestriction
        fields = '__all__'


class ResourceSerializer(serializers.ModelSerializer):
    base_64 = serializers.CharField(source='path')
    path = serializers.ReadOnlyField()

    restrictions = RestrictionSerializer(read_only=True, many=True)

    class Meta:
        model = Resource
        fields = '__all__'


class AdvertisementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advertisement
        fields = '__all__'


class BiddingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bidding
        fields = '__all__'


class AuctionSerializer(serializers.ModelSerializer):
    end_date = DateField()

    class Meta:
        model = Auction
        fields = '__all__'


class SpaceSerializer(serializers.ModelSerializer):
    restrictions = RestrictionSerializer(read_only=True, many=True)

    class Meta:
        model = Space
        fields = '__all__'


class ApplicationSerializer(serializers.ModelSerializer):
    key = serializers.ReadOnlyField()

    class Meta:
        model = Application
        fields = '__all__'
