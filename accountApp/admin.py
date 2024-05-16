from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin

class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'first_name', 'last_name', 'username', 'is_active', 'date_joined')
    ordering = ('-date_joined',) 
    filter_horizontal = ()
    list_filter = ()
    fieldsets = () 

admin.site.register(User, CustomUserAdmin)
