// FooterNavigation.js

import React from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Link, useLocation } from 'react-router-dom'; // for web
import { useNavigation } from '@react-navigation/native'; // for native

const FooterNavigation = () => {
  const isNative = Platform.OS !== 'web'; // Detect if we're in a mobile environment
  const navigation = useNavigation();
  const location = useLocation();

  const routes = [
    { name: 'Home', path: 'Home' },
    { name: 'Search', path: 'Search' },
    { name: 'Profile', path: 'Profile' },
    { name: 'Settings', path: 'Settings' }
  ];

  const handleNavigation = (path) => {
    if (isNative) {
      navigation.navigate(path); // React Native navigation
    }
  };

  return (
    <View style={styles.footer}>
      {routes.map((route) => (
        isNative ? (
          <TouchableOpacity key={route.name} onPress={() => handleNavigation(route.path)} style={styles.tab}>
            <Text style={styles.text}>{route.name}</Text>
          </TouchableOpacity>
        ) : (
          <Link key={route.name} to={route.path} style={styles.tab}>
            <Text style={[
              styles.text,
              location.pathname === route.path ? styles.activeText : null
            ]}>
              {route.name}
            </Text>
          </Link>
        )
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  tab: {
    paddingVertical: 10,
  },
  text: {
    fontSize: 14,
    color: '#555',
  },
  activeText: {
    color: '#007bff',
    fontWeight: 'bold',
  }
});

export default FooterNavigation;
