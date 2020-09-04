import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import ProfessorDrawerStack from './professorNavigation/ProfessorDrawerStack';
import ProjetoStack from './professorNavigation/ProjetoStack';
import AssuntosStack from './professorNavigation/AssuntosStack'

const professorNavigator = createStackNavigator();

export default function ProfessorNavigator({navigation}){
    return(
        <professorNavigator.Navigator>
            <professorNavigator.Screen 
            name="ProfessorDrawer" 
            component={ProfessorDrawerStack}
            options={{ 
                title: "Home",
                headerShown: false }}
            />
            <professorNavigator.Screen 
            name="Assuntos" 
            component={AssuntosStack}
            options={{ headerShown: false }}
            />
            <professorNavigator.Screen 
            name="Projeto" 
            component={ProjetoStack}
            options={{ headerShown: false }}
            />
        </professorNavigator.Navigator>
    );
}