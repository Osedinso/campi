const Message = require('../models/Message');
const User = require('../models/User');
const Notification = require('../models/Notification');

// @desc    Get messages between users
// @route   GET /api/messages/:userId
// @access  Private
exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, recipient: req.params.userId },
        { sender: req.params.userId, recipient: req.user.id }
      ]
    })
      .sort({ createdAt: 1 })
      .populate({
        path: 'sender',
        select: 'username profilePicture'
      })
      .populate({
        path: 'recipient',
        select: 'username profilePicture'
      })
      .populate({
        path: 'relatedListing',
        select: 'title price images'
      });
      
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
    
    // Mark messages as read
    await Message.updateMany(
      { 
        sender: req.params.userId, 
        recipient: req.user.id,
        read: false
      },
      { read: true }
    );
  } catch (err) {
    next(err);
  }
};

// @desc    Get conversations list
// @route   GET /api/messages
// @access  Private
exports.getConversations = async (req, res, next) => {
  try {
    // Find all message partners (users that the current user has communicated with)
    const messages = await Message.find({
      $or: [
        { sender: req.user.id },
        { recipient: req.user.id }
      ]
    }).sort({ createdAt: -1 });
    
    // Extract unique user IDs from messages
    const userIds = new Set();
    messages.forEach(message => {
      if (message.sender.toString() !== req.user.id) {
        userIds.add(message.sender.toString());
      }
      if (message.recipient.toString() !== req.user.id) {
        userIds.add(message.recipient.toString());
      }
    });
    
    // Get latest message for each conversation
    const conversations = [];
    for (const userId of userIds) {
      const latestMessage = await Message.findOne({
        $or: [
          { sender: req.user.id, recipient: userId },
          { sender: userId, recipient: req.user.id }
        ]
      })
        .sort({ createdAt: -1 })
        .populate({
          path: 'sender',
          select: 'username profilePicture'
        })
        .populate({
          path: 'recipient',
          select: 'username profilePicture'
        })
        .populate({
          path: 'relatedListing',
          select: 'title price images'
        });
      
      // Count unread messages
      const unreadCount = await Message.countDocuments({
        sender: userId,
        recipient: req.user.id,
        read: false
      });
      
      // Get user details
      const user = await User.findById(userId).select('username profilePicture');
      
      conversations.push({
        user,
        latestMessage,
        unreadCount
      });
    }
    
    res.status(200).json({
      success: true,
      count: conversations.length,
      data: conversations
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Send message
// @route   POST /api/messages
// @access  Private
exports.sendMessage = async (req, res, next) => {
  try {
    const { recipient, content, relatedListing } = req.body;
    
    if (!recipient || !content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide recipient and message content'
      });
    }
    
    // Create message
    const message = await Message.create({
      sender: req.user.id,
      recipient,
      content,
      relatedListing
    });
    
    // Populate sender and recipient details
    const populatedMessage = await Message.findById(message._id)
      .populate({
        path: 'sender',
        select: 'username profilePicture'
      })
      .populate({
        path: 'recipient',
        select: 'username profilePicture'
      })
      .populate({
        path: 'relatedListing',
        select: 'title price images'
      });
    
    // Create notification for recipient
    await Notification.create({
      recipient,
      sender: req.user.id,
      type: 'message',
      content: 'sent you a new message',
      relatedListing
    });
    
    res.status(201).json({
      success: true,
      data: populatedMessage
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private
exports.deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: `Message not found with id of ${req.params.id}`
      });
    }
    
    // Make sure user is message sender or recipient
    if (
      message.sender.toString() !== req.user.id &&
      message.recipient.toString() !== req.user.id
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this message`
      });
    }
    
    await message.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};
