# 🚀 Quick Start Guide - Raia-Connect

Get the Raia-Connect application running in 5 minutes!

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 18+ installed (`node --version`)
- ✅ Docker installed and running (`docker --version`)
- ✅ npm or yarn (`npm --version`)
- ✅ Git (`git --version`)

## Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd raia-connect
```

## Step 2: Backend Setup (3 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Start PostgreSQL database (Docker)
docker compose up -d

# Wait 10 seconds for database to be ready
# Then seed the database with initial products
npm run seed

# Start the backend server
npm run start:dev
```

✅ **Backend is running at http://localhost:3000**

### Verify Backend is Working

Open a new terminal and test:
```bash
curl http://localhost:3000/products
```

You should see 5 products in JSON format!

## Step 3: Frontend Setup (2 minutes)

Open a **new terminal** (keep backend running):

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start Expo development server
npm start
```

### Run on Your Device

1. **Install Expo Go app** on your phone (iOS or Android)
2. **Scan the QR code** displayed in terminal
3. Wait for the app to load

### Or Run on Emulator

```bash
# Android (requires Android Studio)
npm run android

# iOS (Mac only, requires Xcode)
npm run ios

# Web Browser
npm run web
```

## Step 4: Test the Application

### Backend Tests

```bash
cd backend
npm test
```

Expected output: **9 tests passing** ✅

### Manual Testing

1. **Product List**: See 5 pharmaceutical products
2. **Search**: Type "aspirin" in search bar
3. **Filter**: Click "Pain Relief" category chip
4. **Detail**: Tap any product card to see details
5. **Buy**: Click "Buy Now" button
6. **Success**: See success modal
7. **Refresh**: Pull down to refresh the list

## 🎯 What You Should See

### Backend Console
```
🚀 Application is running on: http://localhost:3000
📚 API Endpoints:
   GET  http://localhost:3000/products
   GET  http://localhost:3000/products/:id
   POST http://localhost:3000/checkout
```

### Frontend App
- **Header**: "Raia-Connect - Your Pharmacy, Delivered"
- **Search Bar**: Search products...
- **Category Pills**: All Products, Pain Relief, Supplements, etc.
- **Product Cards**: 5 products with images, prices, and stock
- **Buy Buttons**: Green "Buy Now" buttons

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000   # Windows
lsof -i :3000                   # Mac/Linux

# Change port in backend/.env
echo "PORT=3001" >> backend/.env
```

### Database connection failed
```bash
# Check Docker is running
docker ps

# Restart database
cd backend
docker compose restart postgres

# Check logs
docker compose logs postgres
```

### Frontend can't connect to backend
1. Check backend is running: `curl http://localhost:3000/products`
2. For physical devices, update API URL in `frontend/src/services/api.service.ts`:
   ```typescript
   const API_BASE_URL = 'http://YOUR_COMPUTER_IP:3000';
   ```
   Replace `YOUR_COMPUTER_IP` with your local IP (find with `ipconfig` or `ifconfig`)

### Expo app shows error
```bash
cd frontend
npm start -- --clear    # Clear cache
```

## 📱 Using on Physical Device

1. **Same WiFi**: Ensure phone and computer on same WiFi network
2. **Expo Go**: Install from App Store or Play Store
3. **Scan QR**: Scan QR code from terminal
4. **API URL**: If "Network error", update API URL to your computer's IP

### Find Your Computer's IP

**Windows:**
```bash
ipconfig
# Look for "IPv4 Address"
```

**Mac/Linux:**
```bash
ifconfig | grep "inet "
# Look for 192.168.x.x address
```

Then update `frontend/src/services/api.service.ts`:
```typescript
const API_BASE_URL = 'http://192.168.1.100:3000';  // Your IP here
```

## ✅ Success Checklist

- [ ] Backend running on http://localhost:3000
- [ ] Database seeded with 5 products
- [ ] All 9 backend tests passing
- [ ] Frontend shows product list
- [ ] Can search and filter products
- [ ] Can view product details
- [ ] Can purchase products (Buy Now works)
- [ ] Success/error modals appear

## 🎓 Next Steps

After setup, explore:

1. **Backend README**: `backend/README.md`
2. **Frontend README**: `frontend/README.md`
3. **Project Summary**: `PROJECT_SUMMARY.md`
4. **Main README**: `README.md`

## 📊 Project Structure

```
raia-connect/
├── backend/              # NestJS API
│   ├── src/
│   │   ├── domain/           # Business entities
│   │   ├── application/      # Services
│   │   ├── infrastructure/   # Database
│   │   └── presentation/     # Controllers
│   ├── docker-compose.yml    # PostgreSQL setup
│   └── package.json
├── frontend/             # React Native app
│   ├── src/
│   │   ├── screens/          # UI screens
│   │   ├── components/       # Reusable components
│   │   ├── viewmodels/       # Business logic
│   │   └── services/         # API calls
│   └── package.json
└── README.md            # Full documentation
```

## 🆘 Need Help?

1. Check [README.md](README.md) for detailed documentation
2. Check [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for requirements
3. Check individual README files in `backend/` and `frontend/`
4. Review troubleshooting section above

## 🎉 You're All Set!

The Raia-Connect application is now running. Start exploring:
- Browse pharmaceutical products
- Search and filter items
- View product details
- Make purchases
- See real-time stock updates

**Enjoy!** 🚀
