import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import QuestionCard from './questionCard'; // Make sure to import the QuestionCard component

const SampleQuestionList = ({handleAskQuestion}) => {
  const questions = [
    "How can I overcome my attachment to material possessions and wealth?",
    "How can I develop a deeper sense of wisdom and understanding?",
    "Another question goes here...",
    // Add more questions as needed
  ];
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {questions.map((question, index) => (
        <QuestionCard
          key={index}
          question={question}
          handleAskQuestion={() => handleAskQuestion(question)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    marginTop: 2,
  },
});

export default SampleQuestionList;
