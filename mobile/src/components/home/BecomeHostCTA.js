import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BecomeHostCTA() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Become a StayFinder host
      </Text>
      <Text style={styles.subtitle}>
        Turn your extra space into extra income. Join thousands of hosts who are earning money by sharing their homes.
      </Text>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>$2,000+</Text>
          <Text style={styles.statLabel}>Average monthly earnings</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>4.8★</Text>
          <Text style={styles.statLabel}>Average host rating</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>500+</Text>
          <Text style={styles.statLabel}>Active hosts worldwide</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>Start hosting today</Text>
        <Ionicons name="arrow-forward" size={18} color="#f43f5e" />
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    backgroundColor: '#f43f5e',
    borderRadius: 0,
    marginTop: 24,
    marginHorizontal: 0,
    paddingVertical: 32,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.95,
    marginBottom: 22,
    textAlign: 'center',
    fontWeight: '400',
  },
  statsContainer: {
    marginBottom: 22,
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    marginBottom: 18,
  },
  statValue: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 26,
    marginBottom: 2,
  },
  statLabel: {
    color: '#fff',
    fontSize: 13,
    opacity: 0.92,
  },
  ctaButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 28,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  ctaButtonText: {
    color: '#f43f5e',
    fontWeight: '700',
    fontSize: 15,
    marginRight: 7,
  },
}; 