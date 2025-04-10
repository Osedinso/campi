// Re-export all API services for easy imports throughout the application
import {
  apiClient,
  authService,
  listingService,
  messageService,
  notificationService,
  postService,
  userService
} from './api';

// Re-export socket service
import * as socketService from './socketService';

export {
  // API services
  apiClient,
  authService,
  listingService,
  messageService,
  notificationService,
  postService,
  userService,
  
  // Socket service
  socketService
};
