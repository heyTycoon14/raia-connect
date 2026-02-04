import React, { useState } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { Searchbar, Text, ActivityIndicator, Portal, Modal, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductCard } from '../components/ProductCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { useProducts } from '../viewmodels/useProducts';
import { useCheckout } from '../viewmodels/useCheckout';
import { Product } from '../models/types';
import { ProductDetailModal } from '../components/ProductDetailModal';

export const ProductListScreen = () => {
  const {
    products,
    loading,
    error,
    selectedCategory,
    searchQuery,
    selectCategory,
    search,
    refresh,
    getCategories,
  } = useProducts();

  const {
    loading: checkoutLoading,
    error: checkoutError,
    success: checkoutSuccess,
    processCheckout,
    resetCheckout,
  } = useCheckout();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleBuy = async (product: Product) => {
    const success = await processCheckout({ productId: product.id, quantity: 1 });
    if (success) {
      setShowSuccessModal(true);
      // Refresh products to update stock
      setTimeout(() => {
        refresh();
      }, 500);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    resetCheckout();
  };

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  const renderEmpty = () => {
    if (loading) return null;
    
    return (
      <View style={styles.emptyContainer}>
        <Text variant="headlineSmall" style={styles.emptyText}>
          {searchQuery || selectedCategory
            ? 'No products found'
            : 'No products available'}
        </Text>
        <Text variant="bodyMedium" style={styles.emptySubtext}>
          {searchQuery || selectedCategory
            ? 'Try adjusting your filters'
            : 'Please check back later'}
        </Text>
      </View>
    );
  };

  const renderError = () => {
    if (!error) return null;
    
    return (
      <View style={styles.errorContainer}>
        <Text variant="headlineSmall" style={styles.errorText}>
          Oops! Something went wrong
        </Text>
        <Text variant="bodyMedium" style={styles.errorSubtext}>
          {error}
        </Text>
        <Button mode="contained" onPress={refresh} style={styles.retryButton}>
          Retry
        </Button>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Raia-Connect
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Your Pharmacy, Delivered
        </Text>
      </View>

      <Searchbar
        placeholder="Search products..."
        onChangeText={search}
        value={searchQuery}
        style={styles.searchbar}
      />

      <CategoryFilter
        categories={getCategories()}
        selectedCategory={selectedCategory}
        onSelectCategory={selectCategory}
      />

      {error ? (
        renderError()
      ) : loading && products.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text variant="bodyLarge" style={styles.loadingText}>
            Loading products...
          </Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onBuy={handleBuy}
              onPress={handleProductPress}
            />
          )}
          ListEmptyComponent={renderEmpty}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refresh} />
          }
          contentContainerStyle={styles.list}
        />
      )}

      {/* Success Modal */}
      <Portal>
        <Modal
          visible={showSuccessModal}
          onDismiss={handleCloseSuccess}
          contentContainerStyle={styles.modal}
        >
          <Text variant="headlineSmall" style={styles.modalTitle}>
            ✅ Purchase Successful!
          </Text>
          <Text variant="bodyLarge" style={styles.modalText}>
            Your order has been placed successfully.
          </Text>
          <Button mode="contained" onPress={handleCloseSuccess}>
            Continue Shopping
          </Button>
        </Modal>
      </Portal>

      {/* Error Modal */}
      <Portal>
        <Modal
          visible={!!checkoutError}
          onDismiss={resetCheckout}
          contentContainerStyle={styles.modal}
        >
          <Text variant="headlineSmall" style={styles.modalTitle}>
            ❌ Purchase Failed
          </Text>
          <Text variant="bodyLarge" style={styles.modalText}>
            {checkoutError}
          </Text>
          <Button mode="contained" onPress={resetCheckout}>
            OK
          </Button>
        </Modal>
      </Portal>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          visible={!!selectedProduct}
          onClose={handleCloseDetail}
          onBuy={handleBuy}
        />
      )}

      {/* Loading Overlay */}
      {checkoutLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontWeight: 'bold',
    color: '#1976d2',
  },
  subtitle: {
    color: '#666',
    marginTop: 4,
  },
  searchbar: {
    marginHorizontal: 16,
    marginVertical: 12,
    elevation: 2,
  },
  list: {
    paddingBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginTop: 64,
  },
  emptyText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    textAlign: 'center',
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#d32f2f',
  },
  errorSubtext: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
  retryButton: {
    marginTop: 16,
  },
  modal: {
    backgroundColor: 'white',
    padding: 24,
    marginHorizontal: 24,
    borderRadius: 8,
  },
  modalTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 24,
    textAlign: 'center',
    color: '#666',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
