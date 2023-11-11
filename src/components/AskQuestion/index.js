import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import SampleQuestion from '../SampleQuestion';

function AskQuestForm() {
  const [question, setQuestion] = useState("");

  return (
    <View style={{  width: '100%', borderRadius: 10, padding: 10, marginBottom: 2 }}>
          <Text style={{ color: '#00BFFF', fontWeight: 'bold', fontSize: 20, marginBottom: 15 }}>
          ASK  {''}
    <Text style={{ color: '#34d399', fontWeight: 'bold' }}>
    Divine Krishna
    </Text>
    {' your Questions:-'}
</Text>
      <TextInput
        style={{ backgroundColor: '#fff', borderRadius: 10, 
        padding: 20, marginBottom: 15, borderWidth: 1,
         borderColor: '#000',fontSize: 20, }}
        placeholder="Type Your Question here"
        value={question}
        onChangeText={(text) => setQuestion(text)}
      />
      <TouchableOpacity style={{ backgroundColor: 'purple', borderRadius: 5, padding: 10, alignItems: 'center', width: '100%' }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Ask Question</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AskQuestForm;
