import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import GrandesAreasAlunoScreen from '../../screens/Areas/GrandesAreasAlunoScreen';
import InteressesEmAreasScreen from '../../screens/Areas/InteressesEmAreasScreen';


const IntStack = createStackNavigator();
const INITIAL_ROUTE = 'GrandesAreasAluno';

export default function InteressesStack({navigation}){
    return(
        <IntStack.Navigator initialRouteName={INITIAL_ROUTE}>
            <IntStack.Screen 
            name="GrandesAreasAluno" 
            component={GrandesAreasAlunoScreen}
            options={{
                title: null,
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: '#6200EE'
                },         
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.goBack()}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#fff"/>
                </TouchableOpacity>
            }}
            />
            <IntStack.Screen 
            name="InteressesEmAreas" 
            component={InteressesEmAreasScreen}
            options={{
                title: "Areas",
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: '#6200EE'
                },         
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.navigate('GrandesAreasAluno')}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#fff"/>
                </TouchableOpacity>
            }}
            />
        </IntStack.Navigator>
    )
}