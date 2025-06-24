import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, SafeAreaView, StatusBar, View } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Header from '../components/home/Header';
import HeroSection from '../components/home/HeroSection';
import PopularStays from '../components/home/PopularStays';
import HowItWorks from '../components/home/HowItWorks';
import WhyChooseUs from '../components/home/WhyChooseUs';
import TrendingDestinations from '../components/home/TrendingDestinations';
import UnmatchedFeatures from '../components/home/UnmatchedFeatures';
import Testimonials from '../components/home/Testimonials';
import HostBenefits from '../components/home/HostBenefits';
import BecomeHostCTA from '../components/home/BecomeHostCTA';
import { api } from '../lib/api';

const TAGS = [
  'Beachfront',
  'Mountain View',
  'Luxury',
  'Budget',
  'Family Friendly',
];

const HIGHLIGHTS = [
  { icon: <MaterialIcons name="verified" size={20} color="#fff" />, label: 'Verified properties' },
  { icon: <Ionicons name="headset" size={20} color="#fff" />, label: '24/7 customer support' },
  { icon: <FontAwesome name="tag" size={20} color="#fff" />, label: 'Best price guarantee' },
];

export default function HomeScreen({ navigation }) {
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('1 guest');
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginRight: 15 }}>
          <Ionicons name="person-circle-outline" size={30} color="#333" />
        </TouchableOpacity>
      ),
    });

    api.getListings()
      .then(response => setListings(response.listings || []))
      .catch(() => setListings([]))
      .finally(() => setLoading(false));
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <Header navigation={navigation} />
        <HeroSection
          location={location}
          setLocation={setLocation}
          dates={dates}
          setDates={setDates}
          guests={guests}
          setGuests={setGuests}
          TAGS={TAGS}
          HIGHLIGHTS={HIGHLIGHTS}
        />
        <TouchableOpacity 
          style={styles.dashboardButton} 
          onPress={() => navigation.navigate('HostDashboard')}
        >
          <Text style={styles.dashboardButtonText}>Go to Host Dashboard</Text>
        </TouchableOpacity>
        <PopularStays navigation={navigation} listings={listings} loading={loading} />
        <HowItWorks />
        <WhyChooseUs />
        <TrendingDestinations navigation={navigation} />
        <UnmatchedFeatures />
        <Testimonials />
        <HostBenefits />
        <BecomeHostCTA />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dashboardButton: {
    backgroundColor: '#f43f5e',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  dashboardButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
}); 