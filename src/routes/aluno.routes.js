import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import InteressesStack from './alunoNavigation/InteressesStack';
import InscricaoStack from './alunoNavigation/InscricaoStack';
import AlunoDrawerStack from './alunoNavigation/AlunoDrawerStack';

const alunoNavigator = createStackNavigator();

export default function AlunoNavigator({props}){
    return(
        
        <alunoNavigator.Navigator>
            <alunoNavigator.Screen 
            name="AlunoDrawer" 
            component={AlunoDrawerStack}
            options={{ 
                title: "Home",
                headerShown: false }}
            />
            <alunoNavigator.Screen 
            name="Interesses" 
            component={InteressesStack}
            options={{ headerShown: false }}
            />
            <alunoNavigator.Screen 
            name="Inscricao" 
            component={InscricaoStack}
            options={{ headerShown: false }}
            />
        </alunoNavigator.Navigator>
    );
}