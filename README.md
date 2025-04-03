# Campus Marketplace & Social Hub

![Campus Marketplace Logo](https://via.placeholder.com/800x400?text=Campus+Marketplace+%26+Social+Hub)

A comprehensive platform for college students to buy, sell, and connect on campus.

## Overview

Campus Marketplace & Social Hub is a web application that allows students to:
- Buy and sell items on campus
- Share homemade food and meals
- Connect with other students through a social feed
- Exchange messages securely
- Build a campus community

## Features

- **Authentication System**: Student email verification, multi-platform login
- **Marketplace**: Categories for food, electronics, books, clothing, services and more
- **Food Listings**: Specialized section for homemade meals and snacks
- **Social Hub**: Share thoughts, memes, reviews, and requests
- **Messaging System**: Chat with buyers, sellers, and friends
- **Notifications**: Stay updated on transactions and social interactions
- **Profiles**: Personalized user profiles with transaction history

## Screenshots

### Landing Page
![Landing Page](https://via.placeholder.com/800x400?text=Landing+Page)

### Marketplace
![Marketplace](https://via.placeholder.com/800x400?text=Marketplace)

### Social Hub
![Social Hub](https://via.placeholder.com/800x400?text=Social+Hub)

## Tech Stack

- **Frontend**: React, Redux, React Router, Styled Components
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Real-time Features**: Socket.io
- **Authentication**: JWT, Google/Apple OAuth

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- npm or yarn

### Installation

1. Clone the repository
```
git clone https://github.com/Osedinso/campi.git
cd campi
```

2. Install dependencies
```
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables
- Create a .env file in the server directory based on the following template:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/campus-marketplace
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
```

4. Run the application
```
# Run the server
cd ../server
npm run dev

# Run the client in a separate terminal
cd ../client
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user

### Marketplace
- `GET /api/listings` - Get all listings
- `GET /api/listings/:id` - Get a specific listing
- `POST /api/listings` - Create a new listing
- `PUT /api/listings/:id` - Update a listing
- `DELETE /api/listings/:id` - Delete a listing

### Social
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id/like` - Like a post
- `POST /api/posts/:id/comments` - Comment on a post

## Project Structure

- `/client` - React frontend application
- `/server` - Node.js/Express backend API
  - `/controllers` - API request handlers
  - `/models` - MongoDB schema models
  - `/routes` - API routes
  - `/middleware` - Custom middleware
- `/docs` - Documentation files

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

Project Link: [https://github.com/Osedinso/campi](https://github.com/Osedinso/campi)
