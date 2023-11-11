import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SampleQuestion = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable}>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
            How can I overcome my attachment to material possessions and wealth?
                </Text>
          </View>
          <View style={styles.iconContainer}>
            <Icon name="arrow-right" size={20} color="#000" />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchable}>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
            How can I develop a deeper sense of wisdom and understanding?
                </Text>
          </View>
          <View style={styles.iconContainer}>
            <Icon name="arrow-right" size={20} color="#000" />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchable}>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
            How can I develop a deeper sense of wisdom and understanding?
                </Text>
          </View>
          <View style={styles.iconContainer}>
            <Icon name="arrow-right" size={20} color="#000" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 2,
  },
  touchable: {
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 3,
    padding: 10,
    alignItems: 'center',
    width: '96%',
    borderColor: 'green',
    borderWidth: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 0.9,
  },
  text: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  iconContainer: {
    flex: 0.1,
    alignItems: 'flex-end',
  },
});

export default SampleQuestion;
