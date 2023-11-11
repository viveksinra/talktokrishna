import 'intl-pluralrules';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './src/navigation';
import i18n from './src/lan/i18n'
import { MessageProvider } from './src/components/Message/MessageProvider';

export default function App() {
  return (
    <MessageProvider>
    <View style={styles.container}>
      {/* <ChatsScreens /> */}
      {/* <OneChatScreen /> */}
      <Navigator />
      <StatusBar style="auto" />
    </View>
    </MessageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
