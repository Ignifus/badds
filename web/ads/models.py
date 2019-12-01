from django.contrib.auth.models import User
from django.db import models


class ApplicationCategory(models.Model):
    category = models.TextField(max_length=32)
    description = models.TextField(max_length=256)

    def __str__(self):
        return self.category

    class Meta:
        verbose_name_plural = "Advertisement Categories"


class Application(models.Model):
    user = models.ForeignKey(User, related_name='applications', on_delete=models.PROTECT)
    name = models.TextField(max_length=256)
    description = models.TextField(max_length=256)
    domain = models.TextField(max_length=256, unique=True)
    key = models.TextField(max_length=256)
    category = models.ForeignKey(ApplicationCategory, on_delete=models.PROTECT)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Restriction(models.Model):
    restriction = models.TextField(max_length=16)
    description = models.TextField(max_length=256)

    def __str__(self):
        return self.restriction


class Space(models.Model):
    application = models.ForeignKey(Application, related_name='spaces', on_delete=models.PROTECT)
    name = models.TextField(max_length=64)
    x_size = models.IntegerField()
    y_size = models.IntegerField()
    restrictions = models.ManyToManyField(Restriction, through='SpaceRestriction')
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class SpaceRestriction(models.Model):
    space = models.ForeignKey(Space, related_name='spaces', on_delete=models.PROTECT)
    restriction = models.ForeignKey(Restriction, related_name='space_restrictions', on_delete=models.PROTECT)
    value = models.TextField(max_length=16)

    def __str__(self):
        return self.space.name + " " + self.restriction.restriction


class AuctionStatus(models.Model):
    AUCTION_STATUS = (
        ('Active', 'Active'),
        ('Extended', 'Extended'),
        ('Closed', 'Closed'),
        ('Removed', 'Removed')
    )
    status = models.CharField(
        max_length=16,
        choices=AUCTION_STATUS,
        default='Active',
    )

    def __str__(self):
        return self.status

    class Meta:
        verbose_name_plural = "Auction Status"


class Auction(models.Model):
    space = models.ForeignKey(Space, related_name='auctions', on_delete=models.PROTECT)
    prints = models.IntegerField()
    status = models.ForeignKey(AuctionStatus, blank=True, null=True, default=1, on_delete=models.PROTECT)
    end_date = models.DateTimeField()
    contract_duration_days = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.space.name


class Advertisement(models.Model):
    name = models.TextField(max_length=256)
    description = models.TextField(max_length=256)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Bidding(models.Model):
    auction = models.ForeignKey(Auction, related_name='biddings', on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    advertisement = models.ForeignKey(Advertisement, related_name='biddings', on_delete=models.PROTECT)
    ppp_usd = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.auction.space.name + " for " + str(self.ppp_usd)


class Resource(models.Model):
    advertisement = models.ForeignKey(Advertisement, related_name='resources', on_delete=models.PROTECT)
    name = models.TextField(max_length=128)
    path = models.TextField(max_length=128)
    url_link = models.TextField(max_length=128)
    restrictions = models.ManyToManyField(Restriction, through='ResourceRestriction')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.advertisement.name


class ResourceRestriction(models.Model):
    resource = models.ForeignKey(Resource, related_name='resources', on_delete=models.PROTECT)
    restriction = models.ForeignKey(Restriction, related_name='resource_restrictions', on_delete=models.PROTECT)
    value = models.TextField(max_length=16)

    def __str__(self):
        return self.resource.name + " " + self.restriction.restriction


class Contract(models.Model):
    space = models.ForeignKey(Space, on_delete=models.PROTECT)
    advertisement = models.ForeignKey(Advertisement, related_name='contracts', on_delete=models.PROTECT)
    prints = models.IntegerField()
    ppp_usd = models.FloatField()
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField()

    def __str__(self):
        return self.space.name + " " + self.advertisement.name


class Ip(models.Model):
    ip = models.TextField(max_length=64)
    country = models.TextField(max_length=32)


class ContractIpLog(models.Model):
    contract = models.ForeignKey(Contract, related_name='ips', on_delete=models.PROTECT)
    ip = models.ForeignKey(Ip, on_delete=models.PROTECT)
    time = models.DateTimeField(auto_now_add=True)
