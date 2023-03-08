from django.db import models
from django.utils.text import slugify
from ckeditor.fields import RichTextField
# Create your models here.

class Category(models.Model):
    name=models.CharField(max_length=150)
    slug=models.SlugField(null=False,unique=True,db_index=True,editable=False,blank=True)

    def save(self,*args,**kwargs):
        self.slug=slugify(self.name.replace('ı', 'i'))
        super().save(*args,**kwargs)

    def __str__(self):
        return f"{self.name}"

class Blog(models.Model):
    title=models.CharField(max_length=200)
    image=models.ImageField(upload_to="blogs")
    description=RichTextField()
    is_active=models.BooleanField(default=False)
    slug=models.SlugField(null=False,unique=True,db_index=True,editable=False,blank=True)
    categories=models.ManyToManyField(Category,blank=True)
    date=models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering=["-date"]

    def __str__(self):
        return f"{self.title}"

    def save(self,*args,**kwargs):
        self.slug=slugify(self.title)
        super().save(*args,**kwargs)