import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons, Entypo } from "@expo/vector-icons";
import ChatsScreens from "../screens/ChatsScreens";
import DonateScreen from "../screens/DonateScreen";
import SettingScreen from "../screens/SettingScreen";
import {useTranslation} from 'react-i18next';
import LanguageSelector from "../components/SettingComponent/LanguageSelector";
import { View,Image,Animated } from "react-native";
import { useEffect } from "react";
import MainHeader from "./component/mainHeader";
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const { t } = useTranslation();

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
        name="logo-wechat"
        size={size}
        color={color}
      />
    ),
    headerTitle: () => (
      <MainHeader  />
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
