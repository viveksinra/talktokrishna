import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import QuestionCard from './questionCard'; // Make sure to import the QuestionCard component
import { engArray, hinArray } from './../InputBox/QuestArray';
import { useTranslation } from 'react-i18next';
import axios from 'axios'; // Import Axios library
import AsyncStorage from '@react-native-async-storage/async-storage';

const startUrl = "http://192.168.1.13:2040"; // Update the URL accordingly

const SampleQuestionList = ({ handleAskQuestion }) => {
  const [messages, setMessages] = useState(engArray);
  const { t } = useTranslation();
  const LanguageCode = t('LanguageCode');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let defQuest = await AsyncStorage.getItem('defaultQuestion');
        defQuest = defQuest ? JSON.parse(defQuest) : null;
  
        if (!defQuest) {
          // If not in local storage, store it and setMessages
          if (messages === engArray || messages === hinArray) {
            const url = `${startUrl}/api/myApp/api/ttg/getAiResponse/allDefaultQuestions`;
            const response = await axios.get(url);
            const responseData = response.data.data;
  
            if (responseData) {
              AsyncStorage.setItem('defaultQuestion', JSON.stringify(responseData));
              defQuest = responseData;
            }
          }
        }
  
        if (LanguageCode === 'hi-IN') {
          if (defQuest?.hinArray) {
            setMessages((prevMessages) => {
              if (prevMessages !== defQuest.hinArray) {
                return defQuest.hinArray;
              }
              return prevMessages;
            });
          } else {
            setMessages(hinArray);
          }
        } else {
          if (defQuest?.engArray) {
            setMessages((prevMessages) => {
              if (prevMessages !== defQuest.engArray) {
                return defQuest.engArray;
              }
              return prevMessages;
            });
          } else {
            setMessages(engArray);
          }
        }
      } catch (error) {
        console.error('Error fetching default question:', error);
      }
    };
  
    fetchData();
  }, [ LanguageCode]);
    

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
