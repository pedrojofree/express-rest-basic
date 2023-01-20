# REST Server Template  (3.0.0)
CRUD ready with many validators between requests. Product, Categories and User creation with hosted Images in the cloud. A solid MVC REST Server Template.

### Usage
1. Clone the repository.
2. ```npm install``` to install all the dependencies (CORS, dotenv, express, express-validator, mongoose, bcryptjs, jsonwebtoken, google-auth-library, express-fileupload, cloudinary).
3. Rename ```.example.env``` to ```.env``` and add your keys.
4. ```node or nodemon app.js```


### Available routes:

#### Google Sign-in 
+ ```http://localhost:PORT/ ```
    + The only project Frontend. It uses de Google Identity API to recognise ```correo```, ```img``` and ```name```. Then creates your user in MongoDB.

#### Users
+ ```http://localhost:PORT/api/users ```

    + ```GET``` It allows 2 queries from URL: ```limit``` and ```from```. It returs a JSON according to previous queries.

    + ```POST``` Create a new user in DB with this body. Password will be encrypted with ```bcryptjs```.
    ```
            {
                "nombre": "test",
                "correo": "test@test.com",
                "password": "123456",
                "rol": "USER_ROLE"
            }
    ```
    + ```PUT``` Update User given in URL ```http://localhost:PORT/api/users/${MONGOID}```.
    ```
            {
                "any": "any",
            }
    ```
    + ```DELETE``` Changes user ```estado``` instead of deleting physically with given MongoID.
    ```
            http://localhost:PORT/api/users/${MONGOID}
    ```

#### Categories
+ ```http://localhost:PORT/api/categories ```
    + ```GET``` It allows 2 queries from URL: ```limit``` and ```from```. It returs a JSON according to previous queries.
    + ```GET``` Also allows GET request to a specific MongoID given by url```http://localhost:PORT/api/categories/${MONGOID}```.

    + ```POST``` Create a new Category in DB with this body. ```nombre``` will be upper cased.
    ```
            {
                "nombre": "Food"
            }
    ```
    + ```PUT``` Update Category gived in URL ```http://localhost:PORT/api/categories/${MONGOID}```.
    ```
            {
                "any": "any",
            }
    ```
    + ```DELETE``` Changes Category ```estado``` instead of deleting physically with given MongoID.
    ```
            http://localhost:PORT/api/categories/${MONGOID}
    ```
#### Products 
+ ```http://localhost:PORT/api/products ```
    + ```GET``` It allows 2 queries from URL: ```limit``` and ```from```. It returs a JSON according to previous queries.
    + ```GET``` Also allows GET request to a specific MongoID given by url```http://localhost:PORT/api/products/${MONGOID}```.

    + ```POST``` Create a new Product in DB with this body.
    ```
            {
                "nombre": "Hamburguer w/ Cheese",
                "categoria": MongoID Category
            }
    ```
    + ```PUT``` Update Product gived in URL ```http://localhost:PORT/api/products/${MONGOID}```.
    ```
            {
                "any": "any",
            }
    ```
    + ```DELETE``` Changes Products ```estado``` instead of deleting physically with given MongoID.
        ```
            http://localhost:PORT/api/categories/${MONGOID}
        ```

#### Search, IMG update and Cloudinary requests
+ ```http://localhost:PORT/${collection}/${id} ```
    + ```GET```Flexible search, search anything from the database and will return every match. Is case insensitive.
        ```
            http://localhost:PORT/users/peter
        ```

+ ``` http://localhost:PORT/api/upload/${collection}/${MONGOID} ``` 
    + ```GET``` Returns ```img``` from the specified user/product with the given MONGOID. Returns a placeholder if there is no ```img``` available.
+ ``` http://localhost:PORT/api/upload/${collection}/${MONGOID} ``` 
    + ```PUT``` Updates ```img``` property of the user/product specified in MONGOID using ```req.files``` (express-fileupload module).
        + It also Upload the ```img``` to Cloudinary and keep track of it. If the ```img``` of any user/product changes, the previous one will be deleted from Cloudinay and the new one will replace it.


This template is part of Fernando Herrera's Node.js course. 
