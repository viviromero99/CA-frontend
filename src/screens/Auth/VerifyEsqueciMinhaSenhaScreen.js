import React, {useState} from 'react';
import { TextInput, StyleSheet, Text, TouchableOpacity, View, Platform, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { checkUser } from '../../services/authApi';


export default function VerifyEsqueciMinhaSenhaScreen({navigation}){

  const [data, setData] = useState({
    cpf: '',
    matricula: '',
    email: '',
    checkCpfChange: false,
    checkMatriculaChange: false,
    checkEmailChange: false,
    isValidCpf: false,
    isValidMatricula: false,
    isValidEmail: false,
  });

  const handleCpfChange = (val) => {
    let reg = /^[0-9]+$/;

    if( val.length == 11 && reg.test(val) === true ) {
      setData({
          ...data,
          cpf: val,
          checkCpfChange: true,
          isValidCpf: true
      });
    } else {
      setData({
          ...data,
          cpf: val,
          checkCpfChange: false,
          isValidCpf: false
      });
    }
  }

  const handleMatriculaChange = (val) => {
    let reg = /^[A-Za-z0-9]*$/;

    if( reg.test(val) === true && val.length>=9 ) {
      setData({
          ...data,
          matricula: val,
          checkMatriculaChange: true,
          isValidMatricula: true
      });
    } else {
      setData({
          ...data,
          matricula: val,
          checkMatriculaChange: false,
          isValidMatricula: false
      });
    }
  }

  const handleEmailChange = (val) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(val) === true) {
      setData({
        ...data,
        email: val,
        checkEmailChange: true,
        isValidEmail: true,
    });
    } else {
      setData({
        ...data,
        email: val,
        checkEmailChange: false,
        isValidEmail: false
      });
    }
  }

  async function handleVerificacao(cpf, matricula, email){

    if ( data.isValidCpf && data.isValidMatricula && data.isValidEmail) {

      try{
        const response = await checkUser(cpf, matricula, email);
        if (response.status == 200){
          navigation.navigate("MudarSenha", {user: response.data})
          return;
        }
        else{
          Alert.alert('Erro!', "Dados de usuário inválidos.", [
            {text: 'Ok'}
          ]);
          return;
        }
  
      }catch(err){
        return;
      }

    }else {
      Alert.alert('Erro!', 'Campo(s) de CPF, Matricula e/ou Email inválido(s).', [
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
          <Ionicons name = {Platform.OS === "ios" ? "ios-person" : "md-person"} size={90} color={"#6200EE"} />
          <Text style={styles.topText}> Informe os dados cadastrados em sua conta para autenticação: </Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputContent}>
              <TextInput
                  style = {styles.input}
                  placeholder = "   CPF  (somente números)"
                  placeholderTextColor="#00a896"
                  onChangeText = {(val) => handleCpfChange(val)}
              />
              {data.checkCpfChange ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
            </View>

            {(data.isValidCpf || data.cpf === '' || (data.cpf.length == 11 && !isNaN(data.cpf)) ) ? null : <Text style={styles.errorText} >CPF inválido</Text>}
            
            <View style={styles.inputContent}>
              <TextInput
                  style = {styles.input}
                  placeholder = "   Matrícula UFF"
                  placeholderTextColor="#00a896"
                  onChangeText = {(val) => handleMatriculaChange(val)}
              />
              {data.checkMatriculaChange ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
            </View>
      
            {(data.isValidMatricula || data.matricula === '' || !isNaN(data.matricula) ) ? null : <Text style={styles.errorText} >Matricula inválida</Text>}
            
            <View style={styles.inputContent}>
              <TextInput
                style = {styles.input}
                placeholder = "   Email iduff"
                placeholderTextColor="#00a896"
                onChangeText = {(val) => handleEmailChange(val)}
              />
              {data.checkEmailChange ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
            </View>
      
            {(data.isValidEmail || data.email === '') ? null : <Text style={styles.errorText} >Email inválido</Text>}
          
          </View>
          <View style={{marginTop: 45, marginBottom: 30}}>
          <TouchableOpacity 
            style = {(data.isValidCpf && data.isValidMatricula && data.isValidEmail) ? styles.button : styles.buttonDisabled} 
            disabled={!(data.isValidCpf && data.isValidMatricula && data.isValidEmail)} 
            onPress={() => handleVerificacao(data.cpf, data.matricula, data.email)}
          >
              <Text style = {styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
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
    marginTop: 30,
    marginBottom: 30
  },
  inputContainer: {
    marginHorizontal: 35,
    marginTop: 25,
    justifyContent: 'space-evenly',
  },
  text: {
    marginBottom: 25,
    fontSize: 20,
    color: "#6200EE",
    alignSelf: "flex-start",
    marginHorizontal: 30,
  },
  input: {
    backgroundColor: '#03DAC5',
    fontSize: 18,
    height: 45,
    width:250,
    marginRight: 15,
    color: "#6200EE",
    marginBottom: 30,
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
    alignSelf: "center",
    justifyContent: "center"
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
    alignSelf: "center",
    justifyContent: 'center',
  },
  buttonText: {
      fontSize: 18,
      color: "#fff",
      textAlign: "center",
  },
  topText:{
    fontSize: 20,
    fontWeight: "300",
    color: "#6200EE",
    marginHorizontal:30,
    marginTop: 25,
  },
  errorText:{
    color: "#E30425",
    fontSize: 16,
  },
  inputContent: {
    flexDirection: 'row',
    marginTop: 10,
  },
})