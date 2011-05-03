from django.conf.urls.defaults import *

urlpatterns = patterns('',
    (r'^send-page/', 'iStat.api.views.send_page'),
    (r'^most-visited/', 'iStat.api.views.get_most_visited_pages'),
)