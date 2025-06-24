import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, FlatList, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import PropertyCard from '../components/PropertyCard';

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

const features = [{
  icon: 'shield-checkmark',
  title: 'Verified Listings',
  description: 'Every property undergoes verification.'
}, {
  icon: 'sparkles',
  title: 'Unique Stays',
  description: 'Discover treehouses, villas, and more.'
}, {
  icon: 'heart',
  title: 'Personalized Matching',
  description: 'AI-powered recommendations.'
}, {
  icon: 'globe',
  title: 'Global Coverage',
  description: '120+ countries with local experts.'
}, {
  icon: 'pricetag',
  title: 'Transparent Pricing',
  description: 'No hidden fees.'
}, {
  icon: 'flash',
  title: 'Instant Booking',
  description: 'Secure your stay instantly.'
}];

const hostBenefits = [{
  icon: 'trending-up',
  title: 'Maximize Earnings',
  description: 'Smart pricing tools adjust rates for you.',
  stat: '30% higher income'
}, {
  icon: 'shield-checkmark',
  title: 'Full Protection',
  description: 'Property damage & liability coverage.',
  stat: 'Risk-free hosting'
}, {
  icon: 'flash',
  title: 'Instant Visibility',
  description: 'Get listed globally in minutes.',
  stat: '2M+ travelers'
}, {
  icon: 'people',
  title: 'Quality Guests',
  description: 'Verified ID and payment screening.',
  stat: '4.9/5 host satisfaction'
}];

const testimonials = [{
  id: '1',
  quote: 'StayFinder helped me discover a hidden gem in Bali. The host verification gave me peace of mind as a solo traveler.',
  author: 'Sophia L.',
  role: 'Solo Traveler',
  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
}, {
  id: '2',
  quote: 'As a host, I\'ve increased my bookings by 60% using StayFinder\'s smart pricing tools.',
  author: 'Miguel R.',
  role: 'Superhost',
  image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
}, {
  id: '3',
  quote: 'Found the perfect pet-friendly cabin for our family getaway through StayFinder\'s advanced filters.',
  author: 'The Chen Family',
  role: 'Pet Owners',
  image: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?auto=format&fit=crop&w=200&q=80'
}];

