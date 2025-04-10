import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const MessagingContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  height: calc(100vh - 120px);
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: calc(100vh - 100px);
  }
`;

const ConversationsList = styled.div`
  border-right: 1px solid #eee;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    display: ${props => props.isVisible ? 'block' : 'none'};
  }
`;

const SearchBox = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 20px;
  border: 1px solid #ddd;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #1e88e5;
  }
`;

const ConversationItem = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  background-color: ${props => props.active ? '#f0f7ff' : 'white'};
  
  &:hover {
    background-color: ${props => props.active ? '#f0f7ff' : '#f9f9f9'};
  }
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #e0e0e0;
  margin-right: 1rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
`;

const ConversationInfo = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

const ConversationTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LastMessage = styled.div`
  font-size: 0.875rem;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TimeStamp = styled.div`
  font-size: 0.75rem;
  color: #999;
  white-space: nowrap;
  margin-left: 0.5rem;
`;

const ChatArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  
  @media (max-width: 768px) {
    display: ${props => props.isVisible ? 'flex' : 'none'};
  }
`;

const ChatHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  margin-right: 1rem;
  cursor: pointer;
  font-size: 1.25rem;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const ChatHeaderInfo = styled.div`
  flex-grow: 1;
`;

const ChatHeaderTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const ChatHeaderSubtitle = styled.div`
  font-size: 0.75rem;
  color: #666;
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.sent ? 'flex-end' : 'flex-start'};
`;

const Message = styled.div`
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: 18px;
  margin-bottom: 0.25rem;
  
  background-color: ${props => props.sent ? '#1e88e5' : '#f1f1f1'};
  color: ${props => props.sent ? 'white' : '#333'};
  
  &:first-child {
    border-top-${props => props.sent ? 'right' : 'left'}-radius: 4px;
  }
`;

const MessageTime = styled.div`
  font-size: 0.75rem;
  color: #999;
  margin-top: 0.25rem;
`;

const MessageInputArea = styled.div`
  padding: 1rem;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const MessageInput = styled.input`
  flex-grow: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 24px;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #1e88e5;
  }
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: #1e88e5;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: #1976d2;
  }
  
  &:disabled {
    background-color: #90caf9;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  padding: 2rem;
  text-align: center;
`;

const EmptyStateIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #ddd;
`;

// Mock data for conversations
const mockConversations = [
  {
    id: 'conv1',
    otherUser: {
      id: 'user2',
      name: 'Taylor Smith',
      isOnline: true,
      lastSeen: null
    },
    lastMessage: {
      text: 'Is the calculus textbook still available?',
      timestamp: '2025-04-10T14:30:00.000Z',
      isRead: true
    }
  },
  {
    id: 'conv2',
    otherUser: {
      id: 'user3',
      name: 'Jordan Lee',
      isOnline: false,
      lastSeen: '2025-04-10T13:15:00.000Z'
    },
    lastMessage: {
      text: 'Great! Let\'s meet tomorrow at the student center.',
      timestamp: '2025-04-09T18:45:00.000Z',
      isRead: false
    }
  },
  {
    id: 'conv3',
    otherUser: {
      id: 'user4',
      name: 'Sam Williams',
      isOnline: false,
      lastSeen: '2025-04-09T22:30:00.000Z'
    },
    lastMessage: {
      text: 'Do you have any other items for sale?',
      timestamp: '2025-04-08T11:20:00.000Z',
      isRead: true
    }
  }
];

// Mock messages data for a conversation
const mockMessages = {
  'conv1': [
    {
      id: 'msg1',
      senderId: 'user2',
      text: 'Hi there! I saw your listing for the calculus textbook.',
      timestamp: '2025-04-10T14:00:00.000Z'
    },
    {
      id: 'msg2',
      senderId: 'user1',
      text: 'Yes, it\'s still available!',
      timestamp: '2025-04-10T14:15:00.000Z'
    },
    {
      id: 'msg3',
      senderId: 'user2',
      text: 'Great! What condition is it in?',
      timestamp: '2025-04-10T14:20:00.000Z'
    },
    {
      id: 'msg4',
      senderId: 'user1',
      text: 'It\'s in good condition. Some highlighting in the first few chapters but otherwise clean.',
      timestamp: '2025-04-10T14:25:00.000Z'
    },
    {
      id: 'msg5',
      senderId: 'user2',
      text: 'Is the calculus textbook still available?',
      timestamp: '2025-04-10T14:30:00.000Z'
    }
  ],
  'conv2': [
    {
      id: 'msg6',
      senderId: 'user3',
      text: 'Hello! I\'m interested in your desk lamp.',
      timestamp: '2025-04-09T17:30:00.000Z'
    },
    {
      id: 'msg7',
      senderId: 'user1',
      text: 'Hi! Yes, it\'s still available. It\'s an LED lamp with adjustable brightness.',
      timestamp: '2025-04-09T17:45:00.000Z'
    },
    {
      id: 'msg8',
      senderId: 'user3',
      text: 'Perfect! Would you take $12 for it?',
      timestamp: '2025-04-09T18:00:00.000Z'
    },
    {
      id: 'msg9',
      senderId: 'user1',
      text: 'Sure, that works for me. When would you like to pick it up?',
      timestamp: '2025-04-09T18:15:00.000Z'
    },
    {
      id: 'msg10',
      senderId: 'user3',
      text: 'How about tomorrow afternoon?',
      timestamp: '2025-04-09T18:30:00.000Z'
    },
    {
      id: 'msg11',
      senderId: 'user1',
      text: 'That works for me. How about 3 PM at the student center?',
      timestamp: '2025-04-09T18:40:00.000Z'
    },
    {
      id: 'msg12',
      senderId: 'user3',
      text: 'Great! Let\'s meet tomorrow at the student center.',
      timestamp: '2025-04-09T18:45:00.000Z'
    }
  ],
  'conv3': [
    {
      id: 'msg13',
      senderId: 'user4',
      text: 'I just bought your wireless earbuds. They\'re working great!',
      timestamp: '2025-04-08T10:30:00.000Z'
    },
    {
      id: 'msg14',
      senderId: 'user1',
      text: 'I\'m glad to hear that! They served me well too.',
      timestamp: '2025-04-08T10:45:00.000Z'
    },
    {
      id: 'msg15',
      senderId: 'user4',
      text: 'Do you have any other items for sale?',
      timestamp: '2025-04-08T11:20:00.000Z'
    }
  ]
};

const Messaging = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showMobileChat, setShowMobileChat] = useState(false);
  
  const messagesEndRef = useRef(null);
  
  // Get current user from Redux store (mock for now)
  const currentUserId = 'user1';
  
  useEffect(() => {
    // Load conversations (mock data for now)
    setLoading(true);
    setTimeout(() => {
      setConversations(mockConversations);
      setLoading(false);
    }, 500);
  }, []);
  
  useEffect(() => {
    // Load messages when a conversation is selected
    if (selectedConversation) {
      setMessages(mockMessages[selectedConversation.id] || []);
      setShowMobileChat(true);
    }
  }, [selectedConversation]);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedConversation) return;
    
    const message = {
      id: `msg${Date.now()}`,
      senderId: currentUserId,
      text: newMessage,
      timestamp: new Date().toISOString()
    };
    
    // Add message to local state
    setMessages(prevMessages => [...prevMessages, message]);
    
    // Update last message in conversation
    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          lastMessage: {
            text: newMessage,
            timestamp: new Date().toISOString(),
            isRead: true
          }
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setNewMessage('');
  };
  
  const handleBackToList = () => {
    setShowMobileChat(false);
  };
  
  const filteredConversations = conversations.filter(conv => 
    conv.otherUser.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
      } else {
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      }
    }
  };
  
  const formatMessageTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  const formatLastSeen = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) {
      return 'just now';
    } else if (diffMins < 60) {
      return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) {
        return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
      } else {
        return date.toLocaleDateString([], { 
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit'
        });
      }
    }
  };
  
  const groupMessagesByDate = (messages) => {
    if (!messages.length) return [];
    
    let currentSenderId = null;
    let currentGroup = [];
    const groupedMessages = [];
    
    messages.forEach(message => {
      if (message.senderId !== currentSenderId) {
        if (currentGroup.length > 0) {
          groupedMessages.push({
            senderId: currentSenderId,
            messages: currentGroup
          });
        }
        currentSenderId = message.senderId;
        currentGroup = [message];
      } else {
        currentGroup.push(message);
      }
    });
    
    if (currentGroup.length > 0) {
      groupedMessages.push({
        senderId: currentSenderId,
        messages: currentGroup
      });
    }
    
    return groupedMessages;
  };
  
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '3rem' }}>Loading conversations...</div>;
  }
  
  return (
    <MessagingContainer>
      <ConversationsList isVisible={!showMobileChat}>
        <SearchBox>
          <SearchInput 
            type="text" 
            placeholder="Search conversations..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBox>
        
        {filteredConversations.length === 0 ? (
          <div style={{ padding: '1rem', color: '#666', textAlign: 'center' }}>
            No conversations found
          </div>
        ) : (
          filteredConversations.map(conv => (
            <ConversationItem 
              key={conv.id} 
              active={selectedConversation?.id === conv.id}
              onClick={() => handleSelectConversation(conv)}
            >
              <Avatar>👤</Avatar>
              <ConversationInfo>
                <ConversationTitle>{conv.otherUser.name}</ConversationTitle>
                <LastMessage>{conv.lastMessage.text}</LastMessage>
              </ConversationInfo>
              <TimeStamp>{formatTime(conv.lastMessage.timestamp)}</TimeStamp>
            </ConversationItem>
          ))
        )}
      </ConversationsList>
      
      <ChatArea isVisible={showMobileChat}>
        {selectedConversation ? (
          <>
            <ChatHeader>
              <BackButton onClick={handleBackToList}>←</BackButton>
              <Avatar>👤</Avatar>
              <ChatHeaderInfo>
                <ChatHeaderTitle>{selectedConversation.otherUser.name}</ChatHeaderTitle>
                <ChatHeaderSubtitle>
                  {selectedConversation.otherUser.isOnline 
                    ? 'Online' 
                    : `Last seen ${formatLastSeen(selectedConversation.otherUser.lastSeen)}`
                  }
                </ChatHeaderSubtitle>
              </ChatHeaderInfo>
            </ChatHeader>
            
            <MessagesContainer>
              {groupMessagesByDate(messages).map((group, index) => (
                <MessageGroup 
                  key={index} 
                  sent={group.senderId === currentUserId}
                >
                  {group.messages.map((message, msgIndex) => (
                    <Message 
                      key={message.id} 
                      sent={message.senderId === currentUserId}
                    >
                      {message.text}
                    </Message>
                  ))}
                  <MessageTime>
                    {formatMessageTime(group.messages[group.messages.length - 1].timestamp)}
                  </MessageTime>
                </MessageGroup>
              ))}
              <div ref={messagesEndRef} />
            </MessagesContainer>
            
            <MessageInputArea>
              <MessageInput 
                type="text" 
                placeholder="Type a message..." 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
              />
              <SendButton 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                →
              </SendButton>
            </MessageInputArea>
          </>
        ) : (
          <EmptyState>
            <EmptyStateIcon>💬</EmptyStateIcon>
            <h3>Select a conversation</h3>
            <p>Choose a conversation from the list to start messaging</p>
          </EmptyState>
        )}
      </ChatArea>
    </MessagingContainer>
  );
};

export default Messaging;
