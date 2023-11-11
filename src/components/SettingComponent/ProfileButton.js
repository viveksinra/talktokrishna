import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import {useTranslation} from 'react-i18next';

const ProfileButton = ({ onPress }) => {
  const {t} = useTranslation();
  // const imageSource = "https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png";
  const name = "Viivek Singh";
  const status = "No Capacity to hate";
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View> */}
      <View style={styles.profileContainer}>
        <Text style={styles.name}>
        {t('title')}
        </Text>
        <Text style={styles.status}>{t('status')}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    fontSize: 16,
    color: '#888',
  },
});

export default ProfileButton;
