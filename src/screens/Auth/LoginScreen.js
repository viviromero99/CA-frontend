import React, {useState, useContext} from 'react';
import { Image, TextInput, StyleSheet, Text, TouchableOpacity, View, Alert, Platform } from 'react-native';
import { AuthContext } from '../../contexts/newAuth';
import { Ionicons } from '@expo/vector-icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { loginUser } from '../../services/authApi';
import api from '../../services/api';

export default function LoginScreen({navigation}){

  //checking if user not already logged in
  const { signIn } = useContext(AuthContext);

  //validation state form
  const [data, setData] = useState({
    cpf: '',
    senha: '',
    checkInputChange: false,
    isValidUser: false,
    isValidPassword: false,
    secureTextEntry: true,
  });
  
  const cpfInputChange = (val) => {
    if( val.length == 11 && !(isNaN(val)) ) {
        setData({
            ...data,
            cpf: val,
            checkInputChange: true,
            isValidUser: true
        });
    } else {
        setData({
            ...data,
            cpf: val,
            checkInputChange: false,
            isValidUser: false
        });
    }
  }

  const handlePasswordChange = (val) => {
    if( val.length >= 8 && val.length <= 16 ) {
      setData({
          ...data,
          senha: val,
          isValidPassword: true
      });
    } else {
      setData({
          ...data,
          senha: val,
          isValidPassword: false
      });
    }
  }

  const updateSecureTextEntry = () => {
    setData({
        ...data,
        secureTextEntry: !data.secureTextEntry
    });
  }

  //Handling Login updating AuthContext
  async function handleLogin(cpf, senha){

    if ( data.isValidUser && data.isValidPassword) {

      try{
        const response = await loginUser(cpf, senha);

        if(response.status == 200){
          api.defaults.headers.common["x-access-token"] = `Bearer ${response.data.accessToken}`;
          const usuario = response.data;
          signIn(usuario);
        }
        else{
          Alert.alert('Erro!', response.data.message, [
            {text: 'Ok'}
          ]);
          return;
        }
  
      }catch(err){
        console.log(err)
        return;
      }

    }else {
      Alert.alert('Erro!', 'Campo(s) de CPF e/ou senha inválido(s).', [
          {text: 'Ok'}
      ]);
      return;
    }
  }

  return(
    <KeyboardAwareScrollView
    resetScrollToCoords={{ x: 0, y: 0 }}
    contentContainerStyle={styles.container}
    scrollEnabled={true}>
      <View style={styles.welcomeContainer}>
        <Image
          source={
            require('../../assets/images/UFFicon.png')
          }
          style={styles.welcomeImage}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputContent}>
          <TextInput
              style = {styles.input}
              placeholder = "   CPF (somente números)"
              placeholderTextColor={"#D1C4E9"}
              onChangeText = {(val) => cpfInputChange(val)}
          />
          {data.checkInputChange ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
        </View>
        {(data.isValidUser || data.cpf === '' || (data.cpf.length == 11 && !isNaN(data.cpf)) ) ? null : <Text style={styles.errorText} >CPF inválido</Text>}

        <View style={styles.inputContent}>
          <TextInput
              style = {styles.input}
              placeholder = "   Senha"
              placeholderTextColor={"#D1C4E9"}
              onChangeText = {val => handlePasswordChange(val)}
              secureTextEntry = {data.secureTextEntry ? true : false}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? 
                  <Ionicons name={Platform.OS === "ios" ? "ios-eye-off": "md-eye-off"} color="#6200EE" size={40}/>
                  :
                  <Ionicons name={Platform.OS === "ios" ? "ios-eye": "md-eye"} color="#6200EE" size={40}/>
            }
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={()=>{navigation.navigate("VerificarEsqueciMinhaSenha")}}>
            <Text style = {styles.helpText}> Esqueceu sua senha? </Text>
        </TouchableOpacity>
      </View>
          <Text>{data.errorMessage}</Text>
      <View>
        <View style={{marginTop: 50, marginBottom: 15}}>
          <TouchableOpacity 
            style = {(data.isValidUser && data.isValidPassword) ? styles.button : styles.buttonDisabled} 
            disabled={!(data.isValidUser && data.isValidPassword)} 
            onPress = {() => {handleLogin(data.cpf, data.senha)}}
          >
              <Text style = {styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.helpContainer}>
          <Text style = {styles.helpText1}>Não é cadastrado?  </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
            <Text style = {styles.helpText2}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginTop: 25,
    marginLeft: -10,
  },
  inputContainer: {
    marginHorizontal: 50,
    marginTop: 45,
  },
  input: {
    backgroundColor: '#fff',
    fontSize: 19,
    height: 45,
    width:250,
    marginRight: 15,
    marginBottom: 15,
    borderColor: '#6200EE',
    borderWidth: 1.3,
    color: '#6200EE',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius:10, 
  },
  helpContainer: {
    marginTop: 15,
    marginBottom: 20,
    alignContent: "center",
    flexDirection: "row",
    marginHorizontal: 70,
  },
  button: {
    height: 50,
    width: 150,
    borderWidth: 0.5,
    backgroundColor: "#6200EE",
    borderColor: "#6200EE",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius:20,
    alignSelf: "center" 
  },
  buttonDisabled: {
    height: 50,
    width: 150,
    borderWidth: 0.5,
    backgroundColor: "#D1C4E9",
    borderColor: "#D1C4E9",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius:20,
    alignSelf: "center" 
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginTop: 12,
  },
  helpText: {
    fontSize: 15,
    color: "#6200EE",
  },
  helpText1: {
    fontSize: 15,
    color: "#6200EE",
    textAlign: "center"
  },
  helpText2: {
    fontSize: 15,
    color: "#03DAC6",
    textAlign: "center",
  },
  errorText:{
    color: "#E30425",
    fontSize: 16,
  },
  inputContent: {
    flexDirection: 'row',
    marginTop: 10,
  },
  });