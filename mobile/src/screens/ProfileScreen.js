import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image, TouchableOpacity, Alert } from 'react-native';
import { api } from '../lib/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const ProfileOption = ({ icon, text, onPress, isDestructive = false }) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    <Ionicons name={icon} size={24} color={isDestructive ? '#dc3545' : '#495057'} />
    <Text style={[styles.optionText, isDestructive && styles.destructiveText]}>{text}</Text>
    {!isDestructive && <Ionicons name="chevron-forward" size={22} color="#adb5bd" />}
  </TouchableOpacity>
);

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.getUserProfile();
        setUser(res.user);
      } catch (err) {
        setError(err.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const confirmLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: handleLogout },
    ]);
  };

  if (loading) {
    return <View style={styles.loaderContainer}><ActivityIndicator size="large" color="#f43f5e" /></View>;
  }

  if (error) {
    return <View style={styles.loaderContainer}><Text style={styles.errorText}>Error: {error}</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: user?.profileImage || 'https://via.placeholder.com/100' }} style={styles.avatar} />
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Account</Text>
        <ProfileOption icon="bookmarks-outline" text="My Bookings" onPress={() => navigation.navigate('MyBookings')} />
        <ProfileOption icon="heart-outline" text="My Wishlist" onPress={() => navigation.navigate('MyWishlist')} />
        <ProfileOption icon="lock-closed-outline" text="Change Password" onPress={() => navigation.navigate('ChangePassword')} />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hosting</Text>
        {user?.isHost ? (
          <ProfileOption icon="grid-outline" text="Host Dashboard" onPress={() => navigation.navigate('HostDashboard')} />
        ) : (
          <ProfileOption icon="briefcase-outline" text="Become a Host" onPress={() => Alert.alert("Coming Soon!", "This feature is under development.")} />
        )}
      </View>

      <View style={styles.section}>
        <ProfileOption icon="log-out-outline" text="Logout" onPress={confirmLogout} isDestructive />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      backgroundColor: '#f0f2f5' 
    },
    loaderContainer: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#f0f2f5'
    },
    errorText: { 
      textAlign: 'center', 
      color: '#dc3545',
      fontSize: 16
    },
    profileHeader: { 
      alignItems: 'center', 
      paddingVertical: 30, 
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#e5e7eb',
      paddingTop: 60, // For notch
    },
    avatar: { 
      width: 110, 
      height: 110, 
      borderRadius: 55, 
      marginBottom: 15,
      borderWidth: 3,
      borderColor: '#f43f5e'
    },
    name: { 
      fontSize: 26, 
      fontWeight: 'bold', 
      color: '#1f2937' 
    },
    email: { 
      fontSize: 16, 
      color: '#6b7280', 
      marginTop: 5 
    },
    section: {
      marginTop: 20,
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#e5e7eb'
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: '#6b7280',
      paddingHorizontal: 20,
      paddingTop: 15,
      paddingBottom: 5,
      textTransform: 'uppercase'
    },
    option: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      paddingVertical: 15, 
      paddingHorizontal: 20,
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#f3f4f6'
    },
    optionText: { 
      fontSize: 18, 
      marginLeft: 20, 
      flex: 1, 
      color: '#374151' 
    },
    destructiveText: { 
      color: '#ef4444' 
    },
}); 