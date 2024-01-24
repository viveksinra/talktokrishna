import React, { useState, useContext, useEffect,useRef } from 'react';
import { View, TextInput,ScrollView, StyleSheet, ToastAndroid, Modal, Text } from 'react-native';
import { MessageContext } from './../../../src/components/Message/MessageProvider';
import { useTranslation } from 'react-i18next';
import LottieView from 'lottie-react-native';
import { ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import axios from 'axios'; // Import the axios library
import { generateRandomMessageId } from '../../utils/randomId';
import RecordingComponent from './recordingCom';
import TextInputCom from './textInputCom';
import ExampleQuest from './ExampleQuest';
import ContentContext from '../../Context/ContentContext';
const startUrl = ContentContext.startUrl
const InputBox = ({ godLink,chatId,question,isRec,isHistory }) => {
const { messages } = useContext(MessageContext);
const godMessage = messages[chatId];

  const { t } = useTranslation();
  const LanguageCode = t('LanguageCode')
  const timerIntervalRef = useRef(null);
  const { addMessage } = useContext(MessageContext);
  const [newMessage, setNewMessage] = useState('');
  const [isGettingResponse, setIsGettingResponse] = useState(false);
  const [isFirstRec, setIsFirstRec] = useState(isRec);

  // Set a timeout to reset the state after 1 minute (60000 milliseconds)
  const resetStateTimer = setTimeout(() => {
    setIsGettingResponse(false);
  }, 60000);

  useEffect(() => {
    // Audio.requestPermissionsAsync();
    return () => {
      clearInterval(timerIntervalRef.current);
      // Make sure to clear the timeout if the component unmounts before the timer finishes
      clearTimeout(resetStateTimer);
    };
  }, []);

  useEffect(() => {
    try {
      if(isHistory){
// DO Nothing
      }
       else if(isRec){
          setIsFirstRec(true)
        }
        else
       { 
        const randomId = generateRandomMessageId();
        const message = {
          id: randomId,
          text: question,
          audioUrl:"",
          messageType:"text",
          lan:LanguageCode,
          createdAt: new Date(),
          userType:'user',
          godLink:"",
                
        };
        sendAndGetResponse(godLink,chatId, message);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error in InputBox useEffect:', error);
    }
  }, []);


  const sendAndGetResponse = async (godLink,chatId, message) => {
    setIsGettingResponse(true)
    try{
      addMessage(chatId, message);
      let url = `${startUrl}/api/myApp/api/ttg/getAiResponse/getResponse`
      const prevMsgs = godMessage?.slice(-4);
// Retrieve the token from SecureStore

let token = await SecureStore.getItemAsync('authToken');
// Set the Authorization header for the request
      const response = await axios.post(url, {chatId,godLink,message,prevMsgs},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
        })
        let myRes = response.data
        if(myRes.variant == "success"){
          setIsGettingResponse(false)
          addMessage(chatId, myRes.resMessage); 
        }
    }catch(error){
      ToastAndroid.show('some error occured while sending or setting the message', ToastAndroid.SHORT);

      console.log("some error occured while sending or setting the message" + error)
    }
    setIsGettingResponse(false)
  }; 

  const onSend = () => {
    if ( newMessage.trim()) {
      const randomId = generateRandomMessageId();
      const message = {
        id: randomId,
        text: newMessage,
        audioUrl:"",
        messageType:"text",
        lan:LanguageCode,
        createdAt: new Date(),
        userType:'user',
        godLink:"",
     
      };
      sendAndGetResponse(godLink,chatId, message);
      setNewMessage('');
    } 
  };

  return (
    <>
  <ExampleQuest 
  onSend = {onSend}
  setNewMessage = {setNewMessage}
  />
    <View style={styles.container}>    

  <TextInputCom 
  newMessage = {newMessage}
  setNewMessage = {setNewMessage}
  />
     <RecordingComponent 
     sendAndGetResponse={sendAndGetResponse} 
     onSend = {onSend}
     newMessage = {newMessage}
     setNewMessage = {setNewMessage}
     godLink = {godLink}
     chatId = {chatId}
     setIsGettingResponse = {setIsGettingResponse}
     isFirstRec = {isFirstRec}
      setIsFirstRec = {setIsFirstRec}
     />
{/* Getting Response Model */}
<Modal animationType="slide" transparent={true} visible={isGettingResponse}>
  <View style={styles.recordingModalContainer}>
  <LottieView
      source={require('./../../../commonAssets/animation/getting-response.json')}
      autoPlay
      loop
      style={styles.newAnimation}

    />
      <ActivityIndicator size="large" color="white" />
      <Text style={styles.recordingModalMessage}>Getting Response...</Text>
  </View>
</Modal>

    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'whitesmoke',
    padding: 5,
  },
  questionContainer: {
    backgroundColor: '#f0f0f0', // Choose a suitable background color
    padding: 10,
  },
  questionText: {
    fontSize: 16, // Adjust the font size as needed
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 50,
    borderColor: 'lightgray',
    borderWidth: StyleSheet.hairlineWidth,
    fontSize: 14,
  },
  recordingModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  newAnimation: {
    width: 300,
    height: 300,
  },
  recordingModalMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
});

export default InputBox;
