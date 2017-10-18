from django.conf.urls import url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from . import views
from . import auth

app_name = 'landing'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^register/$', views.register, name='register'),
    url(r'^login/$', views.login, name='login'),
    url(r'^contact/$', views.contact, name='contact'),
    url(r'^elements/$', views.elements, name='elements'),
    url(r'^logout_auth/$', auth.logout_auth, name='logout_auth'),
    url(r'^account_activation_sent/$', views.account_activation_sent, name='account_activation_sent'),
    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        views.activate_auth, name='activate')
]

urlpatterns += staticfiles_urlpatterns()
