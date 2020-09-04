import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from '../screens/Auth/LoginScreen';
import MainSignInScreen from '../screens/Auth/MainSignInScreen';
import VerifyEsqueciMinhaSenhaScreen from '../screens/Auth/VerifyEsqueciMinhaSenhaScreen';
import MudarSenhaScreen from '../screens/Auth/MudarSenhaScreen';
import StudentSignInScreen from '../screens/Auth/StudentSignInScreen';
import ProfessorSignInScreen from '../screens/Auth/ProfessorSignInScreen';

const authStack = createStackNavigator();
const INITIAL_ROUTE = 'Login';

export default function AuthStack({navigation}){
    return(
        <authStack.Navigator initialRouteName={INITIAL_ROUTE}>
            <authStack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
            />
            
            <authStack.Screen 
            name="VerificarEsqueciMinhaSenha" 
            component={VerifyEsqueciMinhaSenhaScreen}
            options={({ navigation}) => ({ 
                headerTitle: null,
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => navigation.goBack()}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#6200EE"/>
                </TouchableOpacity>
            })}
            />

            <authStack.Screen 
            name="MudarSenha" 
            component={MudarSenhaScreen}
            options={({ navigation}) => ({ 
                headerTitle: null,
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => navigation.goBack()}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#6200EE"/>
                </TouchableOpacity>
            })}
            />

            <authStack.Screen 
            name="Cadastro" 
            component={MainSignInScreen}
            options={({ navigation}) => ({ 
                headerTitle: null,
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => navigation.goBack()}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#6200EE"/>
                </TouchableOpacity>
            })}
            />

            <authStack.Screen 
            name="CadastroAluno" 
            component={StudentSignInScreen}
            options={({ navigation}) => ({
                headerTitle: "Novo Aluno",
                headerTintColor: "#6200EE",
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => navigation.goBack()}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#6200EE"/>
                </TouchableOpacity>
            })}
            />

            <authStack.Screen 
            name="CadastroProfessor" 
            component={ProfessorSignInScreen}
            options={({ navigation}) => ({
                headerTitle: "Novo Professor",
                headerTintColor: "#6200EE",
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => navigation.goBack()}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#6200EE"/>
                </TouchableOpacity>
            })}
            />

        </authStack.Navigator>
    )
}