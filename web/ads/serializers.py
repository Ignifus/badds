import json

from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework_bulk import BulkListSerializer, BulkSerializerMixin

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
        depth = 1


class ResourceRestrictionSerializer(BulkSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = ResourceRestriction
        fields = '__all__'
        list_serializer_class = BulkListSerializer

    def __init__(self, *args, **kwargs):
        super(ResourceRestrictionSerializer, self).__init__(*args, **kwargs)

        if 'request' in self.context:
            user = self.context['request'].user
            self.fields['resource'] = PrimaryKeyRelatedField(queryset=Resource.objects.filter(advertisement__user=user))


class ResourceSerializer(serializers.ModelSerializer):
    image = serializers.FileField(source='path')
    path = serializers.ReadOnlyField()
    restrictions = serializers.SerializerMethodField()

    def get_restrictions(self, obj):
        return ResourceRestriction.objects.select_related('restriction').filter(resource=obj).values('restriction__restriction', 'value')

    class Meta:
        model = Resource
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(ResourceSerializer, self).__init__(*args, **kwargs)

        if 'request' in self.context:
            user = self.context['request'].user
            self.fields['advertisement'] = PrimaryKeyRelatedField(queryset=Advertisement.objects.filter(user=user))


class AdvertisementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advertisement
        fields = '__all__'
        read_only_fields = ('user',)


class ApplicationSerializer(serializers.ModelSerializer):
    key = serializers.ReadOnlyField()

    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ('user', 'active')


class RestrictedApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ('name', 'description', 'domain', 'category', )


class SpaceRestrictionSerializer(BulkSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = SpaceRestriction
        fields = '__all__'
        list_serializer_class = BulkListSerializer

    def __init__(self, *args, **kwargs):
        super(SpaceRestrictionSerializer, self).__init__(*args, **kwargs)

        if 'request' in self.context:
            user = self.context['request'].user
            self.fields['space'] = PrimaryKeyRelatedField(queryset=Space.objects.filter(application__user=user))


class SpaceSerializer(serializers.ModelSerializer):
    restrictions = serializers.SerializerMethodField()
    application = RestrictedApplicationSerializer()

    def get_restrictions(self, obj):
        return SpaceRestriction.objects.select_related('restriction').filter(space=obj).values('restriction__restriction', 'value')

    class Meta:
        model = Space
        fields = '__all__'
        read_only_fields = ('active',)

    def __init__(self, *args, **kwargs):
        super(SpaceSerializer, self).__init__(*args, **kwargs)

        if 'request' in self.context:
            user = self.context['request'].user
            self.fields['application'] = PrimaryKeyRelatedField(queryset=Application.objects.filter(user=user))


class ContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = '__all__'
        read_only_fields = ('active', )


class AuctionSerializer(serializers.ModelSerializer):
    end_date = serializers.DateTimeField()
    space = SpaceSerializer()

    class Meta:
        model = Auction
        fields = '__all__'
        read_only_fields = ('status',)
        depth = 1

    def __init__(self, *args, **kwargs):
        super(AuctionSerializer, self).__init__(*args, **kwargs)

        if 'request' in self.context:
            user = self.context['request'].user
            self.fields['space'] = PrimaryKeyRelatedField(queryset=Space.objects.filter(application__user=user))


class AllAuctionsSerializer(serializers.ModelSerializer):
    space = SpaceSerializer()

    class Meta:
        model = Auction
        fields = '__all__'


class BiddingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bidding
        fields = '__all__'
        read_only_fields = ('user',)

    def __init__(self, *args, **kwargs):
        super(BiddingSerializer, self).__init__(*args, **kwargs)

        if 'request' in self.context:
            user = self.context['request'].user
            self.fields['advertisement'] = PrimaryKeyRelatedField(queryset=Advertisement.objects.filter(user=user))


class AllBiddingsSerializer(serializers.ModelSerializer):
    advertisement = AdvertisementSerializer()
    auction = AuctionSerializer()

    class Meta:
        model = Bidding
        fields = '__all__'


class IpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ip
        fields = '__all__'


class ContractIpLogSerializer(serializers.ModelSerializer):
    contract = ContractSerializer()
    ip = IpSerializer()

    class Meta:
        model = ContractIpLog
        fields = '__all__'
