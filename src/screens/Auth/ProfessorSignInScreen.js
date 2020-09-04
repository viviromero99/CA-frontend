import React, {useState} from 'react';
import {TextInput, StyleSheet, Text, TouchableOpacity, View, Alert, Platform} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { registrarUser } from '../../services/authApi';


export default function StudentSignInScreen({navigation}){

  const [data, setData] = useState({
    nome: '',
    cpf: '',
    matricula: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    checkNomeChange: false,
    checkCpfChange: false,
    checkMatriculaChange: false,
    checkEmailChange: false,
    checkSenha: false,
    isValidName: false,
    isValidCpf: false,
    isValidMatricula: false,
    isValidEmail: false,
    isValidPassword: false,
  });

  const handleNomeChange = (val) => {
    let reg = /^([A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+\s)*[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/;

    if(reg.test(val) === true) {
      setData({
        ...data,
        nome: val,
        checkNomeChange: true,
        isValidName: true,
    });
    } else {
      setData({
          ...data,
          nome: val,
          checkNomeChange: false,
          isValidName: false
      });
    }
  }

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
    let reg = /^[A-Za-z0-9]+$/;

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

  const handlePasswordChange = (val) => {

    if( val.length >= 8 && data.senha.length<=16) {
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

  const confirmPasswordChange = (val) => {

    if( data.isValidPassword && val == data.senha) {
      setData({
          ...data,
          confirmarSenha: val,
          checkSenha: true
      });
    } else {
      setData({
          ...data,
          confirmarSenha: val,
          checkSenha: false
      });
    }
  }

  async function handleCadastro(nome, cpf, matricula, email, senha){

    if (data.isValidName && data.isValidCpf && data.isValidMatricula && data.isValidEmail && data.isValidPassword && data.checkSenha) {
  
      const tipo = "professor";

      try{
        const response = await registrarUser(nome, cpf, matricula, email, senha, tipo);

        if (response.status == 200){
          Alert.alert('Usuário cadastrado!', 'Conta criada com sucesso', [
            {
              text: 'Ok',
              onPress: () => navigation.navigate("Login")
            }
          ]);
          return;
        }else{
          Alert.alert('Erro!', response.data.message, [
            {
              text: 'Ok'
            }
          ]);
          return;
        }
  
      }catch(err){
        return;
      }

    }else {
      Alert.alert('Erro!', 'Campo(s) de Nome, CPF, Matrícula, Email ou senha inválido(s).', [
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
        <Ionicons name = {Platform.OS === "ios" ? "ios-person" : "md-person"} size={100} color={"#6200EE"} />
      </View>
      <ScrollView>
        <View style={styles.inputContainer}>

          <View style={styles.inputContent}>
            <TextInput
                style = {styles.input}
                placeholder = "   Nome Completo"
                placeholderTextColor="#00a896"
                onChangeText = {(val) => handleNomeChange(val)}
            />
            {data.checkNomeChange ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
          </View>

          {(data.isValidName || data.nome === '' ) ? null : <Text style={styles.errorText} >Nome inválido</Text>}
          
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
          
          <View style={styles.inputContent}>
            <TextInput
                style = {styles.input}
                placeholder = "   Senha"
                secureTextEntry = {true}
                placeholderTextColor="#00a896"
                onChangeText = {(val) => handlePasswordChange(val)}
            />
            {data.checkSenha ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
          </View>

          {(data.isValidPassword || data.senha === '' || (data.senha.length >= 8 && data.senha.length<=16)) ? null : <Text style={styles.errorText}>Senha precisa ter no mínimo 8 dígitos e no máximo 16 dígitos</Text>}
          
          <View style={styles.inputContent}>
            <TextInput
                style = {styles.input}
                placeholder = "   Confirmar Senha"
                secureTextEntry = {true}
                placeholderTextColor="#00a896"
                onChangeText = {(val) => confirmPasswordChange(val)}
            />
            {data.checkSenha ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
          </View>

          {(data.confirmarSenha === data.senha) ? null : <Text style={styles.errorText} >Senha incompatível</Text>}

        </View>
      </ScrollView>
      <View style={{marginTop: 15, marginBottom: 25}}>
        <TouchableOpacity 
          style = {(data.isValidName && data.isValidCpf && data.isValidMatricula && data.isValidEmail && data.isValidPassword && data.checkSenha) ? styles.button : styles.buttonDisabled} 
          disabled={!(data.isValidName && data.isValidCpf && data.isValidMatricula && data.isValidEmail && data.isValidPassword && data.checkSenha)} 
          onPress={() => handleCadastro(data.nome, data.cpf, data.matricula, data.email, data.senha, navigation)}
        >
          <Text style = {styles.buttonText}>Confirmar</Text>
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
  },
  inputContainer: {
    marginHorizontal: 55,
    marginTop: 25,
    justifyContent: 'space-evenly',
  },
  text: {
    marginBottom: 25,
    fontSize: 20,
    color: "#6200EE",
    alignSelf: "flex-start"
  },
  input: {
    backgroundColor: '#03DAC6',
    fontSize: 18,
    marginRight: 15,
    height: 45,
    width: 250,
    color: "#6200EE",
    marginBottom: 20,
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
    justifyContent: 'center',
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
      textAlign: "center"
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