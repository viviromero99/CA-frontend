import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GrandesAreasProjetoScreen from '../../screens/Areas/GrandesAreasProjetoScreen';
import AssuntosEmAreasScreen from '../../screens/Areas/AssuntosEmAreasScreen';

const AssStack = createStackNavigator();
const INITIAL_ROUTE = 'GrandesAreasProjeto';

export default function AssuntosStack({navigation}){
    return(
        <AssStack.Navigator initialRouteName={INITIAL_ROUTE}>
            <AssStack.Screen 
            name="GrandesAreasProjeto" 
            component={GrandesAreasProjetoScreen}
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
            <AssStack.Screen 
            name="AssuntosEmAreas" 
            component={AssuntosEmAreasScreen}
            options={{
                title: "Assuntos",
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: '#6200EE'
                },         
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.navigate('GrandesAreasProjeto')}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#fff"/>
                </TouchableOpacity>
            }}
            />
        </AssStack.Navigator>
    )
}