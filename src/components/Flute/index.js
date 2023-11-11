import React, { useEffect, useRef } from 'react';
import { Image, View, StyleSheet, Animated } from 'react-native';

const Flute = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(spinValue, {
          toValue: -1,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(spinValue, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),      
      ])
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [-1, 0],
    outputRange: ['-15deg', '+15deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        style={{ ...styles.logo, transform: [{ rotate: spin }] }}
        source={{ uri: 'https://gitagpt.org/static/gitaGPT.png' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logo: {
    width: 350, // 20rem in react-native
    height: undefined,
    aspectRatio:2.5, 
    resizeMode: 'contain',
  },
});

export default Flute;
