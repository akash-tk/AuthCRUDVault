# AuthCRUDVault : Node.js User Authentication and API Management

This project is designed to implement a secure Node.js backend application. It features user authentication using JSON Web Tokens (JWT), a simple CRUD API, and file upload and download functionality.

## Features

- **User Authentication with JWT**: Users can register and log in, with the system providing JWT tokens for session management.
- **CRUD API**: A RESTful API allows for creating, reading, updating, and deleting information from a database.
- **File Upload & Download**: Users can upload files to the server and retrieve them through secure download links.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: You can download it from [Node.js official website](https://nodejs.org/).
- **npm**: Comes with Node.js. After installing Node.js, run `npm -v` in a terminal to ensure npm is installed.
- **MongoDB Database**: Set up a MongoDB instance either locally or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/atlas/database).

## Configuration

To get your application running, you need to set up your environment variables:

1. Create a `.env` file in the root directory of your project.
2. Add the following variables to the `.env` file, replacing the placeholders with your actual data:

```env
MONGODB_URI=mongodb+srv://your-db-connection-string
JWT_SECRET=your-jwt-secret
REFRESH_TOKEN_SECRET=your-refresh-token-secret
PORT=3000
```

## Usage

1. **Starting the server:**
   - Run `npm start`.
   - This command will start the server at the specified port, defaulting to 3000.

2. **Register a new user:**
   - Send a POST request to `/register` with a JSON body containing `username` and `password`.

3. **Login:**
   - Send a POST request to `/login` with `username` and `password` to receive a JWT token.

4. **CRUD Operations:**
   - Send a POST to `/api/users` to create a new user.
   - Send a GET to `/api/users` to read available users.
   - Send a PUT to `/api/users/:id` to update an existing user.
   - Send a DELETE to `/api/users/:id` to delete a user.

5. **File Upload:**
   - Send a POST request to `/api/upload` with a file in the form-data to upload a file.

6. **File Download:**
   - Access `/api/download/:filename` to download the corresponding file.

## Security

File uploads are validated for type and size. JWTs ensure secure communication with the API endpoints. Always keep your dependencies up to date to mitigate vulnerabilities.
