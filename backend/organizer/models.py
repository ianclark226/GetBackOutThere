from django.db import models
from datetime import datetime

class Organizer(models.Model):
    name = models.CharField(max_length=50)
    photo = models.ImageField(upload_to='photos/%Y/%m/%d/')
    description = models.TextField(blank=True)
    rating = models.TextField(blank=True)
    date_joined = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return self.name
