import AsyncStorage from '@react-native-async-storage/async-storage';
import ContentContext from '../Context/ContentContext';
const startUrl = ContentContext.startUrl; // Update the URL accordingly
import axios from 'axios';
import { engArray, hinArray } from './../components/InputBox/QuestArray';

const defaultQuestApi = async (messages, LanguageCode) => {
  let myMsg = engArray; // Use a regular variable instead of useState

  try {
    let defQuest = await AsyncStorage.getItem('defaultQuestion');
    defQuest = defQuest ? JSON.parse(defQuest) : null;

    if (!defQuest) {
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
      myMsg = defQuest?.hinArray || hinArray;
    } else {
      myMsg = defQuest?.engArray || engArray;
    }
console.log(myMsg);
    return myMsg;
  } catch (error) {
    console.error('Error fetching default question:', error);
  }
};

module.exports = defaultQuestApi;
