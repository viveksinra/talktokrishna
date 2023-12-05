import React, { useState, useContext, useRef } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet,Animated,ScrollView,  ImageBackground } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MessageContext } from './../../src/components/Message/MessageProvider';
import Flute from '../components/Flute';
import AskQuestForm from '../components/AskQuestion';
import SampleQuestion from '../components/SampleQuestion';
const image = { uri: "https://www.onlygfx.com/wp-content/uploads/2021/04/white-triangle-pattern-seamless-background-2.jpg" };
import { useNavigation } from '@react-navigation/native';
import {generateRandomId, generateRandomMessageId} from "./../utils/randomId"
const ChatsScreens = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  generateRandomId
  function handleAskQuestion(quest) {
    if (quest.trim() !== '') {
      const randomId = generateRandomId();
      navigation.navigate('OneChats', {
        id: randomId,
        chatId:randomId,
        name: "Shri Krishna",
        image: "https://res.cloudinary.com/dncukhilq/image/upload/v1687251596/talktogod/godProfileImage/krisna_image_dfza9t.jpg",
        link: "krishna",
        question:quest
      })
    } else {
      Alert.alert('Error', 'Please enter a valid question.');
    }

  }

  return (
<ScrollView>
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <ImageBackground source={image} style={styles.image}>
    <Flute />
   
    <Text style={{ fontSize: 24, color: 'black', textAlign: 'center', margin: 10 }}>
    Decoding Life's{' '}
    <Text style={{ color: '#34d399', fontWeight: 'bold' }}>
      Puzzlements with Krishna:
    </Text>
    {' More Than 500,000+ Queries Responded'}
</Text>
<AskQuestForm handleAskQuestion={handleAskQuestion}/>
<SampleQuestion style={{ margin:10,}} handleAskQuestion={handleAskQuestion}/>

  </ImageBackground>
</View>
</ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },
});

export default ChatsScreens;
