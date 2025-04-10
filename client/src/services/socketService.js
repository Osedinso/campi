import { io } from 'socket.io-client';
import store from '../redux/store';
import { addIncomingMessage } from '../redux/slices/messagingSlice';

let socket;

/**
 * Initialize the Socket.io connection
 * @param {string} token - The user's authentication token
 */
export const initializeSocket = (token) => {
  // Close any existing socket connection
  if (socket) {
    socket.close();
  }

  // Create new socket connection with auth token
  socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:4321', {
    auth: {
      token
    },
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000
  });

  // Socket connection event handlers
  socket.on('connect', () => {
    console.log('Socket connected:', socket.id);
  });

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected:', reason);
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
  });

  // Handle incoming messages
  socket.on('message:receive', (data) => {
    console.log('Message received:', data);
    const { conversationId, message } = data;
    
    // Dispatch action to Redux
    store.dispatch(addIncomingMessage({ conversationId, message }));
  });

  return socket;
};

/**
 * Get the current socket instance
 * @returns {Object|null} The socket instance or null if not initialized
 */
export const getSocket = () => socket;

/**
 * Disconnect the socket
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log('Socket disconnected manually');
  }
};

/**
 * Send a message via socket
 * @param {string} conversationId - The ID of the conversation
 * @param {string} content - The message content
 */
export const sendMessage = (conversationId, content) => {
  if (socket) {
    socket.emit('message:send', { conversationId, content });
  } else {
    console.error('Socket not initialized');
  }
};

/**
 * Join a conversation room to receive messages
 * @param {string} conversationId - The ID of the conversation to join
 */
export const joinConversation = (conversationId) => {
  if (socket) {
    socket.emit('conversation:join', { conversationId });
  } else {
    console.error('Socket not initialized');
  }
};

/**
 * Leave a conversation room
 * @param {string} conversationId - The ID of the conversation to leave
 */
export const leaveConversation = (conversationId) => {
  if (socket) {
    socket.emit('conversation:leave', { conversationId });
  } else {
    console.error('Socket not initialized');
  }
};

/**
 * Set user as "typing" in a conversation
 * @param {string} conversationId - The ID of the conversation
 * @param {boolean} isTyping - Whether the user is typing
 */
export const setTypingStatus = (conversationId, isTyping) => {
  if (socket) {
    socket.emit('typing', { conversationId, isTyping });
  } else {
    console.error('Socket not initialized');
  }
};

export default {
  initializeSocket,
  getSocket,
  disconnectSocket,
  sendMessage,
  joinConversation,
  leaveConversation,
  setTypingStatus
};
