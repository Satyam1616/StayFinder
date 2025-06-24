import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://1ea5-2409-40d4-10-5690-d508-6603-281b-d45c.ngrok-free.app/api'; // ngrok URL

async function getToken() {
  return await AsyncStorage.getItem('token');
}

async function request(endpoint, method = 'GET', data = null, auth = false) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = await getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  const options = {
    method,
    headers,
  };
  if (data) options.body = JSON.stringify(data);
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const api = {
  login: (data) => request('/user/login', 'POST', data),
  signup: (data) => request('/user/register', 'POST', data),
  getListings: () => request('/listings', 'GET'),
  getListing: (id) => request(`/listings/${id}`, 'GET'),
  getHostListings: () => request('/listings/host-listings', 'GET', null, true),
  getHostGuestRequests: () => request('/bookings/guest-requests', 'GET', null, true),
  updateBookingStatus: (bookingId, status) => request('/bookings/approve', 'PUT', { bookingId, status }, true),
  
  // Profile APIs
  getUserProfile: () => request('/user/profile', 'GET', null, true),
  updateUserProfile: (data) => request('/user/profile/update', 'PUT', data, true),
  changePassword: (data) => request('/user/profile/change-password', 'PUT', data, true),
  getMyBookings: () => request('/user/my-bookings', 'GET', null, true),
  getMyWishlist: () => request('/user/my-wishlist', 'GET', null, true),
  toggleWishlist: (listingId) => request('/user/toggle-wishlist', 'POST', { listingId }, true),
  // Add more as needed (bookings, wishlist, etc.)
}; 