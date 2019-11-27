from django.contrib import admin

from ads.models import *

admin.site.register(Application)
admin.site.register(Auction)
admin.site.register(Restriction)
admin.site.register(Space)
admin.site.register(Advertisement)
admin.site.register(Resource)
admin.site.register(Contract)
admin.site.register(Bidding)

admin.site.register(SpaceRestriction)
admin.site.register(ResourceRestriction)

admin.site.register(AuctionStatus)
admin.site.register(ApplicationCategory)
