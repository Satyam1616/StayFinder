import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HostBenefits() {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Host With <Text style={{ color: '#f43f5e' }}>Confidence</Text>
      </Text>
      <Text style={styles.subtitle}>
        Join 500,000+ hosts earning an average of $15,000/year on our platform
      </Text>
      <View style={styles.benefitsContainer}>
        {hostBenefits.map((benefit, index) => (
          <View key={index} style={styles.benefitCard}>
            <View style={styles.benefitIconContainer}>
              <Ionicons name={benefit.icon} size={28} color="#f43f5e" />
            </View>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>{benefit.title}</Text>
              <Text style={styles.benefitDescription}>{benefit.description}</Text>
              <View style={styles.benefitStatContainer}>
                <Text style={styles.benefitStat}>{benefit.stat}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>Get Started Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginTop: 24,
    marginHorizontal: 10,
    paddingVertical: 24,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  subtitle: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 18,
  },
  benefitsContainer: {
    gap: 16,
    marginBottom: 18,
  },
  benefitCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 14,
    padding: 18,
    marginBottom: 0,
    shadowColor: '#f43f5e',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitIconContainer: {
    backgroundColor: '#fee2e2',
    borderRadius: 10,
    padding: 10,
    marginRight: 14,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontWeight: '700',
    color: '#222',
    fontSize: 15,
    marginBottom: 2,
  },
  benefitDescription: {
    color: '#666',
    fontSize: 13,
    marginBottom: 6,
  },
  benefitStatContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#f43f5e',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 2,
  },
  benefitStat: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  ctaButton: {
    backgroundColor: '#f43f5e',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 10,
    shadowColor: '#f43f5e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
}; 