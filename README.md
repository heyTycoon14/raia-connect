# Raia-Connect

A full-stack pharmaceutical e-commerce MVP built with NestJS and React Native.

## 🏗️ Architecture

This project follows **Clean Architecture** principles with clear separation of concerns:

### Backend (NestJS)
- **Domain Layer**: Entities and business logic
- **Application Layer**: Use cases and services
- **Infrastructure Layer**: Database, repositories
- **Presentation Layer**: Controllers, DTOs, validation

### Frontend (React Native)
- **MVVM Pattern**: Separation of UI, business logic, and data
- **State Management**: Clean data flow
- **Error Handling**: Comprehensive loading, empty, and error states

## 📦 Tech Stack

### Backend
- **Framework**: NestJS (Node.js + TypeScript)
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Testing**: Jest
- **Containerization**: Docker & Docker Compose

### Frontend
- **Framework**: React Native
- **Language**: TypeScript
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **UI Components**: React Native Paper

## 🚀 Features

- ✅ Product listing with real-time filtering
- ✅ Category-based filtering (no page reload)
- ✅ Stock management with validation
- ✅ Checkout flow with proper error handling
- ✅ Server-side validation
- ✅ Clean loading and error states
- ✅ Unit tests for critical business logic

## 📋 API Endpoints

### GET /products
Returns list of pharmaceutical products with optional category filter.

**Query Parameters:**
- `category` (optional): Filter by product category

**Response (200):**
```json
[
  {
    "id": "uuid",
    "name": "Aspirin",
    "price": 9.99,
    "category": "Pain Relief",
    "stock": 50,
    "description": "Pain relief medication"
  }
]
```

### POST /checkout
Process a product purchase and decrement stock.

**Request Body:**
```json
{
  "productId": "uuid",
  "quantity": 1
}
```

**Response (201):** Order confirmation
**Response (400):** Insufficient stock
**Response (404):** Product not found

## 🏃 Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
docker-compose up -d  # Start PostgreSQL
npm run migration:run  # Run database migrations
npm run seed  # Seed initial data
npm run start:dev  # Start development server
```

Backend runs on: `http://localhost:3000`

### Frontend Setup

```bash
cd frontend
npm install
npm start  # Start Metro bundler

# In another terminal:
npm run android  # For Android
npm run ios      # For iOS
```

## 🧪 Testing

```bash
cd backend
npm test  # Run unit tests
npm run test:cov  # Generate coverage report
```

## 📂 Project Structure

```
raia-connect/
├── backend/           # NestJS API
│   ├── src/
│   │   ├── domain/           # Entities & business logic
│   │   ├── application/      # Services & use cases
│   │   ├── infrastructure/   # Database & repositories
│   │   └── presentation/     # Controllers & DTOs
│   └── docker-compose.yml
└── frontend/          # React Native app
    ├── src/
    │   ├── screens/          # UI screens
    │   ├── components/       # Reusable components
    │   ├── services/         # API services
    │   └── viewmodels/       # Business logic
    └── package.json
```

## 🎯 Initial Product Seed

The database is populated with these products:
1. **Aspirin** - Pain Relief - $9.99 - Stock: 50
2. **Vitamin C** - Supplements - $15.99 - Stock: 100
3. **Sunscreen SPF 50** - Skincare - $22.50 - Stock: 30
4. **Hand Sanitizer** - Hygiene - $5.99 - Stock: 200
5. **Face Mask (50 pack)** - Hygiene - $12.99 - Stock: 75

## 📝 Development Process

This project was built with a clean git commit history to demonstrate:
- Step-by-step implementation approach
- Proper separation of concerns
- Test-driven development
- Progressive feature enhancement

## 🏆 Key Architectural Decisions

1. **Clean Architecture**: Clear boundaries between layers
2. **Repository Pattern**: Abstraction over data access
3. **DTO Validation**: Server-side validation with class-validator
4. **Stock Management**: ACID compliance with database transactions
5. **Error Handling**: Proper HTTP status codes and user-friendly messages
6. **Performance**: Optimized list rendering and image loading

## 📄 License

MIT

---

Built with ❤️ for Raia-Connect Technical Challenge
