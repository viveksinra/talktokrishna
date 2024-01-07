import React from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ContentContext from '../../Context/ContentContext';
const image = { uri: ContentContext.chatHisBag };
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const NoChatHistory = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleStartChat = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.noChatText}>{t('chatHis.two')}</Text>
          <TouchableOpacity style={styles.refreshButton} onPress={handleStartChat}>
            <FontAwesome name="comments" size={24} color="white" />
            <Text style={styles.buttonText}>{t('chatHis.three')}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  noChatText: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
  },
});

export default NoChatHistory;
