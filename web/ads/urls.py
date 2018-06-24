from django.conf.urls import url, include
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from rest_framework import routers

from ads.rest import *
from . import views

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, base_name='User')
router.register(r'applications', ApplicationViewSet)
router.register(r'advertisements', AdvertisementViewSet)
router.register(r'spaces', SpaceViewSet)
router.register(r'auctions', AuctionViewSet)
router.register(r'biddings', BiddingViewSet)
router.register(r'restriction', RestrictionViewSet)
router.register(r'resources', ResourceViewSet)
router.register(r'contracts', ContractViewSet)
router.register(r'applicationcategories', ApplicationCategoryViewSet)

app_name = 'ads'
urlpatterns = [
    url(r'^$', views.panel, name='panel'),
    url(r'^publisher/$', views.publisher, name='publisher'),
    url(r'^advertiser/$', views.advertiser, name='advertiser'),
    url(r'^', include(router.urls)),
    url(r'^ad/$', views.ad, name='ad'),
    url(r'^application-count/$', ApplicationCountView.as_view(), name='application-count'),
    url(r'^advertisement-count/$', AdvertisementCountView.as_view(), name='advertisement-count'),
    url(r'^space-count/$', SpaceCountView.as_view(), name='space-count'),
    url(r'^contract-count/$', ContractCountView.as_view(), name='contract-count'),
]

urlpatterns += staticfiles_urlpatterns()