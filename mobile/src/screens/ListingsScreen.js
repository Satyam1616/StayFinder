import React from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import PropertyCard from '../components/PropertyCard';

const mockListings = [
  {
    id: '1',
    name: 'Cozy Beachfront Cottage',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
    location: 'Goa, India',
    rating: 4.5,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: { wifi: true, kitchen: true, tv: true, parking: false },
  },
  {
    id: '2',
    name: 'Modern City Apartment',
    price: 9000,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
    location: 'Mumbai, India',
    rating: 4.7,
    guests: 3,
    bedrooms: 2,
    bathrooms: 2,
    amenities: { wifi: true, kitchen: true, tv: false, parking: true },
  },
  {
    id: '3',
    name: 'Rustic Mountain Cabin',
    price: 10000,
    image: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9',
    location: 'Manali, India',
    rating: 4.2,
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: { wifi: false, kitchen: true, tv: true, parking: true },
  },
  {
    id: '4',
    name: 'Luxury Villa with Pool',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
    location: 'Bali, Indonesia',
    rating: 4.9,
    guests: 6,
    bedrooms: 3,
    bathrooms: 3,
    amenities: { wifi: true, kitchen: true, tv: true, parking: true },
  },
  {
    id: '5',
    name: 'Chic Downtown Loft',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
    location: 'New York, USA',
    rating: 4.8,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: { wifi: true, kitchen: true, tv: true, parking: false },
  },
  {
    id: '6',
    name: 'Secluded Lakeside Retreat',
    price: 8000,
    image: 'https://images.unsplash.com/photo-1575517111478-7f6afd0973db',
    location: 'Udaipur, India',
    rating: 4.6,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    amenities: { wifi: true, kitchen: false, tv: false, parking: true },
  },
  {
    id: '7',
    name: 'Elegant Parisian Flat',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1533775949103-3176a386c9d7',
    location: 'Paris, France',
    rating: 4.9,
    guests: 3,
    bedrooms: 2,
    bathrooms: 1,
    amenities: { wifi: true, kitchen: true, tv: true, parking: false },
  },
  {
    id: '8',
    name: 'Tropical Treehouse Oasis',
    price: 11000,
    image: 'https://images.unsplash.com/photo-1598423984196-805175d506d3',
    location: 'Costa Rica',
    rating: 4.7,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: { wifi: true, kitchen: false, tv: false, parking: true },
  },
];

export default function ListingsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mockListings}
        renderItem={({ item }) => (
          <PropertyCard 
            item={item} 
            onPress={() => {
              navigation.navigate('PropertyDetail', { listing: item });
            }}
          />
        )}
        keyExtractor={item => item.id}
        numColumns={1}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  list: {
    alignItems: 'center',
    paddingBottom: 16,
  },
}); 