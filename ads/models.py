from django.contrib.auth.models import User
from django.db import models


class ApplicationCategory(models.Model):
    category = models.TextField(max_length=32)
    description = models.TextField(max_length=256)


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


class SpaceCategory(models.Model):
    category = models.TextField(max_length=32)
    description = models.TextField(max_length=256)


class Restriction(models.Model):
    restriction = models.TextField(max_length=16)
    description = models.TextField(max_length=256)
    unit = models.TextField(max_length=16)

    def __str__(self):
        return self.restriction


class Space(models.Model):
    application = models.OneToOneField(Application)
    category = models.OneToOneField(SpaceCategory)
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


class Auction(models.Model):
    space = models.OneToOneField(Space)
    end_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.space.name


class Bidding(models.Model):
    auction = models.OneToOneField(Auction)
    user = models.OneToOneField(User)
    price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
