# Task Management API

A RESTful API for managing tasks with user authentication built with Node.js, Express, and MySQL.

## 🚀 Features

- ✅ User registration and login with JWT
- ✅ Secure password hashing with bcrypt
- ✅ CRUD operations for tasks
- ✅ User-specific task isolation
- ✅ Protected routes with middleware
- ✅ Complete API documentation with Swagger

## 📚 API Documentation

**Interactive documentation available at:**
```
http://localhost:3000/api-docs
```

**Swagger JSON:**
```
http://localhost:3000/api-docs.json
```

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL with Sequelize ORM
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcrypt for password hashing
- **Documentation:** Swagger/OpenAPI 3.0

## 📦 Installation
```bash
# Clone repository
git clone https://github.com/LAZERLES/TodoAPI.git

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Start server
npm start

# Or development mode
npm run dev
```

## 🔧 Environment Variables
```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=td_db

JWT_SECRET=your_secret_key_min_32_characters
```

## 📖 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/register` | Register new user | ❌ |
| POST | `/api/login` | Login user | ❌ |

### Tasks
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get all user tasks | ✅ |
| POST | `/api/tasks` | Create new task | ✅ |
| GET | `/api/tasks/:id` | Get task by ID | ✅ |
| PUT | `/api/tasks/:id` | Update task | ✅ |
| DELETE | `/api/tasks/:id` | Delete task | ✅ |

## 🧪 Testing with Swagger

1. Start the server
2. Open http://localhost:5000/api-docs
3. Register a new user via `/api/register`
4. Login via `/api/login` and copy the token
5. Click "Authorize" button and paste your token
6. Test all endpoints!

## 🖼️ Screenshots

### Swagger Documentation
![Swagger UI](./screenshots/swagger-ui.png)

### Authentication Endpoints
![Auth Endpoints](./screenshots/auth-endpoints.png)

### Testing with Swagger
![Testing](./screenshots/swagger-testing.png)

## 🔐 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- HTTP-only cookies for token storage
- User-specific data isolation
- Protected routes with middleware
- Input validation

## 📚 What I Learned

- Building RESTful APIs with Express
- JWT authentication implementation
- Sequelize ORM for database operations
- API documentation with Swagger
- Security best practices for Node.js
- User authorization and data isolation

## 🚀 Deployment

Ready to deploy on:
- Render

## 📬 Contact

- **Email:** poompepee@hotmail.com
- **GitHub:** [@LAZERES](https://github.com/LAZERLES)
