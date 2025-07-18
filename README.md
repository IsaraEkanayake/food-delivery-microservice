# 🍔 FoodDeliveryService 
# Food Ordering & Delivery System

<div align="center">

  <img src="frontend/src/images/logo.png" alt="FoodieFly Logo" width="200"/>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Docker](https://img.shields.io/badge/Docker-Enabled-blue)](https://www.docker.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-4.4-green)](https://www.mongodb.com/)
  [![React](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-16.x-green)](https://nodejs.org/)
</div>

## 📋 Overview

FoodDeliveryService is a modern, cloud-native food ordering and delivery system built with microservices architecture. It provides a seamless experience for customers to order food, restaurants to manage their menus, and delivery personnel to handle deliveries efficiently.

## ✨ Features

- 🔐 **User Authentication & Authorization**
  - Secure user registration and login
  - Role-based access control
  - JWT-based authentication

- 🏪 **Restaurant Management**
  - Restaurant profile management
  - Menu management
  - Real-time order updates
  - Analytics dashboard

- 🛒 **Order Management**
  - Real-time order tracking
  - Order history
  - Order status updates
  - Multiple payment options

- 🚚 **Delivery Management**
  - Real-time delivery tracking
  - Delivery personnel management
  - Route optimization
  - Delivery status updates

- 💳 **Payment Processing**
  - Secure payment gateway integration
  - Multiple payment methods
  - Transaction history
  - Refund management

## 🏗️ Architecture

The system is built using a microservices architecture with the following components:

- **Frontend Service** (Port 3000)
  - React.js based user interface
  - Responsive design
  - Real-time updates

- **Backend Services**
  - Restaurant Management Service (Port 8082)
  - Order Management Service (Port 8083)
  - Delivery Management Service (Port 8084)

- **Database**
  - MongoDB (Port 27017)
  - MySql (username - root , password - root)

## 🚀 Getting Started

### Prerequisites
- npm (v8.x or higher)
- MongoDB (v4.4 or higher)
- Docker and Docker Compose (for containerized deployment)

### Installation

#### Method 1: Using Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/yourname/food-delivery-microservice.git
cd food-delivery-microservice
```

2. Start all services using Docker Compose:
```bash
docker-compose up
```

#### Method 2: Manual Setup



1 Install frontend dependencies
cd ../frontend && npm install
```

2. Start the services:
   - On Windows: Run `run.bat`
   - On Linux/Mac: Start each service in separate terminals:
```bash

# Terminal 1
cd restaurant_management_service && mvn spring-boot:run

# Terminal 2
cd order_management_service && mvn spring-boot:run

# Terminal 3
cd delivery_management_service && mvn spring-boot:run

# Terminal 4
cd frontend && npm start
```

### Accessing the Application

- Frontend: http://localhost:3000
- Backend Services:
  - Restaurant Management: http://localhost:8082
  - Order Management: http://localhost:8083
  - Delivery Management: http://localhost:8084

## 🛠️ Development

### Project Structure
```
FoodDeliveryService /
├── frontend/                 # React frontend application
├── backend/                  #springboot backend
└── README.md                 # Project documentation
```

### Environment Variables

Each service requires specific environment variables. Create `.env` files in each service directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/FoodDeliveryService 

# JWT Secret
JWT_SECRET=your_jwt_secret

# Service Ports
PORT=8080 # Adjust port number for each service
```



## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



## 🙏 Acknowledgments

- [Springboot](https://Springboot.org/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)


