import { View, Text } from 'react-native'
import React, { useContext } from 'react';
import ChatListItem from './../components/ChatListItem'
import enChats from '../../assets/data/enChats.json'
import lastMsg from '../../assets/data/lastMsg.json'
// import hiChats from '../../assets/data/hiChats.json'
import { FlatList } from 'react-native'
import {useTranslation} from 'react-i18next';
import { MessageContext } from './../../src/components/Message/MessageProvider';

const ChatsScreens = () => {
  const { messages } = useContext(MessageContext);

  function mergeArrays(gods, lastMessage) {
    const mergedArray = [];
  
    gods.forEach((god, index) => {
      const godLink = god.link;
      const godMessages = messages[godLink];
      let myLastMsg = { "id": "m1", 
      "text": "Chekout", 
         "createdAt": "2023-05-09T13:30:00.000Z",  
           "link": "ganesha"}
      if(godMessages){      
       myLastMsg = godMessages[0];
      }else {
        myLastMsg = lastMessage.find(message => message.link === god.link);
      }
      
        
      const mergedObject = {
        id: (index + 1).toString(),
        user: god,
        lastMessage: myLastMsg
      };
        
      mergedArray.push(mergedObject);
    });
  
    // Rest of your code...
      
    return mergedArray;
  }
  function sortMessagesByCreatedAt(messages) {
    messages.sort((a, b) => {
      const dateA = new Date(a.lastMessage.createdAt);
      const dateB = new Date(b.lastMessage.createdAt);
      return dateB - dateA; // Sort in descending order
    });
    return messages;
  }
  const { t } = useTranslation();
  const gods = t('gods');
  const foGods = JSON.parse(gods);
  const mergedData = sortMessagesByCreatedAt(mergeArrays(foGods, lastMsg));;
  return (
    <>    
    <FlatList
    data={mergedData}
    renderItem={({item}) => <ChatListItem chat={item}/>} />

    </>

  )
}

export default ChatsScreens