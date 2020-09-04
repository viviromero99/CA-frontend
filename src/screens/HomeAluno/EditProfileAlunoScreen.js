import React, {useState, useContext, useEffect} from 'react';
import { TextInput, StyleSheet, Text, TouchableOpacity, View, Alert, Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { ScrollView } from 'react-native-gesture-handler';
import { updateUser } from '../../services/userApi';
import { AuthContext } from '../../contexts/newAuth';


export default function EditProfileAlunoScreen({route, navigation}){

  const { checkSession } = useContext(AuthContext);

  const { usuario } = route.params;

  const [data, setData] = useState({
    nome: usuario.nome,
    matricula: usuario.matricula,
    email: usuario.email,
    senha: '',
    confirmarSenha: '',
    checkNomeChange: true,
    checkMatriculaChange: true,
    checkEmailChange: true,
    checkSenha: false,
    isValidName: true,
    isValidMatricula: true,
    isValidEmail: true,
    isValidPassword: false,
    secureTextEntry: true
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

  const handleMatriculaChange = (val) => {
    let reg = /^[A-Za-z0-9]*$/;

    if( reg.test(val) === true && val.length>=9) {
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

    if( val.length >= 8 && val.length <= 16) {
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

    if(val === data.senha && data.isValidPassword) {
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

  async function handleUpdate(){

    let update = {};

    if (data.checkNomeChange && data.isValidName && data.nome != usuario.nome) {
      update = {
        ...update, 
        nome: data.nome
      }
    };

    if (data.checkMatriculaChange && data.isValidMatricula && data.matricula != usuario.matricula) {
      update = {
        ...update, 
        matricula: data.matricula
      }
    };

    if (data.checkEmailChange && data.isValidEmail && data.email != usuario.email) {
      update = {
        ...update, 
        email: data.email
      }
    };

    if (data.checkSenha && data.isValidPassword) {
      update = {
        ...update, 
        senha: data.senha
      }
    };

    try{
      const response = await updateUser(usuario.cpf, update);

      if (response.status == 200){
        Alert.alert('Sucesso!', 'Conta atualizada!', [
          {
            text: 'Ok',
            onPress: () => navigation.navigate("MinhaContaAluno")
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
      console.log(err);
      return;
    }
  }

  useEffect(() => {
    async function check() {
      try {
        await checkSession(usuario.cpf);
      } catch(e) {
          console.log(e);
      }
    }
    check();
  }, []);

  return(
    <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}>
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Ionicons name={Platform.OS === "ios" ? "ios-person" : "md-person"} size={80} color={"#6200EE"} />
        </View>
        <ScrollView>
          <View style={styles.inputContainer}>
            
            <Text style = {styles.text}>Nome: </Text>
            <View style={styles.inputContent}>
              <TextInput
                style = {styles.input}
                placeholder = "   Nome completo"
                placeholderTextColor="#00a896"
                defaultValue = {data.nome}
                onChangeText = {(val) => handleNomeChange(val)}
              />
              {data.checkNomeChange ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
            </View>

            {(data.isValidName || data.nome === '' ) ? null : <Text style={styles.errorText} >Nome inválido</Text>}

            <View style={{flexDirection: 'row', marginBottom: 40, marginTop: 10}}>
              <Text style = {styles.text}>CPF: </Text>
              <Text style = {styles.subtext}>{usuario.cpf}</Text>
            </View>

            <Text style = {styles.text}>Matrícula UFF: </Text>
            <View style={styles.inputContent}>
              <TextInput
                style = {styles.input}
                placeholder = "   Matrícula UFF"
                placeholderTextColor="#00a896"
                defaultValue = {data.matricula}
                onChangeText = {(val) => handleMatriculaChange(val)}
              />
              {data.checkMatriculaChange ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
            </View>

            {(data.isValidMatricula || data.matricula === '' || !isNaN(data.matricula) ) ? null : <Text style={styles.errorText} >Matricula inválida</Text>}

            <Text style = {styles.text}>Email: </Text>
            <View style={styles.inputContent}>
              <TextInput
                style = {styles.input}
                placeholder = "   Email"
                placeholderTextColor="#00a896"
                defaultValue = {data.email}
                onChangeText = {(val) => handleEmailChange(val)}
                  
              />
              {data.checkEmailChange ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
            </View>

            {(data.isValidEmail || data.email === '') ? null : <Text style={styles.errorText} >Email inválido</Text>}
          </View>
          <View style={styles.senhaInputContainer}>
            <View style={styles.senhaInputContent}>
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
          
            <View style={styles.senhaInputContent}>
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
        <View style={{marginTop: 30, marginBottom: 25}}>
          <TouchableOpacity 
            style = {(data.isValidName || data.isValidMatricula || data.isValidEmail || (data.isValidPassword && data.checkSenha)) ? styles.button : styles.buttonDisabled} 
            disabled={!(data.isValidName || data.isValidMatricula || data.isValidEmail || (data.isValidPassword && data.checkSenha))} 
            onPress={() => handleUpdate()}>
            <Text style = {styles.buttonText}>Confirmar</Text>
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
    justifyContent: 'space-evenly'
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  inputContainer: {
    marginHorizontal: 40,
    marginTop: 25,
    justifyContent: 'space-evenly',
  },
  senhaInputContainer: {
    marginHorizontal: 30,
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    color: "#6200EE",
    alignSelf: "flex-start"
  },
  subtext: {
    fontSize: 18,
    fontWeight: '300',
    color: "#6200EE",
    marginLeft: 20,
    alignSelf: "center"
  },
  input: {
    backgroundColor: '#03DAC5',
    fontSize: 18,
    height: 43,
    width: 250,
    color: "#6200EE",
    marginRight: 15,
  },
  button: {
    height: 60,
    width: 170,
    borderWidth: 0.5,
    backgroundColor: "#6200EE",
    borderColor: "#6200EE",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius:20,
    alignSelf: "center",
    justifyContent: "center",
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
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10
  },
  inputContent: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 25,
    marginBottom: 30
  },
  senhaInputContent: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 40
  },
})