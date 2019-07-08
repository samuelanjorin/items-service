# turing-items-service

This is on one the services of Turing Eccomerce Microservices. 

# Deployed on Port http://3.130.189.86:7008

# Gateway Path :  http://3.130.189.86:8000/items-service/ 

It handles the below Items features:
# Products
1. Get All products: http://3.130.189.86:8000/items-service/v1/api/products?page=1&limit=30&description_length=100
2. Search Products: http://3.130.189.86:8000/items-service/v1/api/products/search?query_string=Arc&all_words=&page=1&limit=1&description_length=
3. Get Product By ID: http://3.130.189.86:8000/items-service/v1/api/products/1
4. Get Products By category: http://3.130.189.86:8000/items-service/v1/api/products/inCategory/2?limit=5
5. Get Product Details: http://3.130.189.86:8000/items-service/v1/api/products/1/details
6. Get Product Location: http://3.130.189.86:8000/items-service/v1/api/products/1/locations
7. Post Product Review: http://3.130.189.86:8000/items-service/v1/api/products/1/reviews
8. Get Product Review: http://3.130.189.86:8000/items-service/v1/api/products/1/reviews
# Attributes
9. Get Attributes: http://3.130.189.86:8000/items-service/v1/api/attributes
10. Get Attributes By ID: http://3.130.189.86:8000/items-service/v1/api/attributes/1
11. Get Value of Attributes: http://3.130.189.86:8000/items-service/v1/api/attributes/values/1
12 Get All Attribute By Product ID: http://localhost:8000/items-service/v1/api/attributes/inProduct/4
# Departments
13. Get All Departments: http://3.130.189.86:8000/items-service/v1/api/departments
14. Get Department By ID: http://3.130.189.86:8000/items-service/v1/api/departments/1
# Categories
15. Get All Categories: http://3.130.189.86:8000/items-service/v1/api/categories
16. Get Category By ID: http://3.130.189.86:8000/items-service/v1/api/categories/2
17. Get Categories By Product ID: http://3.130.189.86:8000/items-service/v1/api/categories/inProduct/1
18. Get categories By Department: http://3.130.189.86:8000/items-service/v1/api/categories/inDepartment/1

# Microservice Architecture Documentation: https://drive.google.com/file/d/1d8kSf8xTtmmtyWEhn56nqC4CubaOv8Eg/view?usp=sharing





