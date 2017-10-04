from django.conf.urls import url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from . import views
from . import auth

app_name = 'bio'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^register/$', views.register, name='register'),
    url(r'^login/$', views.login, name='login'),
    url(r'^contact/$', views.contact, name='contact'),
    url(r'^elements/$', views.elements, name='elements'),
    url(r'^login_auth/$', auth.login_auth, name='login_auth'),
    url(r'^logout_auth/$', auth.logout_auth, name='logout_auth'),
    url(r'^register_auth/$', auth.register_auth, name='register_auth'),
]

urlpatterns += staticfiles_urlpatterns()
