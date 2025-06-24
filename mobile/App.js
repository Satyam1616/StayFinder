import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ListingsScreen from './src/screens/ListingsScreen';
import PropertyDetailScreen from './src/screens/PropertyDetailScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HostDashboardScreen from './src/screens/HostDashboardScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MyBookingsScreen from './src/screens/MyBookingsScreen';
import MyWishlistScreen from './src/screens/MyWishlistScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ title: 'Login', headerShown: false }} 
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen}
          options={{ title: 'Sign Up', headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'StayFinder', headerShown: false }} 
        />
        <Stack.Screen 
          name="Listings" 
          component={ListingsScreen}
          options={{ title: 'Explore Stays' }} 
        />
        <Stack.Screen 
          name="PropertyDetail" 
          component={PropertyDetailScreen}
          options={{ title: 'Property Details' }} 
        />
        <Stack.Screen 
          name="HostDashboard" 
          component={HostDashboardScreen}
          options={{ title: 'Host Dashboard' }} 
        />
        
        {/* Profile Stack */}
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'My Profile' }}/>
        <Stack.Screen name="MyBookings" component={MyBookingsScreen} options={{ title: 'My Bookings' }}/>
        <Stack.Screen name="MyWishlist" component={MyWishlistScreen} options={{ title: 'My Wishlist' }}/>
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Change Password' }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App; 