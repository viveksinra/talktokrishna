import React, { useEffect, useContext } from 'react';
import { View, TouchableOpacity, Animated, Image, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import Message from '../components/Message';
import InputBox from '../components/InputBox';
import { MessageContext } from './../../src/components/Message/MessageProvider';

import bg from '../../assets/images/BG.webp';

const OneChatScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const buttonOpacity = new Animated.Value(1);
  const donateButtonImage = 'https://res.cloudinary.com/dncukhilq/image/upload/v1683721708/talktogod/imageUsedInApp/Donate_Button-_umdown.png';
  const { messages } = useContext(MessageContext);
  const godLink = route.params.link;
  const chatId = route.params.chatId;
  const question = route.params.question;
  const isRec = route.params.isRec;
  

  const handleDonatePress = () => {
    navigation.navigate('Donate');
  };


  useEffect(() => {
    navigation.setOptions({
      title: route.params.name,
      headerTitleStyle: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: -20,
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 5, marginRight: 5, flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="ios-arrow-back" size={24} color="black" style={{ marginRight: 5 }} />
          <Image
            source={{ uri: route.params.image }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleDonatePress}
          style={{ marginRight: 10 }}
        >
          <Animated.View style={{ opacity: buttonOpacity }}>
            <Image
              source={{ uri: donateButtonImage }}
              style={{ width: 85, height: 25, marginLeft: 10 }}
            />
          </Animated.View>
        </TouchableOpacity>
      ),
    });
  }, [navigation, route.params.name, route.params.image]);

  useEffect(() => {
    const animateButton = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(buttonOpacity, {
            toValue: 0.5,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(buttonOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateButton();

    return () => {
      buttonOpacity.stopAnimation();
    };
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.background}>
        <FlatList
          data={messages[chatId]}
          renderItem={({ item }) => <Message message={item} key={item.id} />}
          keyExtractor={(item) => item.id}
          style={styles.list}
          inverted
        />
        <InputBox godLink={godLink} chatId={chatId} question={question} isRec={isRec} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});

export default OneChatScreen;
