import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform, ActivityIndicator} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../contexts/newAuth';
import { findUser } from '../../services/userApi';


export default function ProfileAlunoScreen({navigation}){

  const { getUser, checkSession, signOut } = useContext(AuthContext);

  const [data, setData] = useState({
    nome: '',
    cpf: '',
    matricula: '',
    email: '',
    isLoading: true,
  });

  useEffect(() => {
    async function fetchUser() {
      let mounted = true;
      try {
        const user = await getUser();
        await checkSession(user);
        if (mounted){
          const response = await findUser(user);
          if (response.status == 200){
            setData({
              nome: response.data.nome,
              cpf: response.data.cpf,
              matricula: response.data.matricula,
              email: response.data.email,
              isLoading: false,
            });
            return;
          }
        }
      } catch(e) {
          console.log(e);
      }
    }
    fetchUser();
    return () => mounted = false;
  }, [data]);

  if(data.isLoading){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size='small' color={"#6200EE"}/>
      </View>
    );
  }

  return(
    <View style={styles.container}>
      <View>
        <Text style = {styles.title}>{data.nome}</Text>
      </View>
      <View style={styles.welcomeContainer}>
        <Ionicons name={Platform.OS === "ios" ? "ios-person" : "md-person"} size={100} color={"#6200EE"} />
      </View>
      <View style={styles.inputContainer}>
        <Text style = {styles.text}>CPF:   {data.cpf}</Text>
        <Text style = {styles.text}>Matrícula:   {data.matricula}</Text>
        <Text style = {styles.text}>{data.email}</Text>
      </View>
      <View style={{marginTop: 10, marginBottom: 35, flexDirection: "row", justifyContent: "space-evenly"}}>
        <TouchableOpacity style = {styles.button} onPress = {() => {navigation.navigate("EditContaProfessor", {usuario: data})}}>
            <Text style = {styles.buttonText}>Editar Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginTop: 50,
  },
  inputContainer: {
    marginHorizontal: 55,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center'
  },
  text: {
    fontWeight: '300',
    marginBottom: 40,
    fontSize: 20,
    color: "#6200EE",
    alignSelf: 'flex-start'
  },
  title: {
    fontWeight: '600',
    marginTop: 30,
    fontSize: 25,
    color: "#6200EE",
    alignSelf: 'center'
  },
  button: {
    height: 60,
    width: 150,
    borderWidth: 0.5,
    backgroundColor: "#03DAC6",
    borderColor: "#03DAC6",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius:20,
    alignSelf: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 19,
    color: "#fff",
    textAlign: "center",
  },
  buttonDelete: {
    height: 60,
    width: 150,
    borderWidth: 0.5,
    backgroundColor: "#E30425",
    borderColor: "#E30425",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius:20,
    alignSelf: "center",
    justifyContent: "center",
  },
  buttonTextDelete: {
    fontSize: 19,
    color: "#fff",
    textAlign: "center",
    marginRight: 13,
  },
})