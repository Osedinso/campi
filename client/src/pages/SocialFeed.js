import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getPosts, createPost, likePost, commentOnPost } from '../redux/slices/postsSlice';

const SocialContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const CreatePostCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const PostForm = styled.form``;

const PostTextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: none;
  min-height: 100px;
  margin-bottom: 1rem;
  
  &:focus {
    outline: none;
    border-color: #1e88e5;
  }
`;

const PostFormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostButton = styled.button`
  padding: 0.5rem 1.5rem;
  background-color: #1e88e5;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #1976d2;
  }
  
  &:disabled {
    background-color: #90caf9;
    cursor: not-allowed;
  }
`;

const AddPhotoButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  &:hover {
    color: #1e88e5;
  }
`;

const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PostCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #f5f5f5;
`;

const PostAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
`;

const PostAuthorInfo = styled.div``;

const PostAuthorName = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.25rem;
`;

const PostTime = styled.p`
  font-size: 0.75rem;
  color: #666;
`;

const PostContent = styled.div`
  padding: 1rem;
`;

const PostText = styled.p`
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const PostImage = styled.div`
  width: 100%;
  height: 300px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  margin-bottom: 1rem;
`;

const PostActions = styled.div`
  display: flex;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
`;

const PostAction = styled.button`
  flex: 1;
  padding: 0.75rem;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #666;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  ${props => props.active && `
    color: #1e88e5;
  `}
`;

const CommentsSection = styled.div`
  padding: 1rem;
`;

const CommentsList = styled.div`
  margin-bottom: 1rem;
`;

const Comment = styled.div`
  display: flex;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CommentAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #e0e0e0;
  margin-right: 0.75rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 0.75rem;
`;

const CommentBubble = styled.div`
  background-color: #f5f5f5;
  border-radius: 18px;
  padding: 0.75rem 1rem;
  position: relative;
  max-width: calc(100% - 40px);
`;

const CommentAuthor = styled.span`
  font-weight: 500;
  margin-right: 0.5rem;
`;

const CommentText = styled.p`
  display: inline;
`;

const CommentForm = styled.form`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CommentInput = styled.input`
  flex-grow: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #1e88e5;
  }
`;

const CommentButton = styled.button`
  background: none;
  border: none;
  color: #1e88e5;
  font-weight: 500;
  cursor: pointer;
  
  &:disabled {
    color: #90caf9;
    cursor: not-allowed;
  }
