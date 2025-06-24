import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { api } from '../lib/api';

const BookingItem = ({ item, onPress }) => (
  <TouchableOpacity style={styles.bookingItem} onPress={onPress}>
    <Image source={{ uri: item.listingId?.images[0] || 'https://via.placeholder.com/150' }} style={styles.listingImage} />
    <View style={styles.bookingDetails}>
      <Text style={styles.listingTitle}>{item.listingId?.title}</Text>
      <Text style={styles.bookingDates}>
        {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
      </Text>
      <Text style={[styles.status, styles[`status_${item.status}`]]}>
        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function MyBookingsScreen({ navigation }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.getMyBookings();
        setBookings(res.bookings || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#f43f5e" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={bookings}
      renderItem={({ item }) => (
        <BookingItem
          item={item}
          onPress={() => navigation.navigate('PropertyDetail', { listing: item.listingId })}
        />
      )}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={<Text style={styles.emptyText}>You have no bookings yet.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { textAlign: 'center', marginTop: 20, color: 'red' },
  listContainer: { padding: 20, backgroundColor: '#f8f9fa' },
  bookingItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listingImage: { width: 100, height: 100, borderRadius: 8 },
  bookingDetails: { flex: 1, marginLeft: 15, justifyContent: 'center' },
  listingTitle: { fontSize: 16, fontWeight: 'bold', color: '#343a40' },
  bookingDates: { fontSize: 14, color: '#6c757d', marginVertical: 4 },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  status_approved: { backgroundColor: '#d4edda', color: '#155724' },
  status_pending: { backgroundColor: '#fff3cd', color: '#856404' },
  status_rejected: { backgroundColor: '#f8d7da', color: '#721c24' },
  status_cancelled: { backgroundColor: '#e2e3e5', color: '#383d41' },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#666' },
}); 