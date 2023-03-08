from django.urls import path
from .views import *

urlpatterns=[
    path("",view=index,name="index"),
    path("urunler/",view=product_home,name="product_home"),
    path("category/<slug:slug>",view=blogs_by_category,name="blogs_by_category"),
    path("urundetay/<slug:slug>",view=product_details,name="product_details"),
    
]