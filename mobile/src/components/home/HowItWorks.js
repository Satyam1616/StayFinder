import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function HowItWorks() {
  const steps = [{
    icon: <Ionicons name="search" size={32} color="#d32f2f" />, 
    title: 'Search Smart', 
    desc: 'Use our filters to find exactly what you want', 
    highlight: '100+ filters'
  },{
    icon: <MaterialIcons name="date-range" size={32} color="#d32f2f" />, 
    title: 'Book Seamlessly', 
    desc: 'Instant booking or request with 24-hour response', 
    highlight: 'No booking fees'
  },{
    icon: <Ionicons name="key" size={32} color="#d32f2f" />, 
    title: 'Enjoy Your Stay', 
    desc: 'Access guidebooks and 24/7 support', 
    highlight: 'Local tips included'
  },{
    icon: <Ionicons name="star" size={32} color="#d32f2f" />, 
    title: 'Share Experience', 
    desc: 'Earn rewards for reviews', 
    highlight: 'Loyalty program'
  }];

  return (
    <View style={[styles.section, { backgroundColor: '#f9f9f9', paddingVertical: 20 }]}>
      <Text style={styles.sectionTitle}>How StayFinder Works</Text>
      <Text style={styles.sectionSubtitle}>From dream to destination in just a few taps</Text>
      <View style={styles.howItWorksGrid}>
        {steps.map((step, i) => (
          <View key={i} style={styles.howItWorksCard}>
            {step.icon}
            <Text style={styles.howItWorksTitle}>{step.title}</Text>
            <Text style={styles.howItWorksDesc}>{step.desc}</Text>
            <Text style={styles.howItWorksHighlight}>{step.highlight}</Text>
          </View>
        ))}
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
}; 