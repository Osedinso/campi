import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { messageService } from '../../services/api';

// Async thunk actions
export const getConversations = createAsyncThunk(
  'messaging/getConversations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await messageService.getConversations();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch conversations' });
    }
  }
);

export const getMessages = createAsyncThunk(
  'messaging/getMessages',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await messageService.getMessages(userId);
      return { 
        conversationId: userId,
        data: response
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch messages' });
    }
  }
);

export const sendMessage = createAsyncThunk(
  'messaging/sendMessage',
  async ({ conversationId, content }, { rejectWithValue }) => {
    try {
      const response = await messageService.sendMessage({ recipientId: conversationId, content });
      return {
        conversationId,
        message: response.data
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to send message' });
    }
  }
);

export const createConversation = createAsyncThunk(
  'messaging/createConversation',
  async ({ recipientId, initialMessage }, { rejectWithValue }) => {
    try {
      // First send the message to create the conversation
      const response = await messageService.sendMessage({ 
        recipientId, 
        content: initialMessage 
      });
      
      // Then get the conversations to ensure we have the latest
      const conversationsResponse = await messageService.getConversations();
      
      // Find the conversation we just created
      const newConversation = conversationsResponse.data.find(c => 
        c.participants.some(p => p.id === recipientId)
      );
      
      return {
        success: true,
        data: newConversation
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to create conversation' });
    }
  }
);

// Initial state
const initialState = {
  conversations: [],
  messages: {},
  currentConversation: null,
  loading: false,
  error: null,
};

// Messaging slice
const messagingSlice = createSlice({
  name: 'messaging',
  initialState,
  reducers: {
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload;
    },
    clearCurrentConversation: (state) => {
      state.currentConversation = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    // Socket.io will use this to add a new incoming message
    addIncomingMessage: (state, action) => {
      const { conversationId, message } = action.payload;
      
      // Add to messages array if we have that conversation loaded
      if (state.messages[conversationId]) {
        state.messages[conversationId].push(message);
      }
      
      // Update the last message in the conversation list
      const conversationIndex = state.conversations.findIndex(
        c => c.id === conversationId
      );
      
      if (conversationIndex !== -1) {
        state.conversations[conversationIndex].lastMessage = {
          text: message.text,
          timestamp: message.timestamp,
          isRead: false
        };
        
        // Move this conversation to the top of the list
        const conversation = state.conversations[conversationIndex];
        state.conversations.splice(conversationIndex, 1);
        state.conversations.unshift(conversation);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Get all conversations cases
      .addCase(getConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload.data;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Failed to fetch conversations';
      })
      // Get messages from a conversation cases
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false;
        const { conversationId, data } = action.payload;
        state.messages[conversationId] = data.data;
        
        // Mark messages as read in the conversation
        const conversationIndex = state.conversations.findIndex(
          c => c.id === conversationId
        );
        if (conversationIndex !== -1) {
          state.conversations[conversationIndex].lastMessage.isRead = true;
        }
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Failed to fetch messages';
      })
      // Send message cases
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        const { conversationId, message } = action.payload;
        
        // Add to messages array
        if (state.messages[conversationId]) {
          state.messages[conversationId].push(message);
        } else {
          state.messages[conversationId] = [message];
        }
        
        // Update the last message in the conversation list
        const conversationIndex = state.conversations.findIndex(
          c => c.id === conversationId
        );
        
        if (conversationIndex !== -1) {
          state.conversations[conversationIndex].lastMessage = {
            text: message.text,
            timestamp: message.timestamp,
            isRead: true
          };
          
          // Move this conversation to the top of the list
          const conversation = state.conversations[conversationIndex];
          state.conversations.splice(conversationIndex, 1);
          state.conversations.unshift(conversation);
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Failed to send message';
      })
      // Create conversation cases
      .addCase(createConversation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createConversation.fulfilled, (state, action) => {
        state.loading = false;
        const newConversation = action.payload.data;
        
        // Add the new conversation to the list and make it current
        state.conversations.unshift(newConversation);
        state.currentConversation = newConversation;
        
        // Initialize messages array for this conversation
        if (newConversation.initialMessage) {
          state.messages[newConversation.id] = [newConversation.initialMessage];
        } else {
          state.messages[newConversation.id] = [];
        }
      })
      .addCase(createConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Failed to create conversation';
      });
  },
});

export const { 
  setCurrentConversation, 
  clearCurrentConversation, 
  clearError,
  addIncomingMessage
} = messagingSlice.actions;

export default messagingSlice.reducer;
