import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function UnmatchedFeatures() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Our <Text style={{ color: '#f43f5e' }}>Unmatched</Text> Features
      </Text>
      <View style={styles.featuresContainer}>
        {/* Feature 1 */}
        <View style={styles.featureCard}>
          <Ionicons name="checkmark-circle" size={22} color="#f43f5e" style={styles.featureIcon} />
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Smart Pricing Technology</Text>
            <Text style={styles.featureDescription}>Dynamic algorithms ensure you always get fair prices.</Text>
          </View>
        </View>
        {/* Feature 2 */}
        <View style={styles.featureCard}>
          <Ionicons name="checkmark-circle" size={22} color="#f43f5e" style={styles.featureIcon} />
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Virtual Tours</Text>
            <Text style={styles.featureDescription}>360° property views so you know exactly what to expect.</Text>
          </View>
        </View>
        {/* Feature 3 */}
        <View style={styles.featureCard}>
          <Ionicons name="checkmark-circle" size={22} color="#f43f5e" style={styles.featureIcon} />
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Local Experience Packages</Text>
            <Text style={styles.featureDescription}>Book authentic experiences with your stay.</Text>
          </View>
        </View>
        {/* Feature 4 */}
        <View style={styles.featureCard}>
          <Ionicons name="checkmark-circle" size={22} color="#f43f5e" style={styles.featureIcon} />
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Sustainability Verified</Text>
            <Text style={styles.featureDescription}>Eco-friendly stays clearly marked in our listings.</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>Discover the Difference</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    backgroundColor: '#f9f9f9',
    borderRadius: 18,
    marginTop: 18,
    marginHorizontal: 6,
    paddingVertical: 22,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 14,
    textAlign: 'left',
    letterSpacing: 0.1,
  },
  featuresContainer: {
    gap: 12,
    marginBottom: 18,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 0,
    shadowColor: '#f43f5e',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
    borderLeftWidth: 4,
    borderLeftColor: '#f43f5e',
  },
  featureIcon: {
    marginTop: 2,
    marginRight: 10,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontWeight: '700',
    color: '#222',
    fontSize: 15,
    marginBottom: 2,
  },
  featureDescription: {
    color: '#666',
    fontSize: 13,
  },
  ctaButton: {
    backgroundColor: '#f43f5e',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
    shadowColor: '#f43f5e',
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.1,
  },
}; 