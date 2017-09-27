from django.conf.urls import url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from . import views

app_name = 'bio'
urlpatterns = [
    url(r'^$', views.index, name='landing'),
    url(r'^register/$', views.register, name='home'),
    url(r'^contact/$', views.contact, name='home'),
]

urlpatterns += staticfiles_urlpatterns()
