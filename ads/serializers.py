from rest_framework import serializers

from ads.models import *


class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = '__all__'

class AdvertisementSerializer(serializers.ModelSerializer):
    resources = ResourceSerializer(many=True)

    class Meta:
        model = Advertisement
        fields = '__all__'

class RestrictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restriction
        fields = '__all__'

class BiddingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bidding
        fields = '__all__'

class AuctionSerializer(serializers.ModelSerializer):
    biddings = BiddingSerializer(many=True)

    class Meta:
        model = Auction
        fields = '__all__'

class SpaceSerializer(serializers.ModelSerializer):
    auctions = AuctionSerializer(many=True)
    restrictions = RestrictionSerializer(many=True)

    class Meta:
        model = Space
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')

class ApplicationSerializer(serializers.ModelSerializer):
    spaces = SpaceSerializer(many=True)

    class Meta:
        model = Application
        fields = '__all__'
