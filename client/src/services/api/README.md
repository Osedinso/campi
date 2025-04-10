# API Services Documentation

This directory contains services for interacting with the Campus Marketplace & Social Hub backend API.

## Service Structure

- **apiClient.js**: Configured Axios instance with interceptors for authentication and error handling
- **authService.js**: Authentication-related API endpoints (login, register, etc.)
- **listingService.js**: Marketplace listing management endpoints
- **messageService.js**: Messaging and conversations endpoints
- **notificationService.js**: User notification endpoints
- **postService.js**: Social feed post management endpoints
- **userService.js**: User profile management endpoints

## Using the Services

Import services in your components or Redux slices:

```javascript
import { authService, listingService, postService } from '../../services/api';
```

## API Endpoint Mapping

| Front-end Service | Backend Route |
|-------------------|---------------|
| authService       | /api/auth     |
| listingService    | /api/listings |
| messageService    | /api/messages |
| notificationService | /api/notifications |
| postService       | /api/posts    |
| userService       | /api/users    |

## Authentication

JWT tokens are automatically managed by the API client:
- On successful login/registration, the token is stored in localStorage
- The token is added to all subsequent request headers
- If a 401 Unauthorized response is received, the token is cleared and the user is redirected to login

## Socket Integration

Real-time functionality is provided through Socket.io integration:
- The socket service initializes when a user logs in
- Messages use both REST API calls and socket events for real-time updates
- Notifications are pushed through socket events

## Error Handling

All API services include consistent error handling:
- Each async thunk action handles errors by returning proper rejections
- Error messages are standardized and extracted from API responses when available
- Network or unexpected errors have fallback error messages
