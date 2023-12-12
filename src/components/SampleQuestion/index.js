import React, {useState,useEffect} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import QuestionCard from './questionCard'; // Make sure to import the QuestionCard component
import {engArray,hinArray} from './../InputBox/QuestArray';
import { useTranslation } from 'react-i18next';

const SampleQuestionList = ({handleAskQuestion}) => {

  const [messages, setMessages] = useState(engArray);  
const { t } = useTranslation();
const LanguageCode = t('LanguageCode') 
useEffect(() => {
  if(LanguageCode == 'hi-IN'){
      setMessages(hinArray)
  }else{
    setMessages(engArray)
  }
    }, [LanguageCode]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {messages?.map((message) => (
        <QuestionCard
          key={message.id}
          question={message.text}
          handleAskQuestion={() => handleAskQuestion(message.text)}
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
