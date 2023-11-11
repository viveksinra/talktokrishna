import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Modal, Text, ToastAndroid } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { MessageContext } from './../../../src/components/Message/MessageProvider';
import { useTranslation } from 'react-i18next';
import LottieView from 'lottie-react-native';
import axios from 'axios'; // Import the axios library
import { ActivityIndicator } from 'react-native';
// const startUrl = "https://merekisan.in"
const startUrl = "http://192.168.1.12:2040"
// const startUrl = "http://192.168.1.10:2040"


const InputBox = ({ godLink }) => {
const { messages } = useContext(MessageContext);
const godMessage = messages[godLink];

  const { t } = useTranslation();
  const LanguageCode = t('LanguageCode')

  const { addMessage } = useContext(MessageContext);
  const [newMessage, setNewMessage] = useState('');
  const [recording, setRecording] = useState(null);
  const [isRecordingModalVisible, setRecordingModalVisible] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const timerIntervalRef = useRef(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGettingResponse, setIsGettingResponse] = useState(false);

  // Set a timeout to reset the state after 1 minute (60000 milliseconds)
  const resetStateTimer = setTimeout(() => {
    setIsAnalyzing(false);
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

  const sendAndGetResponse = async (godLink, message) => {
    setIsGettingResponse(true)
    try{
      addMessage(godLink, message);
      let url = `${startUrl}/api/other/ttg/callAiGod/getResponse`
      const prevMsgs = godMessage.slice(-4);

      const response = await axios.post(url, {godLink,message,prevMsgs})
        let myRes = response.data
        if(myRes.variant == "success"){
          setIsGettingResponse(false)
          addMessage(godLink, myRes.resMessage); 
        }
    }catch(error){
      ToastAndroid.show('some error occured while sending or setting the message', ToastAndroid.SHORT);

      console.log("some error occured while sending or setting the message" + error)
    }
    setIsGettingResponse(false)
  };


  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        shouldDuckAndroid: true,
        
      });
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecordingModalVisible(true);
      setRecording(newRecording);
      setTimer(0);
      startTimer();
      setIsRecording(true);
    } catch (error) {
      ToastAndroid.show('Failed to start recording', ToastAndroid.SHORT);
      console.log('Failed to start recording', error);
    }
  };
  
  const stopRecording = async () => {
    setIsAnalyzing(true)
    setRecordingModalVisible(false);
    clearInterval(timerIntervalRef.current);
    const uri  = recording.getURI();

    try {
      await recording.stopAndUnloadAsync();
      if (uri) {
      const file = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

     let url = `${startUrl}/api/other/ttg/appRecording/upload`
      const response = await axios.post(url, {file,LanguageCode})
    
        const s3URL = response.data;
  
        // Use the S3 URL as needed
       
     
        const randomId = generateRandomId();
        const message = {
          id: randomId,
          text:  s3URL?.transcription || "Failed",
          audioUrl:s3URL?.data,
          messageType:"audioAndText",
          lan:LanguageCode,
          createdAt: new Date(),
          user: {
            id: 'userId',
            name: 'Your Name',
          },
        };
        console.log('Recording uploaded:');

    setIsAnalyzing(false)
    sendAndGetResponse(godLink, message);
        setNewMessage('');
      } else {
        ToastAndroid.show('No audio recording found', ToastAndroid.SHORT);

        console.log('No audio recording found');
      }
      await Audio.setAudioModeAsync({
        shouldDuckAndroid: true,
      });
    } catch (error) {
    setIsAnalyzing(false)
    ToastAndroid.show('Failed to stop recording', ToastAndroid.SHORT);

      console.log('Failed to stop recording', error);
    }
    setRecording(null);
    setIsRecording(false);
  };
  
  

  

  const cancelRecording = async () => {
    clearInterval(timerIntervalRef.current);
    setRecordingModalVisible(false);
    if (recording) {
      try {
        await recording.stopAndUnloadAsync();
      } catch (error) {
        console.log('Failed to stop recording', error);
      }
    }
    setRecording(null);
    setIsRecording(false);
  };

  const generateRandomId = () => {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = padZero(now.getMonth() + 1);
    const day = padZero(now.getDate());
    const hours = padZero(now.getHours());
    const minutes = padZero(now.getMinutes());
    const seconds = padZero(now.getSeconds());
    const randomNum = getRandomInt(100, 999);

    return year + month + day + hours + minutes + seconds + randomNum;
  };

  const padZero = (value) => {
    return value < 10 ? '0' + value : value;
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const onSend = () => {
    if (!recording && newMessage.trim()) {
      const randomId = generateRandomId();
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
      sendAndGetResponse(godLink, message);
      setNewMessage('');
    } else if (!recording) {
      startRecording();
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const remainingSeconds = seconds % 60;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 3000);
    timerIntervalRef.current = interval;
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
      {/* Icon */}
      {!newMessage ? (
        <TouchableOpacity onPress={startRecording} style={styles.startButton}>
          <MaterialIcons name="mic" size={22} color="white" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onSend} style={styles.send}>
          <MaterialIcons name="send" size={22} color="white" />
        </TouchableOpacity>
      )}

      {/* Recording Modal */}
      <Modal animationType="slide" transparent={true} visible={isRecordingModalVisible}>
        <View style={styles.recordingModalContainer}>
          <LottieView
            source={require('./../../../assets/animation/72428-yellow-mic.json')}
            autoPlay
            loop
            style={styles.recordingMicAnimation}
          />
          <Text style={styles.recordingModalMessage}>{t('recordMessage')}</Text>
          <Text style={styles.recordingModalTimer}>{formatTime(timer)}</Text>
          <View style={styles.recordingModalButtonsContainer}>
            <TouchableOpacity style={styles.recordingModalButtonRed} onPress={cancelRecording}>
              <Text style={styles.recordingModalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.recordingModalButtonGreen} onPress={stopRecording}>
              <Text style={styles.recordingModalButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
{/* Analysing Model */}
<Modal animationType="slide" transparent={true} visible={isAnalyzing}>
<View style={styles.recordingModalContainer}>
          <LottieView
            source={require('./../../../assets/animation/analysing.json')}
            autoPlay
            loop
            style={styles.newAnimation}
          />
      <ActivityIndicator size="large" color="white" />

           <Text style={styles.recordingModalMessage}>Analyzing your recording...</Text>
          
        </View>
</Modal>
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
  send: {
    backgroundColor: 'blue',
    padding: 7,
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: 'green',
    padding: 7,
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  recordingMicAnimation: {
    width: 120,
    height: 120,
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
  recordingModalTimer: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  recordingModalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  recordingModalButtonGreen: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
  },
  recordingModalButtonRed: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
  },
  recordingModalButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default InputBox;
