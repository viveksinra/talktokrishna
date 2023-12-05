import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const QuestionCard = ({ question, handleAskQuestion }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={handleAskQuestion}>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{question}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="arrow-right" size={20} color="#000" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
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

export default QuestionCard;
