from django.conf.urls import url, include
from rest_framework import routers

from ads.rest import *
from . import views

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, base_name='User')
router.register(r'applications', ApplicationViewSet, base_name='Application')
router.register(r'advertisements', AdvertisementViewSet, base_name='Advertisement')
router.register(r'spaces', SpaceViewSet, base_name='Space')
router.register(r'auctions', AuctionViewSet, base_name='Auction')
router.register(r'biddings', BiddingViewSet, base_name='Bidding')
router.register(r'restriction', RestrictionViewSet, base_name='Restriction')
router.register(r'spacerestriction', SpaceRestrictionViewSet, base_name='SpaceRestriction')
router.register(r'resources', ResourceViewSet, base_name='Resource')
router.register(r'resourcerestriction', ResourceRestrictionViewSet, base_name='ResourceRestriction')
router.register(r'contracts', ContractViewSet, base_name='Contract')
router.register(r'applicationcategories', ApplicationCategoryViewSet, base_name='ApplicationCategory')

router.register(r'all-spaces', AllSpacesViewSet, base_name='All Spaces')
router.register(r'all-auctions', AllAuctionsViewSet, base_name='All Auctions')
router.register(r'all-biddings', AllBiddingsViewSet, base_name='All Biddings')

router.register(r'analytics-publisher', ContractIpLogViewSetPublisher, base_name='AnalyticsPublisher')
router.register(r'analytics-advertiser', ContractIpLogViewSetAdvertiser, base_name='AnalyticsAdvertiser')

app_name = 'ads'
urlpatterns = [
    url(r'^ad/$', views.ad, name='ad'),
    url(r'^api/', include(router.urls)),
    url(r'^api/application-count/$', ApplicationCountView.as_view(), name='application-count'),
    url(r'^api/badds-count/$', AdvertisementCountView.as_view(), name='advertisement-count'),
    url(r'^api/space-count/$', SpaceCountView.as_view(), name='space-count'),
    url(r'^api/contract-count/$', ContractCountView.as_view(), name='contract-count'),
    url(r'^', views.index, name='index'),
]
