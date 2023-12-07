import React, { useState, useContext, useEffect,useRef } from 'react';
import { View, TextInput, StyleSheet, ToastAndroid, Modal, Text } from 'react-native';
import { MessageContext } from './../../../src/components/Message/MessageProvider';
import { useTranslation } from 'react-i18next';
import LottieView from 'lottie-react-native';
import { ActivityIndicator } from 'react-native';

import axios from 'axios'; // Import the axios library
import { generateRandomMessageId } from '../../utils/randomId';
import RecordingComponent from './recordingCom';
const startUrl = "https://merekisan.in"
// const startUrl = "http://192.168.1.12:2040"
// const startUrl = "http://192.168.1.10:2040"

const InputBox = ({ godLink,chatId,question,isRec }) => {
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
  }, 150000);

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
        if(isRec){
          setIsFirstRec(true)
        }
        else
       { const randomId = generateRandomMessageId();
        const message = {
          id: randomId,
          text: question,
          audioUrl:"",
          messageType:"text",
          lan:LanguageCode,
          createdAt: new Date(),
          user: {
            id: 'userId',
            name: 'Your Name',
          },
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
      let url = `${startUrl}/api/other/ttg/callAiGod/getResponse`
      const prevMsgs = godMessage?.slice(-4);

      const response = await axios.post(url, {godLink,message,prevMsgs})
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
        user: {
          id: 'userId',
          name: 'Your Name',
        },
      };
      sendAndGetResponse(godLink,chatId, message);
      setNewMessage('');
    } 
  };

  return (
    <View style={styles.container}>
      {/* Text Input */}
      <TextInput
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder={t('input.placeholder')}
        style={styles.input}onSend
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
      source={require('./../../../assets/animation/getting-response.json')}
      autoPlay
      loop
      style={styles.newAnimation}

    />
      <ActivityIndicator size="large" color="white" />
      <Text style={styles.recordingModalMessage}>Getting Response...</Text>
  </View>
</Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'whitesmoke',
    padding: 5,
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
