# AuthCRUDVault : Node.js User Authentication and API Management

This project is designed to implement a secure Node.js backend application. It features user authentication using JSON Web Tokens (JWT), a simple CRUD API, and file upload and download functionality.

## Features

- **User Authentication with JWT**: Users can register and log in, with the system providing JWT tokens for session management.
- **CRUD API**: A RESTful API allows for creating, reading, updating, and deleting information from a database.
- **File Upload & Download**: Users can upload files to the server and retrieve them through secure download links.

## Usage

1. **Starting the server:**
   - Run `npm start`.
   - This command will start the server at the specified port, defaulting to 3000.

2. **Register a new user:**
   - Send a POST request to `/register` with a JSON body containing `username` and `password`.

3. **Login:**
   - Send a POST request to `/login` with `username` and `password` to receive a JWT token.

4. **CRUD Operations:**
   - Send a POST to `/api/resource` to create a new resource.
   - Send a GET to `/api/resource` to read available resources.
   - Send a PUT to `/api/resource/:id` to update an existing resource.
   - Send a DELETE to `/api/resource/:id` to delete a resource.

5. **File Upload:**
   - Send a POST request to `/upload` with a file in the form-data to upload a file.

6. **File Download:**
   - Access `/download/:filename` to download the corresponding file.

## Security

File uploads are validated for type and size. JWTs ensure secure communication with the API endpoints. Always keep your dependencies up to date to mitigate vulnerabilities.
