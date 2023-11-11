import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OneChatScreen from '../screens/OneChatScreen';
import ChatsScreens from '../screens/ChatsScreens';
import MainTabNavigator from './MainTabNavigator';
// import ContactScreen from '../screens/ContactScreen';
import NotImplementedScreen from '../screens/NotImplementedScreen';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MainTabNavigator} options={{headerShown:false}} />
        <Stack.Screen name="OneChats" component={OneChatScreen} />
        
        <Stack.Screen name="Contacts" component={NotImplementedScreen} />
        
        
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator