import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button, Chip } from 'react-native-paper';
import { Product } from '../models/types';

interface ProductCardProps {
  product: Product;
  onBuy: (product: Product) => void;
  onPress: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onBuy, onPress }) => {
  const isOutOfStock = product.stock === 0;

  return (
    <Card style={styles.card} onPress={() => onPress(product)}>
      {product.imageUrl && (
        <Card.Cover source={{ uri: product.imageUrl }} style={styles.image} />
      )}
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleLarge" style={styles.title}>{product.name}</Text>
          <Chip mode="outlined" compact>{product.category}</Chip>
        </View>
        
        <Text variant="bodyMedium" style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
        
        <View style={styles.footer}>
          <Text variant="headlineSmall" style={styles.price}>
            ${product.price.toFixed(2)}
          </Text>
          <Text 
            variant="bodySmall" 
            style={[styles.stock, isOutOfStock && styles.outOfStock]}
          >
            {isOutOfStock ? 'Out of Stock' : `Stock: ${product.stock}`}
          </Text>
        </View>
      </Card.Content>
      
      <Card.Actions>
        <Button 
          mode="contained" 
          onPress={() => onBuy(product)}
          disabled={isOutOfStock}
          style={styles.button}
        >
          {isOutOfStock ? 'Unavailable' : 'Buy Now'}
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 4,
  },
  image: {
    height: 200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
  },
  description: {
    marginVertical: 8,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  price: {
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  stock: {
    color: '#666',
  },
  outOfStock: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});
