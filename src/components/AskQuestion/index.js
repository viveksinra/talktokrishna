import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


function AskQuestForm({handleAskQuestion,handleRecQuestion}) {
  const [question, setQuestion] = useState("");
  const navigation = useNavigation();

  function handleShowChatHistory() {
    navigation.navigate('ChatHistoryScreen');
  }
  return (
    <View style={styles.container}>
  
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type Your Question here"
          value={question}
          onChangeText={(text) => setQuestion(text)}
        />
        {!question ? (
          <TouchableOpacity style={styles.startButton} onPress={() => {handleRecQuestion(),setQuestion("")}}>
            <MaterialIcons name="mic" size={35} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.sendButton} onPress={() => {handleAskQuestion(question),setQuestion("")}}>
            <MaterialIcons name="send" size={35} color="white" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.buttonGrp}>
      <TouchableOpacity style={styles.askButton} onPress={() => {handleAskQuestion(question),setQuestion("")}}>
        <Text style={styles.askButtonText}>Ask Question</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.chatHistory} onPress={() => {handleShowChatHistory()}}>
      <View style={styles.iconContainer}>
    <MaterialIcons name="history" size={24} color="white" style={styles.icon} />
    <Text style={styles.askButtonText}>Chat History</Text>
  </View>
      </TouchableOpacity>
      </View>
    </View>
  );
}

export default AskQuestForm;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    marginBottom: 2,
  },
  headerText: {
    color: '#00BFFF',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
  },
  highlightText: {
    color: '#34d399',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  buttonGrp: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    fontSize: 20,
    flex: 1,
    borderColor:'green',
    borderWidth: 2,
    marginRight: 5, // Add some margin to the right of the text input
  },
  startButton: {
    backgroundColor: 'green',
    marginBottom:18,
    padding: 7, // Adjust padding to match the height of the text input
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    backgroundColor: 'blue',
    marginBottom:18,
    padding: 7, // Adjust padding to match the height of the text input
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  askButton: {
    backgroundColor: 'purple',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    width: '100%',
    marginRight: 10,
  },
  chatHistory: {
    backgroundColor: 'grey',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    width: '100%',
    marginLeft: 10,
  },
  askButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  icon: {
    marginRight: 5,
  },
});
