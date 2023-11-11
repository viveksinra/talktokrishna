import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const defaultGodImg = require('./../../../assets/icon.png');

const ChatListItem = ({ chat }) => {
  const navigation = useNavigation();
  const [imageLoadError, setImageLoadError] = useState(false);

  if (!chat || typeof chat !== 'object' || !chat.user) {
    console.log('Invalid chat object:', chat);
    return null;
  }

  const handleImageError = () => {
    setImageLoadError(true);
  };

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('OneChats', {
          id: chat.id,
          name: chat.user.name,
          image: chat.user.image,
          link: chat.user.link,
        })
      }
      style={styles.container}
    >
      <Image
        source={imageLoadError ? defaultGodImg : { uri: chat.user.image }}
        onError={handleImageError}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.name}>
            {chat.user.name}
          </Text>
          <Text style={styles.subTitle}>
            {dayjs(chat.lastMessage.createdAt).fromNow(true)}
          </Text>
        </View>
        <Text numberOfLines={2} style={styles.subTitle}>
          {chat.user.status}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        marginHorizontal:10,
        marginVertical:5,
        height:70,
    },
    image:{
        width:60,
        height:60,
        borderRadius:30,
        marginRight:10,
    },
    content:{
        flex:1,
        borderBottomColor:'lightgray',
        borderBottomWidth:StyleSheet.hairlineWidth
    },
    row:{
        flexDirection:'row'
    },
name:{
    flex: 1,
    fontWeight: 'bold',
    fontSize: 20, // Increase the font size as desired
},
subTitle:{
    color: 'gray',
    fontSize: 16, // Increase the font size as desired
},
});

export default ChatListItem;