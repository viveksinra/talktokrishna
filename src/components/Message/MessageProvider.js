import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MessageContext = createContext();

const initialState = {
  messages: {},
};

const messageReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      const { chatId, message } = action.payload;
      return {
        ...state,
        messages: {
          ...state.messages,
          [chatId]: [ message, ...(state.messages[chatId] || [])],
          
        },
      };
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: action.payload,
      };
    case 'CLEAR_MESSAGES':
        return {
          ...state,
          messages: {},
        };        
    case 'REMOVE_FULL_CHAT':
      const { chatIdToRemove } = action.payload;
      const { [chatIdToRemove]: _, ...remainingMessages } = state.messages;
      return {
        ...state,
        messages: remainingMessages,
      };
  
    default:
      return state;
  }
};

export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, initialState);

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    saveMessages(state.messages);
  }, [state.messages]);

  const loadMessages = async () => {
    try {
      const messages = await AsyncStorage.getItem('messages');
      if (messages) {
        dispatch({ type: 'SET_MESSAGES', payload: JSON.parse(messages) });
      }
    } catch (error) {
      console.log('Error loading messages from AsyncStorage:', error);
    }
  };

  const saveMessages = async (messages) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messages));
    } catch (error) {
      console.log('Error saving messages to AsyncStorage:', error);
    }
  };

  const addMessage = (chatId, message) => {
    dispatch({ type: 'ADD_MESSAGE', payload: { chatId, message } });
  };

  const clearMessages = () => {
    dispatch({ type: 'CLEAR_MESSAGES' });
  };
  const removeFullOneChatId = (chatIdToRemove) => {
    dispatch({ type: 'REMOVE_FULL_CHAT', payload: { chatIdToRemove } });
  };
  const replaceMessagesInAsyncStorageAndContext = async newMessages => {
    try {
      // Save the new messages to AsyncStorage
      await AsyncStorage.setItem('messages', JSON.stringify(newMessages));
  
      // Dispatch the action to replace the context
      dispatch({
        type: 'SET_MESSAGES',
        payload: newMessages,
      });
    } catch (error) {
      console.log('Error replacing messages in AsyncStorage:', error);
    }
  };
  
  return (
    <MessageContext.Provider value={{ messages: state.messages, addMessage,clearMessages,removeFullOneChatId,replaceMessagesInAsyncStorageAndContext }}>
      {children}
    </MessageContext.Provider>
  );
};
