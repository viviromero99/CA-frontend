import React, {useState} from 'react';
import { TextInput, StyleSheet, Text, TouchableOpacity, View, Platform, Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import api from '../../services/api';
import { updateUser } from '../../services/userApi';



export default function MudarSenhaScreen({navigation, route}){

  const { user } = route.params;

  const [data, setData] = useState({
    senha: '',
    confirmarSenha: '',
    checkSenha: false,
    isValidPassword: false,
    secureTextEntry: true
  });

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

  const updateSecureTextEntry = () => {
    setData({
        ...data,
        secureTextEntry: !data.secureTextEntry
    });
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

  const handleUserUpdate = async () => {

    if(data.isValidPassword && data.checkSenha){

      api.defaults.headers.common["x-access-token"] = `Bearer ${user.accessToken}`;

      let update = {senha: data.senha};

      try{
        const response = await updateUser(user.cpf, update);

        if (response.status == 200){
          Alert.alert('Sucesso!', 'Senha atualizada com sucesso', [
            {
              text: 'Ok',
              onPress: () => navigation.navigate("Login")
            }
          ]);
          return;
        }else{
          Alert.alert('Erro!', "Não foi possível atualizar senha", [
            {
              text: 'Ok'
            }
          ]);
        }

      }catch(err){
        console.log(err);
      }

    }else{
      Alert.alert('Erro!', 'Senha inválida.', [
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
          </View>
          <ScrollView>
            <View style={styles.inputContainer}>
              <Text style = {styles.text}>{user.nome}</Text>
              <Text style = {styles.text}>CPF:   {user.cpf}</Text>
              <Text style = {styles.text}>Matrícula:   {user.matricula}</Text>
              <Text style = {styles.text}>{user.email}</Text>
            </View>
            <View style={styles.senhaInputContainer}>
              <View style={styles.inputContent}>
                <TextInput
                    style = {styles.input}
                    placeholder = "   Nova senha"
                    placeholderTextColor="#00a896"
                    secureTextEntry = {data.secureTextEntry ? true : false}
                    onChangeText = {(val) => handlePasswordChange(val)}
                />

                <TouchableOpacity onPress={updateSecureTextEntry}>
                  {data.secureTextEntry ? 
                        <Ionicons name={Platform.OS === "ios" ? "ios-eye-off": "md-eye-off"} color="#6200EE" size={40}/>
                        :
                        <Ionicons name={Platform.OS === "ios" ? "ios-eye": "md-eye"} color="#6200EE" size={40}/>
                  }
                </TouchableOpacity>
              </View>

              {(data.isValidPassword || data.senha === '' || (data.senha.length >= 8 && data.senha.length<=16)) ? null : <Text style={styles.errorText}>Senha precisa ter no mínimo 8 dígitos e no máximo 16 dígitos</Text>}
            
              <View style={styles.inputContent}>
                <TextInput
                    style = {styles.input}
                    placeholder = "   Confirmar Nova senha"
                    placeholderTextColor="#00a896"
                    secureTextEntry = {true}
                    onChangeText = {(val) => confirmPasswordChange(val)}
                />
                {data.checkSenha ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
              </View>

              {(data.confirmarSenha === data.senha) ? null : <Text style={styles.errorText} >Senha incompatível</Text>}
            </View>
          </ScrollView>
          <View style={{marginTop: 15, marginBottom: 30}}>
          <TouchableOpacity 
            style = {(data.isValidPassword && data.checkSenha) ? styles.button : styles.buttonDisabled} 
            disabled={!(data.isValidPassword && data.checkSenha)} 
            onPress={() => handleUserUpdate()}
          >
              <Text style = {styles.buttonText}> Confirmar </Text>
          </TouchableOpacity>
          </View>
      </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    alignSelf: "center"
  },
  input: {
    backgroundColor: '#03DAC5',
    fontSize: 18,
    height: 45,
    width: 250,
    marginRight: 15,
    color: "#6200EE",
    marginBottom: 20,
  },
  senhaInputContainer: {
    marginHorizontal: 30,
    justifyContent: 'space-evenly',
    marginBottom: 10,
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
  errorText:{
    color: "#E30425",
    fontSize: 16,
  },
  inputContent: {
    flexDirection: 'row',
    marginTop: 10,
  },
})