# REST Server Template - MVC Adapted (2.0.0)
CRUD ready with many validators between requests. Product creation, categories and e-commerce backend template.

### Usage
1. Clone the repository.
2. ```npm install``` to install all the dependencies (CORS, dotenv, express, express-validator, mongoose, bcryptjs, jsonwebtoken, google-auth-library, express-fileupload).
3. Create a .env file and specify any "PORT". (If local).
4. ```node or nodemon app.js```


### Available routes:
+ '/' = HOME
+ 'api/users' = GET
+ 'api/users' = POST
+ 'api/users/:id' = PUT
+ 'api/users/:id' = DELETE
+ 'api/auth/login = POST
+ 'api/auth/google = POST
+ '/api/categories/:id' = CRUD for categories
+ '/api/products/:id' = CRUD for products
+ '/api/search/:collection/:term' = flexible search, search anything from the database
+ '/api/upload' POST for archives


This template is part of Fernando Herrera's Node.js course. 
