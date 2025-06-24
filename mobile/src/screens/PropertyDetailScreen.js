import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, FlatList, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

const { width: screenWidth } = Dimensions.get('window');

// This is a new screen component
export default function PropertyDetailScreen({ route, navigation }) {
  const { listing } = route.params;
  const [selectedRange, setSelectedRange] = useState({ startDate: null, endDate: null });
  const [guestCount, setGuestCount] = useState(1);

  const onDayPress = (day) => {
    if (!selectedRange.startDate || selectedRange.endDate) {
      // Start a new selection
      setSelectedRange({ startDate: day.dateString, endDate: null });
    } else {
      // Complete the range
      if (day.dateString > selectedRange.startDate) {
        setSelectedRange({ ...selectedRange, endDate: day.dateString });
      } else {
        // if end date is before start date, reset to new start date
        setSelectedRange({ startDate: day.dateString, endDate: null });
      }
    }
  };

  const markedDates = useMemo(() => {
    let dates = {};
    if (selectedRange.startDate) {
      dates[selectedRange.startDate] = { startingDay: true, color: '#f43f5e', textColor: 'white' };
      if (selectedRange.endDate) {
        let currentDate = new Date(selectedRange.startDate);
        let endDate = new Date(selectedRange.endDate);
        
        while (currentDate <= endDate) {
            const dateString = currentDate.toISOString().split('T')[0];
            if (!dates[dateString]) {
                dates[dateString] = { color: '#fdd8dd', textColor: 'black' };
            }
            if (dateString === selectedRange.startDate) {
                 dates[dateString] = {...dates[dateString], startingDay: true, color: '#f43f5e', textColor: 'white' };
            }
            if (dateString === selectedRange.endDate) {
                dates[dateString] = {...dates[dateString], endingDay: true, color: '#f43f5e', textColor: 'white' };
            }
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    }
    return dates;
  }, [selectedRange]);

  const calculateNights = () => {
      if (!selectedRange.startDate || !selectedRange.endDate) return 0;
      const start = new Date(selectedRange.startDate);
      const end = new Date(selectedRange.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      return diffDays;
  }

  const handleReserve = () => {
    const numberOfNights = calculateNights();
    if(numberOfNights === 0) {
        Alert.alert('Invalid Date Range', 'Please select a valid start and end date.');
        return;
    }

    const basePrice = listing.price * numberOfNights;
    const serviceFee = basePrice * 0.1;
    const total = basePrice + serviceFee;
    
    Alert.alert(
      'Booking Confirmation',
      `You are booking for ${numberOfNights} night(s) for ${guestCount} guest(s).\n\nSubtotal: ₹${basePrice.toFixed(2)}\nService Fee: ₹${serviceFee.toFixed(2)}\nTotal: ₹${total.toFixed(2)}`,
      [{ text: 'OK' }]
    );
  };

  const numberOfNights = calculateNights();

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={listing.amenities.parking ? [listing.image, listing.image] : [listing.image]} // Mock gallery
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Image source={{ uri: item }} style={styles.image} />}
        keyExtractor={(item, index) => index.toString()}
      />
      
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{listing.name}</Text>
        <Text style={styles.location}>{listing.location}</Text>
        
        <View style={styles.hostInfo}>
            <Image source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} style={styles.hostImage} />
            <Text style={styles.hostName}>Hosted by Jane Doe</Text>
        </View>

        <Text style={styles.sectionTitle}>About this space</Text>
        <Text style={styles.description}>A beautiful and cozy space, perfect for your next getaway. Enjoy the stunning views and modern amenities.</Text>
        
        <Text style={styles.sectionTitle}>What this place offers</Text>
        <View style={styles.amenitiesGrid}>
            {Object.keys(listing.amenities).map(key => listing.amenities[key] && (
                <View key={key} style={styles.amenity}>
                    <MaterialIcons name="check-circle" size={20} color="#f43f5e" />
                    <Text style={styles.amenityText}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                </View>
            ))}
        </View>

        {/* Booking Widget */}
        <View style={styles.bookingWidget}>
          <Text style={styles.widgetTitle}>Book your stay</Text>
          
          <Calendar
            onDayPress={onDayPress}
            markedDates={markedDates}
            markingType={'period'}
            theme={{
              selectedDayBackgroundColor: '#f43f5e',
              arrowColor: '#f43f5e',
              dotColor: '#f43f5e',
              todayTextColor: '#f43f5e',
            }}
          />
          
          <View style={styles.guestSelector}>
            <Text>Guests: {guestCount}</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => setGuestCount(Math.max(1, guestCount - 1))} style={styles.guestButton}>
                <Text>-</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setGuestCount(guestCount + 1)} style={styles.guestButton}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {numberOfNights > 0 && (
            <View style={styles.priceBreakdown}>
                <Text>₹{listing.price} x {numberOfNights} nights</Text>
                <Text>₹{(listing.price * numberOfNights).toFixed(2)}</Text>
            </View>
          )}

           <View style={styles.priceBreakdownItem}>
              <Text>Service fee</Text>
              <Text>₹{(listing.price * numberOfNights * 0.1).toFixed(2)}</Text>
           </View>
          
           <View style={[styles.priceBreakdownItem, styles.totalPrice]}>
              <Text style={{fontWeight: 'bold'}}>Total</Text>
              <Text style={{fontWeight: 'bold'}}>₹{(listing.price * numberOfNights * 1.1).toFixed(2)}</Text>
           </View>

          <TouchableOpacity onPress={handleReserve} style={styles.reserveButton}>
            <Text style={styles.reserveButtonText}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: screenWidth,
    height: 250,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: '#888',
    marginVertical: 10,
  },
  hostInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
  },
  hostImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
  },
  hostName: {
      fontSize: 16,
      fontWeight: '500',
  },
  sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
  },
  description: {
      fontSize: 16,
      lineHeight: 24,
      color: '#444',
  },
  amenitiesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
  },
  amenity: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '50%',
      marginBottom: 10,
  },
  amenityText: {
      marginLeft: 10,
      fontSize: 16,
  },
  bookingWidget: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  widgetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  guestSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  guestButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginLeft: 10,
  },
  priceBreakdown: {
      marginTop: 15,
      paddingTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  priceBreakdownItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 5,
  },
  totalPrice: {
      borderTopWidth: 1,
      borderColor: '#ddd',
      paddingTop: 10,
      marginTop: 5,
  },
  reserveButton: {
    backgroundColor: '#f43f5e',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
}); 