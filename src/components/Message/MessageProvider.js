import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MessageContext = createContext();

const initialState = {
  messages: {},
};

const messageReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      const { godLink, message } = action.payload;
      return {
        ...state,
        messages: {
          ...state.messages,
          [godLink]: [ message, ...(state.messages[godLink] || [])],
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

  const addMessage = (godLink, message) => {
    dispatch({ type: 'ADD_MESSAGE', payload: { godLink, message } });
  };

  const clearMessages = () => {
    dispatch({ type: 'CLEAR_MESSAGES' });
  };

  return (
    <MessageContext.Provider value={{ messages: state.messages, addMessage,clearMessages }}>
      {children}
    </MessageContext.Provider>
  );
};
