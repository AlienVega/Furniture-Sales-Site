from django.shortcuts import render,redirect,HttpResponseRedirect
from .models import *
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.mail import send_mail
from django.template.loader import render_to_string, get_template
from django.core.mail import EmailMultiAlternatives, EmailMessage   
from django.template import Context
from django.conf import settings
from django.contrib import messages
from django.db.models import Q
# Create your views here.
def gonder(request):
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('textarea')
        tel = request.POST.get("tel")
        subject = 'Contact Form'
        message = f'Name: {name}\nEmail: {email}\n\nMessage:{message}\ntel:{tel}'
        from_email = settings.EMAIL_HOST_USER
        recipient_list = ['hydr.cbn@gmail.com']
        
        send_mail(subject, message, from_email, recipient_list)

def gonderdet(request,slug): 
        blog=Blog.objects.get(slug=slug) 
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('textarea')
        tel = request.POST.get("tel")
        url = request.build_absolute_uri()
        context = {
            'name': name,
            'email': email,
            'message': message,
            "tel":tel,
            'blogss':blog,
            'url':url
        }
        html_content = render_to_string('email.html', context)
        email = EmailMessage(
            'Konu',
            html_content,
            settings.DEFAULT_FROM_EMAIL,
            ['deneme@gmail.com'],
            reply_to=[email],
            headers={'Message-ID': 'foo'},
        )
        email.content_subtype = "html"
        email.send()

     
   
def index(request):
    post_list = Blog.objects.all()
    paginator = Paginator(post_list, 9) # Show 25 contacts per page
    
    page = request.GET.get('page')
    try:
        posts = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        posts = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        posts = paginator.page(paginator.num_pages)
    context={
        "blogs":Blog.objects.filter(is_active=True),
        "categories":Category.objects.all(),
        "posts":posts,
        
    }   
     
    if request.method == 'POST':
        gonder(request)
        context['alert'] = 'show'        
    
    
    
    return render(request,"index.html",context)

    
    
def product_home(request):
    blogsearch=Blog.objects.filter(is_active=True)
    query=request.GET.get("search")
    if query:
         blogsearch=blogsearch.filter(Q(title__icontains=query))
              
    context={
        "blogs":blogsearch,
        "categories":Category.objects.all()      
    }
    
    if request.method == 'POST':
        gonder(request)
        context['alert'] = 'show'
    return render(request,"products/urun.html",context)


def product_details(request,slug):
    
    context={
        "blog":Blog.objects.get(slug=slug) ,    
        "categories":Category.objects.filter(slug=slug)
    }
    if request.method == 'POST':
        gonderdet(request,slug)
        context['alert'] = 'show'
        
    return render(request,"products/urundetay.html",context)
    

def blogs_by_category(request,slug):
    context={
        "blogs":Category.objects.get(slug=slug).blog_set.filter(is_active=True),
        "categories":Category.objects.all(),
        "selected_category":slug
    }
    return render(request,"products/urun.html",context)
