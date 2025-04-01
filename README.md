# Campus Marketplace & Social Hub

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

## Tech Stack

- **Frontend**: React, Redux, React Router, Styled Components
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Real-time Features**: Socket.io
- **Authentication**: JWT, Google/Apple OAuth

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository
```
git clone <your-repo-url>
cd campus-marketplace
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
- Create a .env file in the server directory based on the provided example

4. Run the application
```
# Run the server
cd ../server
npm run dev

# Run the client in a separate terminal
cd ../client
npm start
```

## Project Structure

- `/client` - React frontend application
- `/server` - Node.js/Express backend API
- `/docs` - Documentation files

## License

This project is licensed under the MIT License.
