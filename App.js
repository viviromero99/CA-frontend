import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import React, { useContext, useReducer, useMemo, useEffect, useState } from 'react';
import api from './src/services/api';
import { AuthContext } from './src/contexts/newAuth';
import {View, ActivityIndicator, StyleSheet} from 'react-native'

import AuthStack from './src/routes/auth.routes';
import AlunoNavigator from './src/routes/aluno.routes';
import ProfessorNavigator from './src/routes/professor.routes';
import { refreshSession, verifyToken } from './src/services/authApi';


export default function App() {
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
      case 'REFRESH': 
          return {
          token: action.accessToken,
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
                await AsyncStorage.setItem('@CAAuth:refresh', user.refreshToken);
                
                dispatch({ type: 'LOGIN', cpf: user.cpf, usuarioTipo: user.usuarioTipo, accessToken: user.accessToken });
              }else{
                  console.log(user);
              }
          }catch(e){
              console.log(e);
          }
      },
      getUser: async () => {
        try{

          const storedUser = await AsyncStorage.getItem('@CAAuth:user');
          return storedUser;

        }catch(e){
          console.log(e);
        }
      },
      checkSession: async (storedUser) => {
        
        try{
          if(storedUser === null){
            await AsyncStorage.removeItem('@CAAuth:user');
            await AsyncStorage.removeItem('@CAAuth:token');
            await AsyncStorage.removeItem('@CAAuth:type');
            await AsyncStorage.removeItem('@CAAuth:refresh');
            
            dispatch({ type: 'LOGOUT' });
            return;
          }

          const response = await verifyToken(storedUser);

          if (response.status == 403 || response.status == 401){

            const refreshStoredToken = await AsyncStorage.getItem('@CAAuth:refresh');
            api.defaults.headers.common["x-access-token"] = `Bearer ${refreshStoredToken}`;
            const results = await refreshSession(storedUser);
            
            console.log(results.data)
            if (results.status >= 400){
              await AsyncStorage.removeItem('@CAAuth:user');
              await AsyncStorage.removeItem('@CAAuth:token');
              await AsyncStorage.removeItem('@CAAuth:type');
              await AsyncStorage.removeItem('@CAAuth:refresh');
              
              dispatch({ type: 'LOGOUT' });
              return;
            }

            const storedToken = results.data.accessToken;

            await AsyncStorage.setItem('@CAAuth:token', storedToken);
            api.defaults.headers.common["x-access-token"] = `Bearer ${storedToken}`;

          }
          else if (response.status >= 400) {
            await AsyncStorage.removeItem('@CAAuth:user');
            await AsyncStorage.removeItem('@CAAuth:token');
            await AsyncStorage.removeItem('@CAAuth:type');
            await AsyncStorage.removeItem('@CAAuth:refresh');
            
            dispatch({ type: 'LOGOUT' });
            return;

          }
          return;

        }catch(e){
          console.log(e);
        }
      },
      getToken: async () => {
        try{

          const storedToken = await AsyncStorage.getItem('@CAAuth:token');
          return storedToken;

        }catch(e){
          console.log(e);
        }
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

      if (storedUser && storedToken && storedTipo) {

        api.defaults.headers.common["x-access-token"] = `Bearer ${storedToken}`;

        const response = await verifyToken(storedUser);

        if (response.status == 403 || response.status == 401){

          const refreshStoredToken = await AsyncStorage.getItem('@CAAuth:refresh');
          api.defaults.headers.common["x-access-token"] = `Bearer ${refreshStoredToken}`;
          const results = await refreshSession(storedUser);
          
          if (results.status >= 400){
            await AsyncStorage.removeItem('@CAAuth:user');
            await AsyncStorage.removeItem('@CAAuth:token');
            await AsyncStorage.removeItem('@CAAuth:type');
            await AsyncStorage.removeItem('@CAAuth:refresh');
            
            dispatch({ type: 'LOGOUT' });
            return;
          }

          storedToken = results.data.accessToken;

          await AsyncStorage.setItem('@CAAuth:token', storedToken);
        }

        api.defaults.headers.common["x-access-token"] = `Bearer ${storedToken}`;
      }

    }catch(e){
      console.log(e);
    }
      
    dispatch({ type: 'LOGIN', cpf: storedUser, usuarioTipo: storedTipo, accessToken: storedToken});
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
