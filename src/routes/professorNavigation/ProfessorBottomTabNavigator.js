import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform } from 'react-native';

import TabBarIcon from '../../components/TabBarIcon';
import HomeProfessorScreen from '../../screens/HomeProfessor/HomeProfessorScreen';
import FechadosScreen from '../../screens/HomeProfessor/HomeClosedProjetosScreen';


const PBottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'MenuProf';

export default function ProfessorBottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  //navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <PBottomTab.Navigator 
    initialRouteName={INITIAL_ROUTE_NAME}
    tabBarOptions={{
      activeTintColor: '#6200EE',
    }}>
      <PBottomTab.Screen
        name="MenuProf"
        component={HomeProfessorScreen}
        options={{
          title: 'Projetos Abertos',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name = {Platform.OS === "ios" ? "ios-book" : "md-book"} />,
        }}
      />
      <PBottomTab.Screen
        name="Fechados"
        component={FechadosScreen}
        options={{
          title: 'Projetos Fechados',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name = {Platform.OS === "ios" ? "ios-folder" : "md-folder"} />,
        }}
      />
    </PBottomTab.Navigator>
  );
}