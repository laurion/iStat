#!/usr/bin/env python2

import urllib2
import urllib
import os
import string
import random

url = "http://localhost:8000/api/send-page/"

user_agent = 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'
headers = { 'User-Agent' : user_agent }

values = {
	'url' : 'http://example.com/%s' % random.choice(string.letters),
	'title' : 'My blog',
}


data = urllib.urlencode(values)
request = urllib2.Request(url, data, headers)
response = urllib2.urlopen(request).read()

print response
