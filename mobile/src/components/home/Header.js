import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('../../../assets/home.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>StayFinder</Text>
      </View>
      <Ionicons name="menu" size={28} color="#222" />
    </View>
  );
}

const styles = {
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
}; 