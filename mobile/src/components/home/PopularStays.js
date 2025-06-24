import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropertyCard from '../PropertyCard';

export default function PopularStays({ navigation, mockListings }) {
  return (
    <View style={styles.section}>
      <TouchableOpacity style={styles.popularRow} onPress={() => navigation.navigate('Listings')} activeOpacity={0.7}>
        <Text style={styles.sectionTitle}>Popular Stays Nearby</Text>
        <Ionicons name="chevron-forward" size={22} color="#f43f5e" style={{marginLeft: 2, marginTop: 2}} />
      </TouchableOpacity>
      <FlatList
        horizontal
        data={mockListings}
        renderItem={({ item }) => (
          <View style={{ marginRight: 15 }}>
            <PropertyCard
              item={item}
              onPress={() => navigation.navigate('PropertyDetail', { listing: item })}
            />
          </View>
        )}
        keyExtractor={item => item.id}
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