import React, { useState, useRef, useEffect } from 'react';
import { ScrollView } from 'react-native';
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
];

export default function HomeScreen({ navigation }) {
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('1 guest');

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header />
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
      <PopularStays navigation={navigation} mockListings={mockListings} />
      <HowItWorks />
      <WhyChooseUs />
      <TrendingDestinations navigation={navigation} />
      <UnmatchedFeatures />
      <Testimonials />
      <HostBenefits />
      <BecomeHostCTA />
    </ScrollView>
  );
} 