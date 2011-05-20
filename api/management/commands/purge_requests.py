import datetime
import hashlib

from django.core.management.base import BaseCommand, CommandError
from django.core.urlresolvers import reverse

from iStat.api.models import *

class Command(BaseCommand):
    help = 'Creates default entries in database, like default contest, default blog entry, etc'

    def handle(self, *args, **options):
        objects = Entry.objects.filter(timestamp__lt = datetime.datetime.now() - datetime.timedelta(hours = 1))
        for entry in objects:
            entry.page.cached_views -=1
            entry.page.save
            entry.delete()
        
