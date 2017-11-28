from rest_framework import serializers

from ads.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')


class AdvertisementCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = AdvertisementCategory
        fields = '__all__'


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


class ResourceSerializer(serializers.ModelSerializer):
    restrictions = RestrictionSerializer(many=True, read_only=True)

    class Meta:
        model = Resource
        fields = '__all__'


class AdvertisementSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    resources = ResourceSerializer(many=True, read_only=True)

    class Meta:
        model = Advertisement
        fields = '__all__'


class BiddingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Bidding
        fields = '__all__'


class AuctionSerializer(serializers.ModelSerializer):
    biddings = BiddingSerializer(many=True, read_only=True)

    class Meta:
        model = Auction
        fields = '__all__'


class SpaceSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    auctions = AuctionSerializer(many=True, read_only=True)
    restrictions = RestrictionSerializer(many=True, read_only=True)

    class Meta:
        model = Space
        fields = '__all__'


class ApplicationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    spaces = SpaceSerializer(many=True, read_only=True)

    class Meta:
        model = Application
        exclude = ("key",)
