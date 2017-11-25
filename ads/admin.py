from django.contrib import admin

from ads.models import Application, Auction, Restriction, Space, Advertisement, Resource, ApplicationCategory, AuctionStatus, AdvertisementCategory

admin.site.register(Application)
admin.site.register(Auction)
admin.site.register(Restriction)
admin.site.register(Space)
admin.site.register(Advertisement)
admin.site.register(Resource)

admin.site.register(AdvertisementCategory)
admin.site.register(AuctionStatus)
admin.site.register(ApplicationCategory)
