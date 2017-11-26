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
    unit = models.TextField(max_length=16)

    def __str__(self):
        return self.restriction


class Space(models.Model):
    application = models.ForeignKey(Application, related_name='spaces')
    category = models.ForeignKey(AdvertisementCategory)
    name = models.TextField(max_length=16)
    dimensions = models.TextField(max_length=16)
    unit = models.TextField(max_length=16)
    price = models.FloatField()
    prints = models.IntegerField()
    restrictions = models.ManyToManyField(Restriction, through='SpaceRestriction')
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class SpaceRestriction(models.Model):
    space = models.ForeignKey(Space, related_name='spaces')
    restriction = models.ForeignKey(Restriction, related_name='restrictions')
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
    price = models.FloatField()
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
    path = models.TextField(max_length=256)
    data_type = models.TextField(max_length=8)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.advertisement.name
