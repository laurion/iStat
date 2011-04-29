from django.conf.urls.defaults import *

urlpatterns = patterns('',
    (r'^send-page/$', 'iStat.api.views.send_page'),
)