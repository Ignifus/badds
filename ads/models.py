from django.contrib.auth.models import User
from django.db import models


class ApplicationCategory(models.Model):
    category = models.TextField(max_length=32)
    description = models.TextField(max_length=256)

    def __str__(self):
        return self.category


class Application(models.Model):
    user = models.ForeignKey(User, related_name='applications')
    name = models.TextField(max_length=256)
    domain = models.TextField(max_length=256, unique=True)
    key = models.TextField(max_length=256)
    category = models.ForeignKey(ApplicationCategory)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class AdvertisementCategory(models.Model):
    category = models.TextField(max_length=32)
    description = models.TextField(max_length=256)

    def __str__(self):
        return self.category


class Restriction(models.Model):
    restriction = models.TextField(max_length=16)
    description = models.TextField(max_length=256)

    def __str__(self):
        return self.restriction


class Space(models.Model):
    application = models.ForeignKey(Application, related_name='spaces')
    category = models.ForeignKey(AdvertisementCategory)
    name = models.TextField(max_length=16)
    x_size = models.IntegerField()
    y_size = models.IntegerField()
    restrictions = models.ManyToManyField(Restriction, through='SpaceRestriction')
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class SpaceRestriction(models.Model):
    space = models.ForeignKey(Space, related_name='spaces')
    restriction = models.ForeignKey(Restriction, related_name='space_restrictions')
    value = models.TextField(max_length=16)


class AuctionStatus(models.Model):
    AUCTION_STATUS = (
        ('Active', 'Active'),
        ('Extended', 'Extended'),
        ('Finished', 'Finished'),
        ('Closed', 'Closed'),
        ('Removed', 'Removed')
    )
    status = models.CharField(
        max_length=16,
        choices=AUCTION_STATUS,
        default='Acitve',
    )

    def __str__(self):
        return self.status


class Auction(models.Model):
    space = models.ForeignKey(Space, related_name='auctions')
    status = models.ForeignKey(AuctionStatus)
    end_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.space.name


class Bidding(models.Model):
    auction = models.ForeignKey(Auction, related_name='biddings')
    user = models.ForeignKey(User)
    ppp_usd = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)


class Advertisement(models.Model):
    name = models.TextField(max_length=256)
    user = models.ForeignKey(User)
    advertisement_category = models.ForeignKey(AdvertisementCategory)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Resource(models.Model):
    advertisement = models.ForeignKey(Advertisement, related_name='resources')
    name = models.TextField(max_length=128)
    path = models.TextField(max_length=256)
    restrictions = models.ManyToManyField(Restriction, through='ResourceRestriction')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.advertisement.name


class ResourceRestriction(models.Model):
    resource = models.ForeignKey(Resource, related_name='resources')
    restriction = models.ForeignKey(Restriction, related_name='resource_restrictions')
    value = models.TextField(max_length=16)


class Contract(models.Model):
    space = models.ForeignKey(Space)
    advertisement = models.ForeignKey(Advertisement)
    prints = models.IntegerField()
    ppp_usd = models.FloatField()
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.space.name + " " + self.advertisement.name


class Ip(models.Model):
    ip = models.TextField(max_length=64)
    country = models.TextField(max_length=16)


class ContractIpLog(models.Model):
    contract = models.ForeignKey(Contract, related_name='ips')
    ip = models.ForeignKey(Ip)
    time = models.DateTimeField(auto_now_add=True)
