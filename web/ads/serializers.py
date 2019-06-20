from rest_framework import serializers

from ads.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')


class ApplicationCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationCategory
        fields = '__all__'


class RestrictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restriction
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
    user = UserSerializer(read_only=True)

    class Meta:
        model = Advertisement
        fields = '__all__'
        read_only_fields = ('user',)


class ApplicationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    key = serializers.ReadOnlyField()  # TODO Hide
    category = ApplicationCategorySerializer()

    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ('user', )


class SpaceSerializer(serializers.ModelSerializer):
    application = ApplicationSerializer(read_only=True)
    restrictions = RestrictionSerializer(read_only=True, many=True)

    class Meta:
        model = Space
        fields = '__all__'


class ContractSerializer(serializers.ModelSerializer):
    space = SpaceSerializer(read_only=True)
    advertisement = AdvertisementSerializer(read_only=True)

    class Meta:
        model = Contract
        fields = '__all__'


class SpaceRestrictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpaceRestriction
        fields = '__all__'


class AuctionStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuctionStatus
        fields = '__all__'


class AuctionSerializer(serializers.ModelSerializer):
    space = SpaceSerializer(read_only=True)
    status = AuctionStatusSerializer(read_only=True)
    end_date = serializers.DateTimeField()

    class Meta:
        model = Auction
        fields = '__all__'


class BiddingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    auction = AuctionSerializer(read_only=True)

    class Meta:
        model = Bidding
        fields = '__all__'