export default function HomeScreen({ navigation }) {
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('1 guest');
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonialListRef = useRef(null);
  const autoSlideTimer = useRef(null);
  const isPaused = useRef(false);

  // Auto-slide effect
  useEffect(() => {
    if (!isPaused.current) {
      autoSlideTimer.current = setInterval(() => {
        setTestimonialIndex(prev => {
          const next = prev + 1 < testimonials.length ? prev + 1 : 0;
          testimonialListRef.current?.scrollToIndex({ index: next, animated: true });
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(autoSlideTimer.current);
  }, [testimonialIndex]);

  const handlePause = () => {
    isPaused.current = true;
    clearInterval(autoSlideTimer.current);
  };
  const handleResume = () => {
    isPaused.current = false;
    // Resume auto-slide immediately
    autoSlideTimer.current = setInterval(() => {
      setTestimonialIndex(prev => {
        const next = prev + 1 < testimonials.length ? prev + 1 : 0;
        testimonialListRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 1000);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../assets/home.png')} style={styles.logo} />
          <Text style={styles.headerTitle}>StayFinder</Text>
        </View>
        <Ionicons name="menu" size={28} color="#222" />
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Find Your Perfect Stay</Text>
        <Text style={styles.heroSubtitle}>
          Discover unique places to stay around the world with our curated selection of hotels
        </Text>
        <View style={styles.tagsContainer}>
          {TAGS.map(tag => (
            <View key={tag} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
          ))}
        </View>
        {/* Search Box */}
        <View style={[styles.searchBox, styles.horizontalSnap]}>
          <View style={styles.inputRow}>
            <Ionicons name="search" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Where are you going?"
              value={location}
              onChangeText={setLocation}
              placeholderTextColor="#aaa"
            />
          </View>
          <View style={styles.inputRow}>
            <MaterialIcons name="date-range" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Select dates"
              value={dates}
              onChangeText={setDates}
              placeholderTextColor="#aaa"
            />
          </View>
          <View style={styles.inputRow}>
            <Ionicons name="person" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="1 guest"
              value={guests}
              onChangeText={setGuests}
              placeholderTextColor="#aaa"
            />
          </View>
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
        {/* Highlights */}
        <View style={styles.highlightsRow}>
          {HIGHLIGHTS.map(h => (
            <View key={h.label} style={styles.highlight}>
              {h.icon}
              <Text style={styles.highlightText}>{h.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Popular Stays Nearby */}
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

      {/* How It Works */}
      <View style={[styles.section, { backgroundColor: '#f9f9f9', paddingVertical: 20 }]}>
        <Text style={styles.sectionTitle}>How StayFinder Works</Text>
        <Text style={styles.sectionSubtitle}>From dream to destination in just a few taps</Text>
        <View style={styles.howItWorksGrid}>
          {[{
            icon: <Ionicons name="search" size={32} color="#d32f2f" />, title: 'Search Smart', desc: 'Use our filters to find exactly what you want', highlight: '100+ filters'
          },{
            icon: <MaterialIcons name="date-range" size={32} color="#d32f2f" />, title: 'Book Seamlessly', desc: 'Instant booking or request with 24-hour response', highlight: 'No booking fees'
          },{
            icon: <Ionicons name="key" size={32} color="#d32f2f" />, title: 'Enjoy Your Stay', desc: 'Access guidebooks and 24/7 support', highlight: 'Local tips included'
          },{
            icon: <Ionicons name="star" size={32} color="#d32f2f" />, title: 'Share Experience', desc: 'Earn rewards for reviews', highlight: 'Loyalty program'
          }].map((step, i) => (
            <View key={i} style={styles.howItWorksCard}>
              {step.icon}
              <Text style={styles.howItWorksTitle}>{step.title}</Text>
              <Text style={styles.howItWorksDesc}>{step.desc}</Text>
              <Text style={styles.howItWorksHighlight}>{step.highlight}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Why StayFinder Stands Out Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why StayFinder Stands Out</Text>
        <Text style={styles.sectionSubtitle}>We redefine travel by focusing on authentic experiences and peace of mind.</Text>
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <View style={styles.featureCard} key={index}>
              <Ionicons name={feature.icon} size={24} color="#f43f5e" />
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          ))}
        </View>
        <View style={styles.ratingsContainer}>
          <Text style={styles.ratingText}>Rated 4.9/5 stars</Text>
          <Text style={styles.ratingText}>10,000+ verified stays</Text>
          <Text style={styles.ratingText}>24/7 customer support</Text>
        </View>
      </View>

      {/* Trending Destinations */}
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

      {/* Our Unmatched Features */}
      <View style={{ backgroundColor: '#f9f9f9', borderRadius: 18, marginTop: 18, marginHorizontal: 6, paddingVertical: 22, paddingHorizontal: 16, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#222', marginBottom: 14, textAlign: 'left', letterSpacing: 0.1 }}>
          Our <Text style={{ color: '#f43f5e' }}>Unmatched</Text> Features
        </Text>
        <View style={{ gap: 12, marginBottom: 18 }}>
          {/* Feature 1 */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 0, shadowColor: '#f43f5e', shadowOpacity: 0.04, shadowRadius: 2, elevation: 1, borderLeftWidth: 4, borderLeftColor: '#f43f5e' }}>
            <Ionicons name="checkmark-circle" size={22} color="#f43f5e" style={{ marginTop: 2, marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '700', color: '#222', fontSize: 15, marginBottom: 2 }}>Smart Pricing Technology</Text>
              <Text style={{ color: '#666', fontSize: 13 }}>Dynamic algorithms ensure you always get fair prices.</Text>
            </View>
          </View>
          {/* Feature 2 */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 0, shadowColor: '#f43f5e', shadowOpacity: 0.04, shadowRadius: 2, elevation: 1, borderLeftWidth: 4, borderLeftColor: '#f43f5e' }}>
            <Ionicons name="checkmark-circle" size={22} color="#f43f5e" style={{ marginTop: 2, marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '700', color: '#222', fontSize: 15, marginBottom: 2 }}>Virtual Tours</Text>
              <Text style={{ color: '#666', fontSize: 13 }}>360° property views so you know exactly what to expect.</Text>
            </View>
          </View>
          {/* Feature 3 */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 0, shadowColor: '#f43f5e', shadowOpacity: 0.04, shadowRadius: 2, elevation: 1, borderLeftWidth: 4, borderLeftColor: '#f43f5e' }}>
            <Ionicons name="checkmark-circle" size={22} color="#f43f5e" style={{ marginTop: 2, marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '700', color: '#222', fontSize: 15, marginBottom: 2 }}>Local Experience Packages</Text>
              <Text style={{ color: '#666', fontSize: 13 }}>Book authentic experiences with your stay.</Text>
            </View>
          </View>
          {/* Feature 4 */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 0, shadowColor: '#f43f5e', shadowOpacity: 0.04, shadowRadius: 2, elevation: 1, borderLeftWidth: 4, borderLeftColor: '#f43f5e' }}>
            <Ionicons name="checkmark-circle" size={22} color="#f43f5e" style={{ marginTop: 2, marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '700', color: '#222', fontSize: 15, marginBottom: 2 }}>Sustainability Verified</Text>
              <Text style={{ color: '#666', fontSize: 13 }}>Eco-friendly stays clearly marked in our listings.</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={{ backgroundColor: '#f43f5e', borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 6, shadowColor: '#f43f5e', shadowOpacity: 0.12, shadowRadius: 4, elevation: 2 }}>
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16, letterSpacing: 0.1 }}>Discover the Difference</Text>
        </TouchableOpacity>
      </View>

      {/* Testimonials */}
      <View style={{ marginTop: 32, marginBottom: 10, alignItems: 'center', paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#222', textAlign: 'center', marginBottom: 2 }}>
          Trusted by <Text style={{ color: '#f43f5e' }}>Travelers{`\n`}Worldwide</Text>
        </Text>
        <Text style={{ color: '#666', fontSize: 13, textAlign: 'center', marginBottom: 18 }}>
          Join our community of happy travelers and hosts
        </Text>
        {/* Testimonial Slider */}
        <FlatList
          ref={testimonialListRef}
          data={testimonials}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          onMomentumScrollEnd={e => {
            const index = Math.round(e.nativeEvent.contentOffset.x / 340);
            setTestimonialIndex(index);
          }}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: '#fff', borderRadius: 18, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3, width: 340, marginHorizontal: 8 }}>
              <Image source={{ uri: item.image }} style={{ width: 64, height: 64, borderRadius: 32, marginBottom: 8, borderWidth: 3, borderColor: '#f43f5e' }} />
              <Text style={{ fontWeight: '700', fontSize: 15, color: '#222', marginBottom: 1 }}>{item.author}</Text>
              <Text style={{ color: '#888', fontSize: 13, marginBottom: 4 }}>{item.role}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                {[...Array(5)].map((_, i) => (
                  <Ionicons key={i} name="star" size={16} color={i < 4 ? '#f43f5e' : '#e0e0e0'} style={{ marginRight: 1 }} />
                ))}
                <View style={{ backgroundColor: '#fee2e2', borderRadius: 8, paddingHorizontal: 7, paddingVertical: 2, marginLeft: 8 }}>
                  <Text style={{ color: '#f43f5e', fontWeight: '600', fontSize: 11 }}>Instant Booking</Text>
                </View>
              </View>
              <Text style={{ color: '#444', fontSize: 14, fontStyle: 'italic', textAlign: 'center', marginBottom: 10, lineHeight: 20 }}>
                "{item.quote}"
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 0 }}>
                <Ionicons name="location" size={15} color="#f43f5e" style={{ marginRight: 4 }} />
                <Text style={{ color: '#888', fontSize: 12 }}>Santorini, Greece</Text>
              </View>
            </View>
          )}
          snapToInterval={356}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}
          onTouchStart={handlePause}
          onTouchEnd={handleResume}
          onScrollBeginDrag={handlePause}
          onScrollEndDrag={handleResume}
        />
        {/* Arrows and Pagination */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 8, marginTop: 4 }}>
          <TouchableOpacity
            style={{ padding: 8 }}
            disabled={testimonialIndex === 0}
            onPress={() => {
              if (testimonialIndex > 0) {
                testimonialListRef.current.scrollToIndex({ index: testimonialIndex - 1, animated: true });
                setTestimonialIndex(testimonialIndex - 1);
              }
            }}
          >
            <Ionicons name="chevron-back-circle" size={28} color={testimonialIndex === 0 ? '#e0e0e0' : '#f43f5e'} />
          </TouchableOpacity>
          <View style={{ width: 16 }} />
          <TouchableOpacity
            style={{ padding: 8 }}
            disabled={testimonialIndex === testimonials.length - 1}
            onPress={() => {
              if (testimonialIndex < testimonials.length - 1) {
                testimonialListRef.current.scrollToIndex({ index: testimonialIndex + 1, animated: true });
                setTestimonialIndex(testimonialIndex + 1);
              }
            }}
          >
            <Ionicons name="chevron-forward-circle" size={28} color={testimonialIndex === testimonials.length - 1 ? '#e0e0e0' : '#f43f5e'} />
          </TouchableOpacity>
        </View>
        {/* Pagination Dots */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
          {testimonials.map((_, i) => (
            <View key={i} style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: testimonialIndex === i ? '#f43f5e' : '#e0e0e0', marginHorizontal: 3 }} />
          ))}
        </View>
      </View>

      {/* Host Benefits */}
      <View style={{ backgroundColor: '#fff', borderRadius: 18, marginTop: 24, marginHorizontal: 10, paddingVertical: 24, paddingHorizontal: 14, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#222', marginBottom: 6, textAlign: 'center', letterSpacing: 0.1 }}>
          Host With <Text style={{ color: '#f43f5e' }}>Confidence</Text>
        </Text>
        <Text style={{ color: '#666', fontSize: 14, textAlign: 'center', marginBottom: 18 }}>
          Join 500,000+ hosts earning an average of $15,000/year on our platform
        </Text>
        <View style={{ gap: 16, marginBottom: 18 }}>
          {hostBenefits.map((benefit, index) => (
            <View key={index} style={{ backgroundColor: '#f9f9f9', borderRadius: 14, padding: 18, marginBottom: 0, shadowColor: '#f43f5e', shadowOpacity: 0.04, shadowRadius: 2, elevation: 1, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ backgroundColor: '#fee2e2', borderRadius: 10, padding: 10, marginRight: 14 }}>
                <Ionicons name={benefit.icon} size={28} color="#f43f5e" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '700', color: '#222', fontSize: 15, marginBottom: 2 }}>{benefit.title}</Text>
                <Text style={{ color: '#666', fontSize: 13, marginBottom: 6 }}>{benefit.description}</Text>
                <View style={{ alignSelf: 'flex-start', backgroundColor: '#f43f5e', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 3, marginTop: 2 }}>
                  <Text style={{ color: '#fff', fontWeight: '600', fontSize: 12 }}>{benefit.stat}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity style={{ backgroundColor: '#f43f5e', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 10, marginHorizontal: 10, shadowColor: '#f43f5e', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5 }}>
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>Get Started Now</Text>
        </TouchableOpacity>
      </View>

      {/* Become a Host CTA (web-style) */}
      <View style={{ backgroundColor: '#f43f5e', borderRadius: 0, marginTop: 24, marginHorizontal: 0, paddingVertical: 32, paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, marginBottom: 10, textAlign: 'center' }}>
          Become a StayFinder host
        </Text>
        <Text style={{ color: '#fff', fontSize: 14, opacity: 0.95, marginBottom: 22, textAlign: 'center', fontWeight: '400' }}>
          Turn your extra space into extra income. Join thousands of hosts who are earning money by sharing their homes.
        </Text>
        <View style={{ marginBottom: 22, width: '100%' }}>
          <View style={{ alignItems: 'center', marginBottom: 18 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 26, marginBottom: 2 }}>$2,000+</Text>
            <Text style={{ color: '#fff', fontSize: 13, opacity: 0.92 }}>Average monthly earnings</Text>
          </View>
          <View style={{ alignItems: 'center', marginBottom: 18 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24, marginBottom: 2 }}>4.8★</Text>
            <Text style={{ color: '#fff', fontSize: 13, opacity: 0.92 }}>Average host rating</Text>
          </View>
          <View style={{ alignItems: 'center', marginBottom: 0 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24, marginBottom: 2 }}>500+</Text>
            <Text style={{ color: '#fff', fontSize: 13, opacity: 0.92 }}>Active hosts worldwide</Text>
          </View>
        </View>
        <TouchableOpacity style={{ backgroundColor: '#fff', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 28, alignItems: 'center', marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center' }}>
          <Text style={{ color: '#f43f5e', fontWeight: '700', fontSize: 15, marginRight: 7 }}>Start hosting today</Text>
          <Ionicons name="arrow-forward" size={18} color="#f43f5e" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f7f7f7',
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 8,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#f43f5e',
    fontFamily: 'System',
    letterSpacing: 0.1,
  },
  heroSection: {
    backgroundColor: '#f43f5e',
    paddingHorizontal: 14,
    paddingTop: 24,
    paddingBottom: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'left',
    fontFamily: 'System',
    letterSpacing: 0.1,
  },
  heroSubtitle: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 14,
    textAlign: 'left',
    fontFamily: 'System',
    fontWeight: '400',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 14,
  },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 7,
    marginBottom: 7,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'System',
  },
  searchBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f7f7f7',
    shadowColor: 'transparent',
    elevation: 0,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 7,
    backgroundColor: '#fafafa',
    shadowColor: 'transparent',
    elevation: 0,
  },
  input: {
    flex: 1,
    height: 36,
    fontSize: 14,
    color: '#222',
    fontFamily: 'System',
    fontWeight: '400',
  },
  searchButton: {
    backgroundColor: '#f43f5e',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 4,
    shadowColor: '#f43f5e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 48,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    fontFamily: 'System',
    letterSpacing: 0.1,
  },
  highlightsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
    gap: 8,
  },
  highlight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.13)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginHorizontal: 4,
    marginVertical: 4,
    minHeight: 32,
  },
  highlightText: {
    color: '#fff',
    fontSize: 13,
    marginLeft: 7,
    fontFamily: 'System',
    fontWeight: '500',
    lineHeight: 18,
  },
  sectionContainer: {
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
  howItWorksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  howItWorksCard: {
    width: '48%',
    backgroundColor: '#f7f7f7',
    borderRadius: 14,
    padding: 13,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
    minHeight: 180,
  },
  howItWorksTitle: {
    fontWeight: '700',
    fontSize: 14,
    marginTop: 6,
    marginBottom: 1,
    color: '#f43f5e',
    fontFamily: 'System',
  },
  howItWorksDesc: {
    color: '#444',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 3,
    fontFamily: 'System',
    fontWeight: '400',
  },
  howItWorksHighlight: {
    color: '#fff',
    backgroundColor: '#f43f5e',
    borderRadius: 7,
    paddingHorizontal: 7,
    paddingVertical: 1,
    fontSize: 11,
    overflow: 'hidden',
    fontFamily: 'System',
    fontWeight: '500',
  },
  whyChooseCard: {
    width: '47%',
    backgroundColor: '#f7f7f7',
    borderRadius: 14,
    padding: 11,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  whyChooseTitle: {
    fontWeight: '700',
    fontSize: 13,
    marginTop: 5,
    color: '#f43f5e',
    fontFamily: 'System',
  },
  whyChooseDesc: {
    color: '#444',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'System',
    fontWeight: '400',
  },
  trustBadgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  trustBadge: {
    backgroundColor: '#f7f7f7',
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 6,
  },
  trustBadgeText: {
    color: '#717171',
    fontSize: 12,
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
  testimonialCard: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginRight: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  testimonialImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 12,
  },
  testimonialQuote: {
    fontStyle: 'italic',
    color: '#555',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 20,
  },
  testimonialAuthor: {
    fontWeight: '700',
    color: '#333',
    fontSize: 13,
  },
  testimonialRole: {
    color: '#777',
    fontWeight: '400',
    fontSize: 12,
  },
  benefitCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  benefitTitle: {
    fontWeight: '700',
    fontSize: 15,
    marginTop: 10,
    color: '#333',
    textAlign: 'center',
  },
  benefitDesc: {
    color: '#666',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
    lineHeight: 18,
  },
  benefitStatContainer: {
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  benefitStat: {
    color: '#f43f5e',
    fontWeight: '600',
    fontSize: 12,
  },
  hostCtaButton: {
    backgroundColor: '#f43f5e',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 10,
    shadowColor: '#f43f5e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  hostCtaText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  hostSectionCta: {
    backgroundColor: '#f43f5e',
    borderRadius: 20,
    margin: 18,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#f43f5e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
  },
  hostSectionTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 6,
    fontFamily: 'System',
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  hostSectionDesc: {
    color: '#fff',
    fontSize: 13,
    opacity: 0.92,
    marginBottom: 12,
    fontFamily: 'System',
    textAlign: 'center',
    fontWeight: '400',
  },
  hostStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  hostStat: {
    flex: 1,
    alignItems: 'center',
  },
  hostStatValue: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 1,
    fontFamily: 'System',
  },
  hostStatLabel: {
    color: '#fff',
    opacity: 0.9,
    fontSize: 11,
    fontFamily: 'System',
    textAlign: 'center',
    fontWeight: '400',
  },
  hostSectionButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 6,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  hostSectionButtonText: {
    color: '#f43f5e',
    fontWeight: '700',
    fontSize: 15,
    fontFamily: 'System',
    letterSpacing: 0.1,
  },
  altSectionBg: {
    backgroundColor: '#f7f7f7',
    borderRadius: 14,
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputIcon: {
    marginRight: 6,
    fontSize: 20,
    alignSelf: 'center',
  },
  horizontalSnap: {
    paddingLeft: 14,
    paddingRight: 14,
  },
  popularRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    marginBottom: 10,
  },
  section: {
    marginTop: 28,
    paddingHorizontal: 14,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 14,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  featureTitle: {
    fontWeight: '700',
    fontSize: 14,
    marginTop: 8,
    color: '#333',
    textAlign: 'center',
  },
  featureDescription: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  ratingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  ratingText: {
    fontSize: 12,
    color: '#555',
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
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
}); 