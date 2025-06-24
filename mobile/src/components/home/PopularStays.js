import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropertyCard from '../PropertyCard';

export default function PopularStays({ navigation, listings }) {
  // Map backend fields to PropertyCard props
  const mappedListings = (listings || []).map((item) => ({
    ...item,
    name: item.title || item.name || 'Untitled',
    image: item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/300x200?text=No+Image',
    rating: item.rating || 4.5,
    guests: item.guests || 2,
    bedrooms: item.bedrooms || 1,
    bathrooms: item.bathrooms || 1,
    amenities: item.amenities || {},
    location: item.location || '',
    price: item.price || 0,
  }));

  return (
    <View style={styles.section}>
      <TouchableOpacity style={styles.popularRow} onPress={() => navigation.navigate('Listings')} activeOpacity={0.7}>
        <Text style={styles.sectionTitle}>Popular Stays Nearby</Text>
        <Ionicons name="chevron-forward" size={22} color="#f43f5e" style={{marginLeft: 2, marginTop: 2}} />
      </TouchableOpacity>
      <FlatList
        horizontal
        data={mappedListings}
        renderItem={({ item }) => (
          <View style={{ marginRight: 15 }}>
            <PropertyCard
              item={item}
              onPress={() => navigation.navigate('PropertyDetail', { listing: item })}
            />
          </View>
        )}
        keyExtractor={item => item._id || item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 0, paddingRight: 20 }}
      />
    </View>
  );
}

const styles = {
  section: {
    marginTop: 28,
    paddingHorizontal: 14,
  },
  popularRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 5,
    fontFamily: 'System',
    letterSpacing: 0.1,
  },
}; 