`;

// Mock data for the social feed
const mockPosts = [
  {
    _id: 'post1',
    author: {
      _id: 'user1',
      name: 'Alex Johnson'
    },
    content: 'Just aced my Organic Chemistry final! 🎉 Anyone want to buy my textbook and notes? They clearly work well!',
    createdAt: '2025-04-10T13:30:00.000Z',
    likes: 15,
    isLiked: true,
    comments: [
      {
        _id: 'comment1',
        author: {
          _id: 'user2',
          name: 'Taylor Smith'
        },
        content: 'Congrats! How much for the notes?'
      },
      {
        _id: 'comment2',
        author: {
          _id: 'user3',
          name: 'Jordan Lee'
        },
        content: 'That class was brutal. Well done!'
      }
    ]
  },
  {
    _id: 'post2',
    author: {
      _id: 'user4',
      name: 'Sam Williams'
    },
    content: 'Anyone interested in homemade cookies? Baking a big batch tonight and happy to deliver around campus tomorrow. $5 for a half dozen!',
    createdAt: '2025-04-10T11:15:00.000Z',
    likes: 27,
    isLiked: false,
    hasImage: true,
    comments: [
      {
        _id: 'comment3',
        author: {
          _id: 'user5',
          name: 'Riley Thomas'
        },
        content: 'What flavors are you making?'
      },
      {
        _id: 'comment4',
        author: {
          _id: 'user6',
          name: 'Casey Martin'
        },
        content: 'I\'ll take a dozen! DM me for delivery details.'
      },
      {
        _id: 'comment5',
        author: {
          _id: 'user7',
          name: 'Jamie Wilson'
        },
        content: 'Are they nut-free?'
      }
    ]
  },
  {
    _id: 'post3',
    author: {
      _id: 'user8',
      name: 'Morgan Davis'
    },
    content: 'Lost keys somewhere near the library this afternoon. They have a small rocket keychain. If found please message me!',
    createdAt: '2025-04-09T18:42:00.000Z',
    likes: 8,
    isLiked: false,
    comments: []
  }
];

const SocialFeed = () => {
  const dispatch = useDispatch();
  // const { posts, loading } = useSelector(state => state.posts);
  // const { user } = useSelector(state => state.auth);
  
  const [newPost, setNewPost] = useState('');
  const [commentValues, setCommentValues] = useState({});
  const [feedPosts, setFeedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setFeedPosts(mockPosts);
      setLoading(false);
    }, 500);
    
    // Initialize comment values
    const initialCommentValues = {};
    mockPosts.forEach(post => {
      initialCommentValues[post._id] = '';
    });
    setCommentValues(initialCommentValues);
    
    // When Redux is ready:
    // dispatch(getPosts());
  }, []);
  
  const handlePostSubmit = (e) => {
    e.preventDefault();
    
    if (!newPost.trim()) return;
    
    // Simulate adding a new post
    const newPostObj = {
      _id: `post${feedPosts.length + 1}`,
      author: {
        _id: 'user1',
        name: 'Alex Johnson'
      },
      content: newPost,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      comments: []
    };
    
    setFeedPosts([newPostObj, ...feedPosts]);
    setNewPost('');
    setCommentValues({
      ...commentValues,
      [newPostObj._id]: ''
    });
    
    // When Redux is ready:
    // dispatch(createPost({ content: newPost }));
  };
  
  const handleCommentChange = (postId, value) => {
    setCommentValues({
      ...commentValues,
      [postId]: value
    });
  };
  
  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();
    
    if (!commentValues[postId].trim()) return;
    
    // Simulate adding a new comment
    const newComment = {
      _id: `comment${Math.random().toString(36).substring(7)}`,
      author: {
        _id: 'user1',
        name: 'Alex Johnson'
      },
      content: commentValues[postId]
    };
    
    const updatedPosts = feedPosts.map(post => {
      if (post._id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    });
    
    setFeedPosts(updatedPosts);
    setCommentValues({
      ...commentValues,
      [postId]: ''
    });
    
    // When Redux is ready:
    // dispatch(commentOnPost({ id: postId, comment: commentValues[postId] }));
  };
  
  const handleLike = (postId) => {
    // Toggle like status
    const updatedPosts = feedPosts.map(post => {
      if (post._id === postId) {
        const newIsLiked = !post.isLiked;
        return {
          ...post,
          isLiked: newIsLiked,
          likes: newIsLiked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    });
    
    setFeedPosts(updatedPosts);
    
    // When Redux is ready:
    // dispatch(likePost(postId));
  };
  
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return new Intl.DateTimeFormat('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }).format(date);
    }
  };
  
  return (
    <SocialContainer>
      <Header>
        <Title>Social Hub</Title>
      </Header>
      
      <CreatePostCard>
        <PostForm onSubmit={handlePostSubmit}>
          <PostTextArea 
            placeholder="What's happening on campus?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <PostFormFooter>
            <AddPhotoButton type="button">
              📷 Add Photo
            </AddPhotoButton>
            <PostButton type="submit" disabled={!newPost.trim() || loading}>
              Post
            </PostButton>
          </PostFormFooter>
        </PostForm>
      </CreatePostCard>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading posts...</div>
      ) : (
        <PostsList>
          {feedPosts.map(post => (
            <PostCard key={post._id}>
              <PostHeader>
                <PostAvatar>👤</PostAvatar>
                <PostAuthorInfo>
                  <PostAuthorName>{post.author.name}</PostAuthorName>
                  <PostTime>{formatTime(post.createdAt)}</PostTime>
                </PostAuthorInfo>
              </PostHeader>
              
              <PostContent>
                <PostText>{post.content}</PostText>
                {post.hasImage && <PostImage>Photo</PostImage>}
              </PostContent>
              
              <PostActions>
                <PostAction 
                  active={post.isLiked}
                  onClick={() => handleLike(post._id)}
                >
                  {post.isLiked ? '❤️' : '🤍'} {post.likes}
                </PostAction>
                <PostAction>
                  💬 {post.comments.length}
                </PostAction>
                <PostAction>
                  🔄 Share
                </PostAction>
              </PostActions>
              
              <CommentsSection>
                {post.comments.length > 0 && (
                  <CommentsList>
                    {post.comments.map(comment => (
                      <Comment key={comment._id}>
                        <CommentAvatar>👤</CommentAvatar>
                        <CommentBubble>
                          <CommentAuthor>{comment.author.name}</CommentAuthor>
                          <CommentText>{comment.content}</CommentText>
                        </CommentBubble>
                      </Comment>
                    ))}
                  </CommentsList>
                )}
                
                <CommentForm onSubmit={(e) => handleCommentSubmit(e, post._id)}>
                  <CommentInput 
                    placeholder="Write a comment..."
                    value={commentValues[post._id] || ''}
                    onChange={(e) => handleCommentChange(post._id, e.target.value)}
                  />
                  <CommentButton 
                    type="submit"
                    disabled={!commentValues[post._id]?.trim()}
                  >
                    Post
                  </CommentButton>
                </CommentForm>
              </CommentsSection>
            </PostCard>
          ))}
        </PostsList>
      )}
    </SocialContainer>
  );
};

export default SocialFeed;
