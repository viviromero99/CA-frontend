import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform } from 'react-native';

import TabBarIcon from '../../components/TabBarIcon';
import HomeAlunoScreen from '../../screens/HomeAluno/HomeAlunoScreen';
import HomeInscricoesScreen from '../../screens/HomeAluno/HomeInscricoesScreen';
import HomeSelecoesScreen from '../../screens/HomeAluno/HomeSelecoesScreen';


const ABottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'MenuAluno';

export default function AlunoBottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  //navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <ABottomTab.Navigator 
    initialRouteName={INITIAL_ROUTE_NAME}
    tabBarOptions={{
      activeTintColor: '#6200EE',
    }}>
      <ABottomTab.Screen
        name="MenuAluno"
        component={HomeAlunoScreen}
        options={{
          title: 'Projetos Sugeridos',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name = {Platform.OS === "ios" ? "ios-folder-open" : "md-folder-open"} />,
        }}
      />
      <ABottomTab.Screen
        name="Inscricoes"
        component={HomeInscricoesScreen}
        options={{
          title: 'Inscrições',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name = {Platform.OS === "ios" ? "ios-create" : "md-create"} />,
        }}
      />
      <ABottomTab.Screen
        name="Selecoes"
        component={HomeSelecoesScreen}
        options={{
          title: 'Seleções',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name = {Platform.OS === "ios" ? "ios-checkmark" : "md-checkmark"} />,
        }}
      />
    </ABottomTab.Navigator>
  );
}