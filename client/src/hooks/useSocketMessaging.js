import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  joinConversation, 
  leaveConversation, 
  getSocket, 
  sendMessage as socketSendMessage 
} from '../services/socketService';
import { addIncomingMessage } from '../redux/slices/messagingSlice';

/**
 * Custom hook to handle socket connections for messaging
 * @param {string} conversationId - ID of the current conversation 
 * @returns {Object} - Functions for socket messaging
 */
const useSocketMessaging = (conversationId) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { currentConversation } = useSelector(state => state.messaging);

  // Join the conversation room when entering a conversation
  useEffect(() => {
    if (conversationId && user) {
      joinConversation(conversationId);
      
      // Cleanup: leave the conversation when unmounting
      return () => {
        leaveConversation(conversationId);
      };
    }
  }, [conversationId, user]);

  // Handle typing status
  const setTypingStatus = (isTyping) => {
    if (conversationId && getSocket()) {
      getSocket().emit('typing', { 
        conversationId, 
        userId: user?.id, 
        isTyping 
      });
    }
  };

  // Send message via socket
  const sendSocketMessage = (content) => {
    if (conversationId && content.trim() !== '') {
      socketSendMessage(conversationId, content);
      
      // Return the expected local message object structure for UI updates
      // The actual message from the server will be handled by the socket listener
      return {
        _id: `temp-${Date.now()}`,
        sender: {
          _id: user?.id,
          name: user?.name,
          avatar: user?.avatar
        },
        content,
        timestamp: new Date().toISOString(),
        delivered: true,
        read: false
      };
    }
    return null;
  };

  return {
    setTypingStatus,
    sendSocketMessage
  };
};

export default useSocketMessaging;
