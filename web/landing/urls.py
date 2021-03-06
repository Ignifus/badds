from django.conf.urls import url

from django.contrib.auth import views as auth_views

from . import auth
from . import views

app_name = 'landing'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^register/$', views.register, name='register'),
    url(r'^login/$', views.login, name='login'),
    url(r'^accounts/login/$', views.login, name='login'),
    url(r'^recover/$', views.recover, name='recover'),
    url(r'^contact/$', views.contact, name='contact'),
    url(r'^account/$', views.account, name='account'),
    url(r'^pay/$', views.pay, name='pay'),
    url(r'^extract/$', views.extract, name='extract'),
    url(r'^cancel/$', views.cancel, name='cancel'),
    url(r'^sdk/$', views.sdk, name='sdk'),
    url(r'^account_activation_sent/$', views.account_activation_sent, name='account_activation_sent'),
    url(r'^logout_auth/$', auth.logout_auth, name='logout_auth'),
    url(r'^resend_mail/$', auth.resend_mail, name='send_mail'),
    url(r'^password_reset/(?P<uidb64>.+)/(?P<token>.+)/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset'),
    url(r'^change_pass/', auth_views.PasswordChangeView.as_view(), name='password_reset'),
    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        views.activate_auth, name='activate')
]
