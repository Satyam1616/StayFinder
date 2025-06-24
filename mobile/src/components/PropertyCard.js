import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_HORIZONTAL_MARGIN = 16;
const CARD_WIDTH = SCREEN_WIDTH - CARD_HORIZONTAL_MARGIN * 2;

export default function PropertyCard({ item, onPress }) {
  const handlePress = () => {
    // Navigate to PropertyDetail screen, passing the item data
    if (onPress) {
      onPress(item);
    }
  };

  return (
    <TouchableOpacity style={[styles.card, { width: CARD_WIDTH }]} onPress={handlePress} activeOpacity={0.9}>
      {/* Image and Heart */}
      <View style={styles.imageWrap}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.heartWrap}>
          <Ionicons name="heart-outline" size={20} color="#f43f5e" />
        </View>
      </View>
      {/* Details */}
      <View style={styles.infoContainer}>
        <View style={styles.rowBetween}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <View style={styles.ratingWrap}>
            <MaterialIcons name="star" size={16} color="#f43f5e" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.rowLoc}>
          <Ionicons name="location-sharp" size={14} color="#888" style={{marginRight:2}} />
          <Text style={styles.locationText} numberOfLines={1}>{item.location}</Text>
        </View>
        {/* Amenities */}
        <View style={styles.amenitiesRow}>
          {item.amenities?.wifi && <Text style={styles.amenityTag}>WiFi</Text>}
          {item.amenities?.kitchen && <Text style={styles.amenityTag}>Kitchen</Text>}
          {item.amenities?.tv && <Text style={styles.amenityTag}>TV</Text>}
          {item.amenities?.parking && <Text style={styles.amenityTag}>Parking</Text>}
        </View>
        {/* Capacity */}
        <View style={styles.capacityRow}>
          <View style={styles.capItem}><Ionicons name="person" size={14} color="#888" /><Text style={styles.capText}> {item.guests} guests</Text></View>
          <View style={styles.capItem}><Ionicons name="bed" size={14} color="#888" /><Text style={styles.capText}> {item.bedrooms} beds</Text></View>
          <View style={styles.capItem}><Ionicons name="water" size={14} color="#888" /><Text style={styles.capText}> {item.bathrooms} baths</Text></View>
        </View>
        {/* Price & Button */}
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.perNight}>Per night</Text>
            <Text style={styles.price}>₹{item.price.toLocaleString()}</Text>
          </View>
          <TouchableOpacity style={styles.detailsBtn} onPress={handlePress}>
            <Text style={styles.detailsBtnText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  imageWrap: {
    position: 'relative',
    width: '100%',
    aspectRatio: 3/2,
    backgroundColor: '#f7f7f7',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  heartWrap: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 2,
    elevation: 2,
  },
  infoContainer: {
    padding: 14,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLoc: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 2,
  },
  locationText: {
    color: '#888',
    fontSize: 13,
    fontFamily: 'System',
    maxWidth: 180,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
    fontFamily: 'System',
    flex: 1,
    marginRight: 8,
  },
  ratingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  ratingText: {
    color: '#f43f5e',
    fontWeight: '600',
    fontSize: 13,
    marginLeft: 2,
    fontFamily: 'System',
  },
  amenitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 6,
    marginBottom: 2,
  },
  amenityTag: {
    backgroundColor: '#f7f7f7',
    color: '#444',
    fontSize: 11,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 2,
    fontFamily: 'System',
  },
  capacityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 2,
    gap: 10,
  },
  capItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  capText: {
    color: '#888',
    fontSize: 12,
    fontFamily: 'System',
    marginLeft: 2,
  },
  perNight: {
    color: '#888',
    fontSize: 11,
    fontFamily: 'System',
    marginBottom: 1,
  },
  price: {
    fontSize: 18,
    color: '#f43f5e',
    fontWeight: '700',
    fontFamily: 'System',
  },
  detailsBtn: {
    backgroundColor: '#f43f5e',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    marginLeft: 8,
  },
  detailsBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
    fontFamily: 'System',
  },
}); 