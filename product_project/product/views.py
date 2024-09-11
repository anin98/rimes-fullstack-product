from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer
from rest_framework.generics import ListAPIView
from rest_framework import filters

class ProductList(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    
class PostProduct(APIView):
    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST )

class IndividualProduct(APIView):
    def get_object(self, id):
        try:
            return Product.objects.get(id=id)
        except Product.DoesNotExist:
            return None
    
    def get(self, request, id):
        product = self.get_object(id)
        if product is not None:
            serializer = ProductSerializer(product)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

    
    def put(self, request, id):
        product = self.get_object(id)
        if product is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # Use partial=True to allow partial updates
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        product = self.get_object(id)
        if product is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        product.delete()
        return Response({"message": "Delete is successful"}, status=status.HTTP_200_OK)