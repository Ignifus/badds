from django.contrib import admin

from ads.models import Application, Auction, Restriction, Space

admin.site.register(Application)
admin.site.register(Auction)
admin.site.register(Restriction)
admin.site.register(Space)
