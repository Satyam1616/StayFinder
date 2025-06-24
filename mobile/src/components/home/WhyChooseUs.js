import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function WhyChooseUs() {
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

  return (
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
}; 