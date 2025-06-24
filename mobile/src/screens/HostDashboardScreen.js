import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator,
  TouchableOpacity, Image, RefreshControl
} from 'react-native';
import { api } from '../lib/api';
import PropertyCard from '../components/PropertyCard';

const TabButton = ({ title, active, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.tab, active && styles.activeTab]}>
    <Text style={[styles.tabText, active && styles.activeTabText]}>{title}</Text>
  </TouchableOpacity>
);

export default function HostDashboardScreen({ navigation }) {
  const [listings, setListings] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('listings');
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const [listingsRes, requestsRes] = await Promise.all([
        api.getHostListings(),
        api.getHostGuestRequests(),
      ]);
      setListings(listingsRes.listings || []);
      setRequests(requestsRes.requests || []);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  const handleUpdateStatus = async (bookingId, status) => {
    try {
      setRequests(prev => prev.map(req => req._id === bookingId ? { ...req, status: 'updating' } : req));
      await api.updateBookingStatus(bookingId, status);
      setRequests(prev => prev.map(req => req._id === bookingId ? { ...req, status } : req));
    } catch (err) {
      setError(err.message || 'Could not update status');
      // Revert UI on failure
      setRequests(prev => prev.map(req => (req._id === bookingId ? { ...req, status: 'pending' } : req)));
    }
  };

  const renderListingItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <PropertyCard
        item={item}
        onPress={() => navigation.navigate('PropertyDetail', { listing: item })}
      />
    </View>
  );

  const renderRequestItem = ({ item }) => {
    const isPending = item.status === 'pending';
    const isUpdating = item.status === 'updating';

    return (
      <View style={styles.requestItem}>
        <Image source={{ uri: item.listingId?.images[0] || 'https://via.placeholder.com/150' }} style={styles.requestImage} />
        <View style={styles.requestDetails}>
          <Text style={styles.requestTitle}>{item.listingId?.title}</Text>
          <View style={styles.userInfo}>
            <Image source={{ uri: item.userId?.profilePic || 'https://via.placeholder.com/40' }} style={styles.userAvatar} />
            <Text style={styles.requestSubText}>Request from {item.userId?.username}</Text>
          </View>
          <Text style={styles.requestSubText}>
            Dates: {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
          </Text>
          <View style={styles.buttonContainer}>
            {isUpdating ? (
              <ActivityIndicator color="#f43f5e" />
            ) : isPending ? (
              <>
                <TouchableOpacity style={[styles.actionButton, styles.approveButton]} onPress={() => handleUpdateStatus(item._id, 'approved')}>
                  <Text style={styles.buttonText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.rejectButton]} onPress={() => handleUpdateStatus(item._id, 'rejected')}>
                  <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={[styles.statusText, { color: item.status === 'approved' ? '#28a745' : '#dc3545' }]}>
                Status: {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#f43f5e" style={styles.loader} />;
    }
    if (error) {
      return <Text style={styles.errorText}>Error: {error}</Text>;
    }
    if (activeTab === 'listings') {
      return listings.length > 0 ? (
        <FlatList
          data={listings}
          renderItem={renderListingItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ padding: 20 }}
        />
      ) : (
        <Text style={styles.emptyText}>You haven't created any listings yet.</Text>
      );
    }
    if (activeTab === 'requests') {
      return requests.length > 0 ? (
        <FlatList
          data={requests}
          renderItem={renderRequestItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ padding: 20 }}
        />
      ) : (
        <Text style={styles.emptyText}>You have no pending guest requests.</Text>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Host Dashboard</Text>
      <View style={styles.tabContainer}>
        <TabButton title={`My Listings (${listings.length})`} active={activeTab === 'listings'} onPress={() => setActiveTab('listings')} />
        <TabButton title={`Guest Requests (${requests.filter(r => r.status === 'pending').length})`} active={activeTab === 'requests'} onPress={() => setActiveTab('requests')} />
      </View>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#f43f5e"]} />}
      >
        {renderContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  loader: { marginTop: 50 },
  errorText: { textAlign: 'center', marginTop: 20, color: 'red', fontSize: 16 },
  header: { fontSize: 28, fontWeight: 'bold', marginTop: 50, marginBottom: 20, paddingHorizontal: 20, color: '#111' },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#dee2e6' },
  tab: { paddingVertical: 15, width: '50%', alignItems: 'center' },
  activeTab: { borderBottomWidth: 3, borderBottomColor: '#f43f5e' },
  tabText: { fontSize: 16, color: '#6c757d' },
  activeTabText: { fontWeight: 'bold', color: '#f43f5e' },
  cardContainer: { marginBottom: 20 },
  emptyText: { textAlign: 'center', color: '#666', marginTop: 50 },
  requestItem: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, marginBottom: 15, padding: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  requestImage: { width: 100, height: 100, borderRadius: 8 },
  requestDetails: { flex: 1, marginLeft: 10, justifyContent: 'space-between' },
  requestTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  requestSubText: { fontSize: 14, color: '#555' },
  userInfo: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  userAvatar: { width: 25, height: 25, borderRadius: 12.5, marginRight: 8 },
  buttonContainer: { flexDirection: 'row', marginTop: 10, alignItems: 'center' },
  actionButton: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6, marginRight: 10 },
  approveButton: { backgroundColor: '#28a745' },
  rejectButton: { backgroundColor: '#dc3545' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  statusText: { fontSize: 14, fontWeight: 'bold' }
}); 