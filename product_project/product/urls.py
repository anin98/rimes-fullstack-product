from django.urls import path
from .views import *
urlpatterns = [
    path('products/', ProductList.as_view(), name='product-list'),
    path('uploadproduct/', PostProduct.as_view(), name='product-list-create'),
    path('product/<int:id>/', IndividualProduct.as_view(), name='product-detail'),
]
