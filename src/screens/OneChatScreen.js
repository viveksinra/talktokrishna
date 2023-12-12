import React, { useEffect, useState, useContext } from 'react';
import { View, TouchableOpacity, Animated, Image, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import Message from '../components/Message';
import InputBox from '../components/InputBox';
import { MessageContext } from './../../src/components/Message/MessageProvider';

import defaultBg from '../../assets/images/BG.webp';

const manyImg = [
  { uri: "https://th.bing.com/th/id/OIG.7.JpZdNFct0U0EMwJD1E?pid=ImgGn" },
  { uri: "https://th.bing.com/th/id/OIG.U2olPAWW1Flr1wG1XhXe?pid=ImgGn" },
  { uri: "https://th.bing.com/th/id/OIG.H1exfMsQBnVj_fLIvAav?pid=ImgGn" },
  { uri: "https://th.bing.com/th/id/OIG.Qz4T04WEdL0Yw979MNwo?pid=ImgGn" },
  { uri: "https://th.bing.com/th/id/OIG.VRAQU63iBLjf9W77gVRJ?pid=ImgGn" },
  { uri: "https://th.bing.com/th/id/OIG.HeDdcMler38MK7RYReiT?pid=ImgGn" },
  { uri: "https://th.bing.com/th/id/OIG.95i6XaOtwNFA8NgE.gps?pid=ImgGn" },
  { uri: "https://th.bing.com/th/id/OIG.TwKa0CBHpCAib5k1tiK7?pid=ImgGn" },
  { uri: "https://i.pinimg.com/originals/2f/53/cb/2f53cbf3699aff9176cf30dae34c363e.jpg" },
  { uri: "https://pm1.narvii.com/7607/991bf58cc718ca5921c4685101c4697e7c6694d0r1-595-804v2_hq.jpg" },
  { uri: "https://s-media-cache-ak0.pinimg.com/736x/42/b6/32/42b632665bdd7711af471c4eccd06c4b--hindu-deities-hinduism.jpg" },
  { uri: "https://i.pinimg.com/originals/a3/86/fe/a386fe7332efd17377682adace8b8381.jpg" },
  { uri: "https://i.pinimg.com/736x/b4/28/ad/b428ad0e9b0506ec59c722c02d2e3a04--krishna-art-hindu.jpg" },
  { uri: "https://th.bing.com/th/id/OIG.RqIuIYMA_Z_oee._Rq1O?pid=ImgGn" },
  { uri: "https://th.bing.com/th/id/OIG.P.umNV12i1Nj5rzpqcfw?pid=ImgGn" },
  { uri: "https://th.bing.com/th/id/OIG.FpySaM_U2pbi9Gm2Jx_r?pid=ImgGn" },
  { uri: "https://th.bing.com/th/id/OIG.WGqidT0Eom.6_Q4alj0_?pid=ImgGn" },
];

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
  const isHistory = route.params.isHistory;
  const [bg, setBg] = useState(defaultBg);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * manyImg.length);
    setBg(manyImg[randomIndex]);
  }, []);

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
          onPress={() => navigation.navigate('Donate')}
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
        <InputBox godLink={godLink} chatId={chatId} question={question} isRec={isRec} isHistory={isHistory} />
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
