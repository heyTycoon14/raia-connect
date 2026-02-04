# Raia-Connect Frontend

React Native mobile application for the Raia-Connect pharmaceutical e-commerce platform built with Expo and TypeScript.

## 🏗️ Architecture

This frontend follows **MVVM (Model-View-ViewModel)** pattern with clean separation of concerns:

```
src/
├── models/              # Data models & types
│   └── types.ts         # TypeScript interfaces
├── services/            # API communication layer
│   └── api.service.ts   # HTTP client & API calls
├── viewmodels/          # Business logic & state management
│   ├── useProducts.ts   # Product listing & filtering logic
│   └── useCheckout.ts   # Checkout logic
├── components/          # Reusable UI components
│   ├── ProductCard.tsx          # Product display card
│   ├── CategoryFilter.tsx       # Category filter chips
│   └── ProductDetailModal.tsx   # Product detail modal
└── screens/             # Main application screens
    └── ProductListScreen.tsx    # Main product listing screen
```

### Key Features

1. **Real-time Filtering**: Filter by category and search without page reload
2. **Loading States**: Clean loading indicators and skeleton screens
3. **Empty States**: User-friendly messages when no data available
4. **Error Handling**: Comprehensive error messages and retry mechanisms
5. **Toast Messages**: Success/error notifications for checkout
6. **Product Details**: Modal view with full product information
7. **Stock Management**: Visual indicators for stock availability

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator
- Or use Expo Go app on your phone

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on specific platform
npm run android    # Android
npm run ios        # iOS (Mac only)
npm run web        # Web browser
```

### Running with Backend

1. Make sure the backend is running on `http://localhost:3000`
2. If using a physical device, update the API URL in [src/services/api.service.ts](src/services/api.service.ts):
   ```typescript
   const API_BASE_URL = 'http://YOUR_COMPUTER_IP:3000';
   ```

## 📱 Features

### Product Listing
- Display all pharmaceutical products
- Product cards with images, names, prices, categories, and stock
- Pull-to-refresh to update data

### Search & Filter
- **Search Bar**: Search by product name, description, or category
- **Category Pills**: Quick filter by category (Pain Relief, Supplements, etc.)
- **Real-time Updates**: No page reload required
- **Clear Filters**: "All Products" chip to reset filters

### Product Details
- Tap any product card to view details
- Modal with full product information
- High-resolution images
- Detailed descriptions
- Stock availability

### Checkout Flow
1. Click "Buy Now" on any product card
2. Validates stock availability
3. Shows loading indicator during purchase
4. Success modal on completion
5. Error modal with specific error messages
6. Auto-refreshes product list after purchase

### Error Handling
- **Network Errors**: "Failed to fetch products" message
- **Out of Stock**: Disabled buy button with "Unavailable" text
- **Insufficient Stock**: Error message with available quantity
- **Product Not Found**: Clear error message
- **Retry Mechanism**: Retry button for failed requests

## 🎨 UI Components

### ProductCard
Displays product information with:
- Product image
- Name and category chip
- Description (2 lines max)
- Price and stock information
- Buy button (disabled if out of stock)

### CategoryFilter
Horizontal scrollable category chips:
- "All Products" to clear filter
- Individual category chips
- Visual indication of selected category

### ProductDetailModal
Full-screen modal with:
- Large product image
- Complete description
- Category badge
- Stock availability
- Buy and Close actions

## 🔧 Configuration

### API Configuration
Edit [src/services/api.service.ts](src/services/api.service.ts):
```typescript
const API_BASE_URL = 'http://localhost:3000'; // Change to your backend URL
```

### Styling
The app uses React Native Paper for Material Design components. Customize theme in [App.tsx](App.tsx):
```typescript
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1976d2',
    // Add custom colors
  },
};
```

## 📦 Dependencies

- **expo**: React Native framework
- **react-native-paper**: Material Design components
- **react-navigation**: Navigation (for future expansion)
- **axios**: HTTP client for API calls
- **react-native-safe-area-context**: Safe area handling
- **typescript**: Type safety

## 🎯 MVVM Pattern Implementation

### Model (models/)
- Defines data structures (Product, Order)
- Type-safe with TypeScript interfaces

### View (screens/, components/)
- Pure presentation components
- No business logic
- Consumes ViewModels via hooks

### ViewModel (viewmodels/)
- **useProducts**: Manages product state, filtering, search
- **useCheckout**: Handles checkout logic and state
- Exposes state and actions to Views
- Handles API calls via Services

### Services (services/)
- **ApiService**: Centralized API communication
- Error handling and transformation
- Network request management

## 📱 Screenshots Flow

1. **Product List**: Grid of products with filters
2. **Search**: Real-time search results
3. **Category Filter**: Filter by categories
4. **Product Detail**: Modal with full information
5. **Checkout Success**: Success modal
6. **Error State**: Error handling with retry

## 🐛 Common Issues

### Cannot connect to backend
- Ensure backend is running on port 3000
- Check API_BASE_URL in api.service.ts
- If using physical device, use computer's IP address
- Allow firewall exception for port 3000

### Expo app not loading
- Clear cache: `npm start --clear`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Images not loading
- Check internet connection
- Verify image URLs are accessible
- Try clearing app cache

## 🔄 State Management

Uses React Hooks for state management:
- `useState`: Component-level state
- `useEffect`: Side effects and lifecycle
- `useCallback`: Memoized callbacks
- Custom hooks: Reusable business logic

## ✅ Best Practices

- ✅ TypeScript for type safety
- ✅ Clean MVVM architecture
- ✅ Separation of concerns
- ✅ Reusable components
- ✅ Comprehensive error handling
- ✅ Loading and empty states
- ✅ Accessibility support
- ✅ Performance optimization

## 📝 License

MIT
