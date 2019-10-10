# turing-items-service

        This is the items-service of Turing Eccomerce Microservices. 

# Deployed on Port http://Host:7008

# Gateway Path :  http://Host:8000/items-service/ 

        It handles the below Items features:
# Products
        1. Get All products: http://Host:8000/items-service/v1/api/products?page=1&limit=30&description_length=100
        2. Search Products: http://Host:8000/items-service/v1/api/products/search?query_string=Arc&all_words=&page=1&limit=1&description_length=
        3. Get Product By ID: http://Host:8000/items-service/v1/api/products/1
        4. Get Products By category: http://Host:8000/items-service/v1/api/products/inCategory/2?limit=5
        5. Get Product Details: http://Host:8000/items-service/v1/api/products/1/details
        6. Get Product Location: http://Host:8000/items-service/v1/api/products/1/locations
        7. Post Product Review: http://Host:8000/items-service/v1/api/products/1/reviews
        8. Get Product Review: http://Host:8000/items-service/v1/api/products/1/reviews
# Attributes
        9. Get Attributes: http://Host:8000/items-service/v1/api/attributes
        10. Get Attributes By ID: http://Host:8000/items-service/v1/api/attributes/1
        11. Get Value of Attributes: http://Host:8000/items-service/v1/api/attributes/values/1
        12 Get All Attribute By Product ID: http://localhost:8000/items-service/v1/api/attributes/inProduct/4
# Departments
        13. Get All Departments: http://Host:8000/items-service/v1/api/departments
        14. Get Department By ID: http://Host:8000/items-service/v1/api/departments/1
# Categories
        15. Get All Categories: http://Host:8000/items-service/v1/api/categories
        16. Get Category By ID: http://Host:8000/items-service/v1/api/categories/2
        17. Get Categories By Product ID: http://Host:8000/items-service/v1/api/categories/inProduct/1
        18. Get categories By Department: http://Host:8000/items-service/v1/api/categories/inDepartment/1

# Microservice Architecture Documentation: https://drive.google.com/file/d/1d8kSf8xTtmmtyWEhn56nqC4CubaOv8Eg/view?usp=sharing
