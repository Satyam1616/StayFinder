import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ListingsScreen from './src/screens/ListingsScreen';
import PropertyDetailScreen from './src/screens/PropertyDetailScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'StayFinder' }} 
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App; 