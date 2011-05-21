# Create your views here.

import datetime
import re

from django.http import HttpResponseRedirect, Http404, HttpResponse
from django.shortcuts import get_object_or_404, render_to_response 
from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt
from annoying.functions import get_object_or_None

from iStat.api.helpers import get_ip_from_request
from iStat.api.models import *

@csrf_exempt
def send_page (request):
    if request.method == 'GET':
        url = request.GET.get('url')
        title = request.GET.get('title')
        #this_ip = get_ip_from_request(request)
       
        if url is None or title is None:
            return HttpResponse("error in params")
        
        website_url = re.match("((https://www\.)|(https://)|(http://www\.)|(http://)|(www\.))?(?P<url>[\w.\-:]+)", url)
        
        if website_url is None:
            return HttpResponse("error matching website")
        website_url = website_url.group('url')
        
        website = get_object_or_None(WebSite, url = website_url)
        if website is None:
            website = WebSite(url = website_url)
            website.save() 
            
        page = get_object_or_None(Page, long_url = url, title = title)
        if page is None:
            page = Page(long_url = url, title = title, website = website)
            page.save()
            
        entry = get_object_or_None(Entry, page = page)
        if entry is None:
            entry = Entry(timestamp = datetime.datetime.now(), page = page)
            entry.save()
            
        page.cached_views += 1
        page.save()
        
        return render_to_response("send_page.json",
                                 {
                                    'message' : "Okay",
                                    'return_code' : 0,
                                    'title' : title,
                                    'url' : url,
                                 },
                                 context_instance = RequestContext(request)
                                )
    return HttpResponse("")


@csrf_exempt
def get_most_visited_pages (request):
    if request.method == 'GET':
        url = request.GET.get('website')
        
        if url is None:
            return HttpResponse("error in params")
            
        website_url = re.match("((https://www\.)|(https://)|(http://www\.)|(http://)|(www\.))?(?P<url>[\w.\-:]+)", url)
        
        if website_url is None:
            return HttpResponse("error matching website")
        website_url = website_url.group('url')
        
        website = get_object_or_None(WebSite, url = website_url)
        
        pages = Page.objects.filter(website = website).order_by("-cached_views")[:20]
        
        if 'html' in request.GET and request.GET['html'] == 'true':
            return render_to_response("get_most_visited_pages.html",
                                      {
                                        'pages' : pages,
                                        'website' : website,
                                      },
                                      context_instance = RequestContext(request)
                                     )
        else:
            return render_to_response("get_most_visited_pages.json",
                                      {
                                        'pages' : pages,
                                        'website' : website,
                                      },
                                      context_instance = RequestContext(request)
                                     )
