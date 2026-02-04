# Raia-Connect Backend

Backend API for the Raia-Connect pharmaceutical e-commerce platform built with NestJS following Clean Architecture principles.

## 🏗️ Architecture

This backend follows **Clean Architecture** with clear separation of concerns:

```
src/
├── domain/              # Business logic & entities (framework-independent)
│   ├── entities/        # Domain models (Product, Order)
│   └── repositories/    # Repository interfaces
├── application/         # Use cases & services
│   └── services/        # Business logic implementation
├── infrastructure/      # External concerns
│   ├── database/        # TypeORM entities & config
│   └── repositories/    # Repository implementations
└── presentation/        # API layer
    ├── controllers/     # HTTP controllers
    └── dtos/            # Data transfer objects
```

### Key Principles

1. **Dependency Inversion**: Domain doesn't depend on infrastructure
2. **Repository Pattern**: Abstracts data access
3. **Service Layer**: Encapsulates business logic
4. **DTO Validation**: Server-side validation with class-validator
5. **Transaction Management**: ACID compliance for checkout

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start PostgreSQL database
docker-compose up -d

# Run database migrations (auto via synchronize in dev)
# The tables will be created automatically

# Seed initial data
npm run seed

# Start development server
npm run start:dev
```

The API will be available at `http://localhost:3000`

## 📡 API Endpoints

### GET /products
Get all products with optional category filter.

**Query Parameters:**
- `category` (optional): Filter by product category

**Example:**
```bash
curl http://localhost:3000/products
curl http://localhost:3000/products?category=Pain%20Relief
```

**Response (200):**
```json
[
  {
    "id": "uuid",
    "name": "Aspirin",
    "price": 9.99,
    "category": "Pain Relief",
    "stock": 50,
    "description": "Effective pain relief and fever reducer",
    "imageUrl": "https://...",
    "createdAt": "2026-02-05T00:00:00.000Z",
    "updatedAt": "2026-02-05T00:00:00.000Z"
  }
]
```

### GET /products/:id
Get a single product by ID.

**Response (200):** Single product object  
**Response (404):** Product not found

### POST /checkout
Process a product purchase.

**Request Body:**
```json
{
  "productId": "uuid",
  "quantity": 1
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "productId": "uuid",
  "quantity": 1,
  "totalPrice": 9.99,
  "status": "COMPLETED",
  "createdAt": "2026-02-05T00:00:00.000Z"
}
```

**Response (400):** Insufficient stock  
**Response (404):** Product not found

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:cov
```

## 🎯 Initial Product Seed

The database is seeded with these products:

1. **Aspirin** - Pain Relief - $9.99 - Stock: 50
2. **Vitamin C** - Supplements - $15.99 - Stock: 100
3. **Sunscreen SPF 50** - Skincare - $22.50 - Stock: 30
4. **Hand Sanitizer** - Hygiene - $5.99 - Stock: 200
5. **Face Mask (50 pack)** - Hygiene - $12.99 - Stock: 75

## 🛠️ Development Scripts

```bash
npm run start         # Start production server
npm run start:dev     # Start development server (watch mode)
npm run start:debug   # Start debug mode
npm run build         # Build for production
npm run seed          # Seed database with initial data
npm test              # Run tests
npm run test:cov      # Run tests with coverage
```

## 🔐 Environment Variables

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=raiaconnect

# Application
NODE_ENV=development
PORT=3000
```

## 🏛️ Database Schema

### Products Table
- `id` (UUID, PK)
- `name` (VARCHAR)
- `price` (DECIMAL)
- `category` (VARCHAR)
- `stock` (INT)
- `description` (TEXT)
- `imageUrl` (VARCHAR, nullable)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

### Orders Table
- `id` (UUID, PK)
- `productId` (UUID, FK)
- `quantity` (INT)
- `totalPrice` (DECIMAL)
- `status` (ENUM: PENDING, COMPLETED, FAILED)
- `createdAt` (TIMESTAMP)

## 🎨 Design Patterns Used

1. **Repository Pattern**: Abstracts data access
2. **Dependency Injection**: Via NestJS IoC container
3. **Service Layer**: Encapsulates business logic
4. **DTO Pattern**: Data validation and transformation
5. **Factory Pattern**: Used in repositories for entity creation

## ✅ Best Practices

- ✅ Clean Architecture separation
- ✅ SOLID principles
- ✅ Transaction management for data consistency
- ✅ Comprehensive error handling
- ✅ Server-side validation
- ✅ Proper HTTP status codes
- ✅ Unit tests with high coverage
- ✅ Type safety with TypeScript

## 📦 Technologies

- **NestJS**: Progressive Node.js framework
- **TypeORM**: ORM for TypeScript
- **PostgreSQL**: Relational database
- **class-validator**: DTO validation
- **Jest**: Testing framework
- **Docker**: Containerization

## 🐛 Common Issues

### Cannot connect to database
- Ensure Docker is running: `docker-compose ps`
- Check database logs: `docker-compose logs postgres`

### Port already in use
- Change PORT in `.env` file
- Or stop the process using port 3000

### Seed fails
- Ensure database is running
- Check connection in `.env` file

## 📝 License

MIT
