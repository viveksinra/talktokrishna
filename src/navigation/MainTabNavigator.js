import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons, Entypo } from "@expo/vector-icons";
import ChatsScreens from "../screens/ChatsScreens";
import DonateScreen from "../screens/DonateScreen";
import SettingScreen from "../screens/SettingScreen";
import {useTranslation} from 'react-i18next';
import LanguageSelector from "../components/SettingComponent/LanguageSelector";
const logoImage = require('../../assets/images/appLogo.png');
import { View,Image,Animated } from "react-native";
import { useEffect } from "react";
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const { t } = useTranslation();
  const buttonOpacity = new Animated.Value(1);
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
    <Tab.Navigator
      initialRouteName="talkToGod" 
      screenOptions={{
        tabBarStyle: { backgroundColor: "whitesmoke" },
        headerStyle: { backgroundColor: "whitesmoke" },
      }}
    >
      <Tab.Screen
        name="Donate"
        component={DonateScreen}
        options={{
          tabBarLabel: t('tab.donate'),
          headerTitle:t('tab.donate'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />

<Tab.Screen
  name="talkToGod"
  component={ChatsScreens}
  options={({ navigation }) => ({
    tabBarLabel: t('tab.chat'),
    tabBarIcon: ({ color, size }) => (
      <Ionicons
        name="ios-chatbubbles-sharp"
        size={size}
        color={color}
      />
    ),
    headerTitle: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* <LanguageSelector showIconOnly={true} /> */}
        <Animated.View style={{ opacity: buttonOpacity }}>
        <Image
          source={logoImage}
          style={{ width: 150, height: 30, marginLeft: 2 }} // Adjust the size and margin as needed
          resizeMode="contain" // Make sure the image fits within the space
        />
              </Animated.View>
     
      </View>
    ),
    headerRight: () => (
      <View style={{ marginRight: 15 }}>
        <LanguageSelector showIconOnly={true} />
      </View>
    ),
  })}
/>


      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarLabel: t('tab.setting'),
          headerTitle:t('tab.setting'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
