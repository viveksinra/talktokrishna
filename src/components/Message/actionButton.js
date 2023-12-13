import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ActionButton = () => {
  return (
    <View style={{ flexDirection: 'row', margin: 10, marginBottom:0}}>
      <IconButton name="copy-outline" onPress={handleCopy} />
      <IconButton name="refresh-outline" onPress={handleRefresh} />
      <IconButton name="share-social" onPress={handleShare} />
      {/* <DonateButton /> */}
    </View>
  );
};

const IconButton = ({ name, onPress }) => (
  <TouchableOpacity style={styles.iconButton} onPress={onPress}>
    <Ionicons name={name} size={20} color="black" style={styles.icon} />
  </TouchableOpacity>
);

const DonateButton = () => (
  <TouchableOpacity style={styles.donateButton} onPress={handleDonate}>
    <Ionicons name="cash-outline" size={20} color="black" style={styles.icon} />
    <Text style={styles.donateText}>Donate</Text>
  </TouchableOpacity>
);

const handleCopy = () => {
  // Sample function for copy button
  console.log('Copy button clicked');
};

const handleRefresh = () => {
  // Sample function for refresh button
  console.log('Refresh button clicked');
};

const handleShare = () => {
  // Sample function for share button
  console.log('Share button clicked');
};

const handleDonate = () => {
  // Sample function for donate button
  console.log('Donate button clicked');
};

const styles = {
  iconButton: {
    padding: 5,
  },
  donateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue', // Change this to your desired color
    padding: 5,
    borderRadius: 5,
  },
  donateText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 14,
  },
  icon: {
    marginRight: 5,
  },
};

export default ActionButton;
