from django.db import models

class WebSite(models.Model):
    url = models.CharField(max_length=128, unique = True)
    
    def __unicode__ (self):
        return self.url

    
class Page(models.Model):
    long_url = models.CharField(max_length = 512)
    short_url = models.CharField(max_length = 16, default = "")
    title = models.CharField(max_length = 512)
    cached_views = models.IntegerField(default = 0)
    rating_score = models.IntegerField(default = 0)
    rating_count = models.IntegerField(default = 0)
    website = models.ForeignKey(WebSite)
    
    def __unicode__ (self):
        return self.long_url
    

class Entry(models.Model):
    timestamp = models.DateTimeField()
    page = models.ForeignKey(Page)
    ip = models.CharField(max_length=16)
    
    def __unicode__ (self):
        return str(self.id)
