import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import React, { useContext, useReducer, useMemo, useEffect, useState } from 'react';
import api, {setUserToken, loginUser} from './services/userApi';
import { AuthContext } from './contexts/newAuth';
import {View, ActivityIndicator, Alert} from 'react-native'

import AuthStack from './routes/auth.routes';
import AlunoNavigator from './routes/aluno.routes';
import ProfessorNavigator from './routes/professor.routes';


export default function MainNavigator(){
    const initialLoginState = {
        isLoading: true,
        cpf: null,
        tipo: null,
        token: null,
    };

    const loginReducer = (prevState, action) => {
        switch( action.type ) {
            case 'LOGIN': 
                return {
                ...prevState,
                cpf: action.cpf,
                tipo: action.usuarioTipo,
                token: action.accessToken,
                isLoading: false,
                };
            case 'LOGOUT': 
                return {
                ...prevState,
                cpf: null,
                token: null,
                tipo: null,
                isLoading: false,
                };
            case 'CADASTRO': 
                return {
                ...prevState,
                cpf: action.cpf,
                tipo: action.usuarioTipo,
                isLoading: false,
                };
        }
    };

    const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

    const authContext = useMemo(() => ({
        signIn: async(user) => {
            try {
                if (user !== null){
        
                    await AsyncStorage.setItem('@CAAuth:user', user.cpf);
                    await AsyncStorage.setItem('@CAAuth:token', user.accessToken);
                    await AsyncStorage.setItem('@CAAuth:type', user.usuarioTipo);
                    
                    dispatch({ type: 'LOGIN', cpf: user.cpf, usuarioTipo: user.usuarioTipo, accessToken: user.accessToken });
                }else{
                    console.log(user);
                }
            }catch(e){
                console.log(e);
            }
        },
        signOut: async() => {
          // setUserToken(null);
          // setIsLoading(false);
          try {
            await AsyncStorage.removeItem('@CAAuth:user');
            await AsyncStorage.removeItem('@CAAuth:token');
            await AsyncStorage.removeItem('@CAAuth:type');
            console.log(loginState);
            dispatch({ type: 'LOGOUT' });
          } catch(e) {
            console.log(e);
          }
        },
        getUser: () => {

            return loginState.cpf
        },
    }), []);

    async function getStoredInfo(){
        let storedUser;
        let storedToken;
        let storedTipo;

        storedUser = null;
        storedToken = null;
        storedTipo = null;

        try {
            storedUser = await AsyncStorage.getItem('@CAAuth:user');
            storedToken = await AsyncStorage.getItem('@CAAuth:token');
            storedTipo = await AsyncStorage.getItem('@CAAuth:type');

        }catch(e){
            console.log(e);
        }

        if (storedUser && storedToken && storedTipo) {

            api.defaults.headers.common["x-access-token"] = `Bearer ${storedToken}`;
            dispatch({ type: 'LOGIN', cpf: storedUser, usuarioTipo: storedTipo, accessToken: storedToken});
        }
        else{
            console.log('ERROOOO');
        }
    }

    useEffect(() => {

        getStoredInfo();

    }, [loginState]);

    if (loginState.isLoading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size='large' color={"#6200EE"}/>
            </View>
        );
    } 
    return(
        <NavigationContainer>
            <AuthContext.Provider value={authContext}>
            {(loginState.token === null || loginState.cpf === null) ? <AuthStack /> : (loginState.tipo === "aluno" ? <AlunoNavigator/> : <ProfessorNavigator/>)}
            </AuthContext.Provider>
        </NavigationContainer>
    )
}