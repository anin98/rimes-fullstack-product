from django.db import models
from django.core.exceptions import ValidationError

class Product (models.Model):
    name= models.CharField(max_length=100,blank=False)
    description = models.TextField()
    price = models.DecimalField(decimal_places=2,max_digits=10)

    def __str__(self):
        return self.name
    
    def clean(self):
        super().clean()  
       
        if not self.name.strip():
            raise ValidationError('Product name cannot be empty or whitespace.')

        if self.price <= 0:
            raise ValidationError('Price must be greater than zero.')




    
