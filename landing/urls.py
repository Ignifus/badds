from django.conf.urls import url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from . import views

app_name = 'bio'
urlpatterns = [
    url(r'^$', views.landing, name='landing'),
]

urlpatterns += staticfiles_urlpatterns()
