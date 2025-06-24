import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function HeroSection({
  location,
  setLocation,
  dates,
  setDates,
  guests,
  setGuests,
  TAGS,
  HIGHLIGHTS,
}) {
  return (
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
  );
}

const styles = {
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
  inputIcon: {
    marginRight: 6,
    fontSize: 20,
    alignSelf: 'center',
  },
  horizontalSnap: {
    paddingLeft: 14,
    paddingRight: 14,
  },
}; 