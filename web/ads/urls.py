from django.conf.urls import url, include
from rest_framework import routers

from ads.rest import *
from . import views

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, base_name='User')
router.register(r'applications', ApplicationViewSet)
router.register(r'badds', AdvertisementViewSet)
router.register(r'spaces', SpaceViewSet)
router.register(r'auctions', AuctionViewSet)
router.register(r'biddings', BiddingViewSet)
router.register(r'restriction', RestrictionViewSet)
router.register(r'spacerestriction', SpaceRestrictionViewSet)
router.register(r'resources', ResourceViewSet)
router.register(r'resourcerestriction', ResourceRestrictionViewSet)
router.register(r'contracts', ContractViewSet)
router.register(r'applicationcategories', ApplicationCategoryViewSet)

app_name = 'ads'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^ad/$', views.ad, name='ad'),
    url(r'^api/', include(router.urls)),
    url(r'^api/application-count/$', ApplicationCountView.as_view(), name='application-count'),
    url(r'^api/badds-count/$', AdvertisementCountView.as_view(), name='advertisement-count'),
    url(r'^api/space-count/$', SpaceCountView.as_view(), name='space-count'),
    url(r'^api/contract-count/$', ContractCountView.as_view(), name='contract-count'),
]
