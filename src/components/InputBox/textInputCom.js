import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const TextInputCom = ({newMessage,setNewMessage}) => {

    const { t } = useTranslation();
    return(
        <>
    <TextInput
    value={newMessage}
    onChangeText={setNewMessage}
    placeholder={t('input.placeholder')}
    style={styles.input}onSend
  />
  </>
  );
};

const styles = StyleSheet.create({

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
   
  });

export default TextInputCom;