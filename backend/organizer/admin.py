from django.contrib import admin
from .models import Organizer

class OrganizerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'date_joined')
    list_display_links = ('id', 'name')
    search_fields = ('name', )
    list_per_page = 25

admin.site.register(Organizer, OrganizerAdmin)
