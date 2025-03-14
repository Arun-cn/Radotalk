# Radotalk API Documentation

## Authentication

### Register a new user

- **URL:** `/api/v1/auth/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "user registered successfully",
    "user": {
      "_id": "user_id",
      "email": "user@example.com",
      "password": "hashed_password",
      "is_active": true,
      "created_at": "2023-10-01T00:00:00.000Z",
      "updated_at": "2023-10-01T00:00:00.000Z"
    }
  }
  ```

### Login a user

- **URL:** `/api/v1/auth/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "login successfully",
    "user": {
      "name": "user_name",
      "email": "user@example.com"
    },
    "token": "jwt_token"
  }
  ```

## WebSocket

### Events

#### `chat message`

- **Description:** Send and receive chat messages.
- **Client to Server:**
  ```javascript
  socket.emit("chat message", "Hello, world!");
  ```
- **Server to Client:**
  ```javascript
  socket.on("chat message", (msg) => {
    console.log("Message from server:", msg);
  });
  ```

## Error Handling

### Common Errors

- **401 Unauthorized:** The request requires user authentication.
- **500 Internal Server Error:** The server encountered an unexpected condition that prevented it from fulfilling the request.
