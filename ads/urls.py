from django.conf.urls import url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from . import views

app_name = 'ads'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^context/$', views.context, name='index')
]

urlpatterns += staticfiles_urlpatterns()
