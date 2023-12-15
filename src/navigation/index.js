import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OneChatScreen from '../screens/OneChatScreen';
import ChatHistoryScreen from '../screens/ChatHistoryScreen';
import MainTabNavigator from './MainTabNavigator';
// import ContactScreen from '../screens/ContactScreen';
import NotImplementedScreen from '../screens/NotImplementedScreen';
import MobileLoginScreen from '../authentication/authScreen/mobileLoginScreen';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MobileLoginScreen} options={{headerShown:false}} />
        {/* <Stack.Screen name="Home" component={MainTabNavigator} options={{headerShown:false}} /> */}
        <Stack.Screen name="OneChats" component={OneChatScreen} />
        <Stack.Screen name="ChatHistoryScreen" component={ChatHistoryScreen} options={{ title: 'Your Chat History' }} />        
        <Stack.Screen name="Contacts" component={NotImplementedScreen} />              
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator