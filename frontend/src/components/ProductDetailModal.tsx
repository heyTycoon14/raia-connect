import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Portal, Modal, Text, Button, Chip, Divider } from 'react-native-paper';
import { Product } from '../models/types';

interface ProductDetailModalProps {
  product: Product;
  visible: boolean;
  onClose: () => void;
  onBuy: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  visible,
  onClose,
  onBuy,
}) => {
  const isOutOfStock = product.stock === 0;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modal}
      >
        <ScrollView>
          {product.imageUrl && (
            <Image
              source={{ uri: product.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          )}

          <View style={styles.content}>
            <View style={styles.header}>
              <Text variant="headlineMedium" style={styles.title}>
                {product.name}
              </Text>
              <Chip mode="outlined">{product.category}</Chip>
            </View>

            <Text variant="headlineSmall" style={styles.price}>
              ${product.price.toFixed(2)}
            </Text>

            <Divider style={styles.divider} />

            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Description
              </Text>
              <Text variant="bodyLarge" style={styles.description}>
                {product.description}
              </Text>
            </View>

            <Divider style={styles.divider} />

            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Availability
              </Text>
              <Text
                variant="bodyLarge"
                style={[styles.stock, isOutOfStock && styles.outOfStock]}
              >
                {isOutOfStock
                  ? '❌ Out of Stock'
                  : `✅ In Stock (${product.stock} available)`}
              </Text>
            </View>

            <View style={styles.actions}>
              <Button
                mode="outlined"
                onPress={onClose}
                style={styles.button}
              >
                Close
              </Button>
              <Button
                mode="contained"
                onPress={() => {
                  onBuy(product);
                  onClose();
                }}
                disabled={isOutOfStock}
                style={styles.button}
              >
                {isOutOfStock ? 'Unavailable' : 'Buy Now'}
              </Button>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 40,
    borderRadius: 12,
    maxHeight: '90%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
    marginRight: 12,
  },
  price: {
    color: '#2e7d32',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#666',
    lineHeight: 24,
  },
  stock: {
    fontSize: 16,
    color: '#666',
  },
  outOfStock: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
  },
});
