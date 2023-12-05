// src/screens/DonateScreen.js

import { View, Text, Image, StyleSheet } from 'react-native';
import DonateComponent from './../components/DonateComponent'

const DonateScreen = () => {


  return (
    
    <View style={{ flex: 1 }}>
    <DonateComponent />
  </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: 'gray',
  },
  image: {
    width: '80%',
    aspectRatio: 2 / 1,
  },
});

export default DonateScreen;