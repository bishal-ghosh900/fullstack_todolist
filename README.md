# tododesk_backend

GET & POST for Users -> https://tododesk-backend.herokuapp.com/api/users

GET, POST, PUT, DELETE for Todos -> https://tododesk-backend.herokuapp.com/api/todos/me[/:id] (With a jwt key which should be available in header with key "x-auth-token")

the part "[/:id]" is only for PUT and DELETE . While PUT and DELETE request don't use "[]" around id.

POST for User auth -> https://tododesk-backend.herokuapp.com/api/users/auth (It will give the jwt key, which should be set to x-auth-token in header from client side to perform GET, POST, PUT and DELETE request to Todo URL)
