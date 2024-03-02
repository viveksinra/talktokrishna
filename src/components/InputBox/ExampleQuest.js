import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {engArray,hinArray} from './QuestArray';
import { useTranslation } from 'react-i18next';
import defaultQuestApi from '../../utils/defaultQuestApi';

const ExampleQuest = ({onSend,setNewMessage}) => {
const [showExamp, setShowExamp] = useState(true);
const [isArrowUp, setIsArrowUp] = useState(false);
const [messages, setMessages] = useState(engArray);  
const { t } = useTranslation();
const LanguageCode = t('LanguageCode') 
const sendMessage = async(message) => {
   await setNewMessage(message),
    onSend()
}
useEffect(() => {
  const fetchData = async () => {
let data = await defaultQuestApi(messages,LanguageCode)
setMessages(data)
  };

  fetchData();
}, [ LanguageCode]);


  return (
    <>
    {(showExamp)? 
      ( <>
      <View style={styles.header}>
       <Text style={styles.headerText}>{t('exmQues.one')}</Text>
          {!isArrowUp ? (  <TouchableOpacity onPress={() => setIsArrowUp(true)}>
               <Ionicons name="arrow-up" size={24} color="green" style={styles.icon} />
               </TouchableOpacity>):
                ( <TouchableOpacity onPress={() => setIsArrowUp(false)}>
                 <Ionicons name="arrow-down" size={24} color="green" style={styles.icon} />
               </TouchableOpacity>)}
               <TouchableOpacity onPress={() => setShowExamp(false)}>
               <Ionicons name="close-circle-outline" size={24} color="red" style={styles.icon} />
               </TouchableOpacity>
             </View>
         {isArrowUp ? (
           <>
         
             <ScrollView style={styles.allMessagesContainer}>
            
               {messages?.map((message) => (
                 <Text key={message.id} style={styles.question}>
                   {message.text}
                 </Text>
               ))}
             </ScrollView> 
           </>
         ) : (
           <View style={styles.container}>
           <ScrollView
             horizontal={true}
             style={styles.horizontalScrollContainer}
             contentContainerStyle={styles.horizontalContentContainer}
           >
             {messages?.map((message) => (
               <TouchableOpacity key={message.id} style={styles.messageContainer} onPress={() => sendMessage(message.text)}>
                 <Text style={styles.question}>{message.text}</Text>
               </TouchableOpacity>
             ))}
           </ScrollView>
         </View>
         )}
       </>
       ):
       (<></>)
      }
  </>
  );
};
const styles = StyleSheet.create({
    container: {
      padding: 2, // Reduced padding
      backgroundColor: '#f0f0f0',  

    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end', // Align icon to the right
      paddingHorizontal: 0, // Removed horizontal padding
    },
    horizontalScrollContainer: {
        flexGrow: 0, // Add this to prevent ScrollView from stretching
      },
      horizontalContentContainer: {
        alignItems: 'center', // Center items vertically
      },
    messagesContainer: {
      flex: 1,
      backgroundColor: '#ffffff',
      borderRadius: 20,
      marginHorizontal: 10, // Space between items
      padding: 5,
    },
    allMessagesContainer: {
      flex: 1,
      backgroundColor: '#f0f0f0',
  
    },
    question: {
      backgroundColor: '#ffffff',
      color: '#333333',
      padding: 5, // Reduced padding
      borderRadius: 20,
      marginVertical: 5, // Reduced margin
      marginHorizontal: 10, // Reduced margin
      fontSize: 16,
      fontWeight: '500',
      borderWidth: 1,
      borderColor: '#e0e0e0',
      elevation: 3,
    },
    icon: {
      alignSelf: 'center',
    },
    header: {
        flexDirection: 'row', // Keep items in a row
        justifyContent: 'space-between', // Distribute space between items
        alignItems: 'center', // Center items vertically
        backgroundColor: '#e8e8e8',
        padding: 5,
      },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
  });
export default ExampleQuest;
