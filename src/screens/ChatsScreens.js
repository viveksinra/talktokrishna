import React, { useState, useContext, useRef } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet,Animated,ScrollView,  ImageBackground } from 'react-native';
import { useTranslation } from 'react-i18next';
import Flute from '../components/Flute';
import AskQuestForm from '../components/AskQuestion';
import SampleQuestion from '../components/SampleQuestion';
import ContentContext from '../Context/ContentContext';
const image = { uri: ContentContext.mainBg };
import { useNavigation } from '@react-navigation/native';
import {generateRandomId} from "./../utils/randomId"
import TermPopup from '../authentication/authComponent/MobileLogin/TermPopup';
const ChatsScreens = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  function handleAskQuestion(quest) {
    if (quest.trim() !== '') {
      const randomId = generateRandomId();
      navigation.navigate('OneChats', {
        id: randomId,
        chatId:randomId,
        name: "Shri Krishna",
        image: ContentContext.krishnaImg,
        link: "krishna",
        question:quest,
        isRec:false,
        isHistory:false
      })
    } else {
      Alert.alert('Error', 'Please enter a valid question.');
    }

  }
  function handleRecQuestion() {
      const randomId = generateRandomId();
      navigation.navigate('OneChats', {
        id: randomId,
        chatId:randomId,
        name: "Shri Krishna",
        image: ContentContext.krishnaImg,
        link: "krishna",
        question:"",
        isRec:true,
        isHistory:false

      })
 

  }

  return (
<ScrollView>
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <ImageBackground source={image} style={styles.image}>
    <Flute />
   
    <Text style={{ fontSize: 24, color: 'black', textAlign: 'center', margin: 10 }}>
   {t('main.one')}
    <Text style={{ color: '#34d399', fontWeight: 'bold' }}>
   {t('main.two')}
    </Text>
   {t('main.three')}
    {'\n'}
    <Text style={styles.headerText}>
    {t('secMain.one')}
        <Text style={{ color: '#34d399', fontWeight: 'bold' }}>
    {t('secMain.two')}
          </Text>
    {t('secMain.three')}
         </Text>
</Text>

<AskQuestForm handleAskQuestion={handleAskQuestion} handleRecQuestion={handleRecQuestion}/>
<SampleQuestion style={{ margin:10,}} handleAskQuestion={handleAskQuestion}/>
<TermPopup /> 

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
  headerText: {
    color: '#00BFFF',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
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
