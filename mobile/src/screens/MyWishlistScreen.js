import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { api } from '../lib/api';
import PropertyCard from '../components/PropertyCard';

export default function MyWishlistScreen({ navigation }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await api.getMyWishlist();
        setWishlist(res.wishlist || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch wishlist');
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#f43f5e" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={wishlist}
      renderItem={({ item }) => (
        <View style={styles.cardContainer}>
          <PropertyCard
            item={item}
            onPress={() => navigation.navigate('PropertyDetail', { listing: item })}
          />
        </View>
      )}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={<Text style={styles.emptyText}>Your wishlist is empty.</Text>}
      numColumns={2}
    />
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { textAlign: 'center', marginTop: 20, color: 'red' },
  listContainer: { padding: 10, backgroundColor: '#f8f9fa' },
  cardContainer: {
    flex: 1 / 2,
    margin: 5,
  },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#666' },
}); 