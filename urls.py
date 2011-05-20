from django.conf.urls.defaults import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()
from iStat import settings

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'iStat.views.home', name='home'),
    # url(r'^iStat/', include('iStat.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    (r'^xstatic/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_DOC_ROOT}),    
    (r'^api/', include('iStat.api.urls')),
)
