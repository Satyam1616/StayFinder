import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TrendingDestinations({ navigation }) {
  const trendingDestinations = [{
    id: '1',
    image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=600&q=80',
    title: 'Beach Getaways',
    count: '1,200+ properties'
  }, {
    id: '2',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=600&q=80',
    title: 'Mountain Retreats',
    count: '850+ properties'
  }, {
    id: '3',
    image: 'https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?auto=format&fit=crop&w=600&q=80',
    title: 'Urban Escapes',
    count: '2,300+ properties'
  }];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Trending Destinations</Text>
      <Text style={styles.sectionSubtitle}>Discover stays in the world's most sought-after locations</Text>
      <FlatList
        horizontal
        data={trendingDestinations}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.destinationCard}>
            <Image source={{uri: item.image}} style={styles.destinationImage} />
            <View style={styles.destinationTextContainer}>
              <Text style={styles.destinationTitle}>{item.title}</Text>
              <Text style={styles.destinationCount}>{item.count}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 20 }}
      />
      <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate('Listings')}>
        <Text style={styles.viewAllText}>View all destinations</Text>
        <Ionicons name="arrow-forward-circle" size={22} color="#f43f5e" />
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  section: {
    marginTop: 28,
    paddingHorizontal: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 5,
    fontFamily: 'System',
    letterSpacing: 0.1,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#717171',
    marginBottom: 10,
    fontFamily: 'System',
    fontWeight: '400',
  },
  destinationCard: {
    marginRight: 15,
    borderRadius: 16,
    overflow: 'hidden',
    width: 280,
    height: 180,
  },
  destinationImage: {
    width: '100%',
    height: '100%',
  },
  destinationTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  destinationTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  destinationCount: {
    color: '#fff',
    fontSize: 14,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 10,
    paddingRight: 5,
  },
  viewAllText: {
    color: '#f43f5e',
    fontWeight: '600',
    fontSize: 15,
    marginRight: 8,
  },
}; 