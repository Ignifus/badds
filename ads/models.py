from django.contrib.auth.models import User
from django.db import models


class ApplicationCategory(models.Model):
    category = models.TextField(max_length=32)
    description = models.TextField(max_length=256)

    def __str__(self):
        return self.category


class Application(models.Model):
    user = models.OneToOneField(User)
    name = models.TextField(max_length=256)
    domain = models.TextField(max_length=256, unique=True)
    key = models.TextField(max_length=256)
    category = models.OneToOneField(ApplicationCategory)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name',)


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
    application = models.OneToOneField(Application)
    category = models.OneToOneField(AdvertisementCategory)
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

    class Meta:
        ordering = ('name',)


class SpaceRestriction(models.Model):
    space = models.OneToOneField(Space)
    restriction = models.OneToOneField(Restriction)
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
    space = models.OneToOneField(Space)
    status = models.OneToOneField(AuctionStatus)
    end_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.space.name


class Bidding(models.Model):
    auction = models.OneToOneField(Auction)
    user = models.OneToOneField(User)
    price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)


class Advertisement(models.Model):
    name = models.TextField(max_length=256)
    user = models.OneToOneField(User)
    advertisement_category = models.OneToOneField(AdvertisementCategory)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Resource(models.Model):
    advertisment = models.OneToOneField(Advertisement)
    path = models.TextField(max_length=256)
    data_type = models.TextField(max_length=8)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.advertisment.name
