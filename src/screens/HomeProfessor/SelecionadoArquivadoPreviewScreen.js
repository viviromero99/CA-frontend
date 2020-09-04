import React, {useContext, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../../contexts/newAuth';

export default function SelecionadoPreviewScreen({route, navigation}){

    const { checkSession, getUser } = useContext(AuthContext);

    const { selecionado } = route.params;

    useEffect(() => {
        async function check() {
          try {
            const user = await getUser();
            await checkSession(user);
          } catch(e) {
              console.log(e);
          }
        }
        check();
    }, []);

    return(
        <View style = {styles.container}>
            <View style={styles.welcomeContainer}>
                <Ionicons name={Platform.OS === "ios" ? "ios-person" : "md-person"} size={100} color={"#03DAC5"} />
            </View>
            <ScrollView style={styles.detailsContainer}>
              <Text style = {styles.text}>Nome completo:</Text>
              <Text style = {styles.subtext}> {selecionado.nome}</Text>
              <Text style = {styles.text}>CPF:</Text>
              <Text style = {styles.subtext}> {selecionado.usuarioCpf}</Text>
              <Text style = {styles.text}>RG:</Text>
              <Text style = {styles.subtext}> {selecionado.rg}</Text>
              <Text style = {styles.text}>Data de Nascimento:</Text>
              <Text style = {styles.subtext}> {selecionado.dataNasc}</Text>
              <Text style = {styles.text}>Curso:</Text>
              <Text style = {styles.subtext}> {selecionado.curso}</Text>
              <Text style = {styles.text}>Matricula UFF:</Text>
              <Text style = {styles.subtext}> {selecionado.matriculaUFF}</Text>
              <Text style = {styles.text}>Ano/Semestre de Entrada na UFF:</Text>
              <Text style = {styles.subtext}> {selecionado.entradaUFF}</Text>
              <Text style = {styles.text}>Ano/Semestre de Previsão de Colação:</Text>
              <Text style = {styles.subtext}> {selecionado.saidaUFF}</Text>
              <Text style = {styles.text}>Link do CV Lattes:</Text>
              <Text style = {styles.subtext}> {selecionado.lattes}</Text>
              <Text style = {styles.text}>Matricula FAPERJ:</Text>
              <Text style = {styles.subtext}> {selecionado.matriculaFAPERJ}</Text>
              <Text style = {styles.text}>Email:</Text>
              <Text style = {styles.subtext}> {selecionado.email}</Text>
              <Text style = {styles.text}>Telefone:</Text>
              <Text style = {styles.subtext}> {selecionado.telefone}</Text>
              <Text style = {styles.text}>Celular:</Text>
              <Text style = {styles.subtext}> {selecionado.celular}</Text>
              <Text style = {styles.text}>Endereço:</Text>
              <Text style = {styles.subtext}> {selecionado.endereco}</Text>
              <Text style = {styles.text}>CEP:</Text>
              <Text style = {styles.subtext}> {selecionado.cep}</Text>
              <Text style = {styles.text}>Bairro:</Text>
              <Text style = {styles.subtext}> {selecionado.bairro}</Text>
              <Text style = {styles.text}>Cidade:</Text>
              <Text style = {styles.subtext}> {selecionado.cidade}</Text>
              <Text style = {styles.text}>Estado:</Text>
              <Text style = {styles.subtext}> {selecionado.estado}</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    welcomeContainer: {
      alignItems: 'center',
      marginTop: 50,
    },
    detailsContainer: {
      marginHorizontal: 55,
      marginTop: 30,
      marginBottom: 35
    },
    text: {
        fontWeight: "bold",
        marginBottom: 20,
        fontSize: 20,
        color: "#6200EE",
        alignSelf: "flex-start",
    },
    subtext: {
        fontWeight: '300',
        marginBottom: 25,
        fontSize: 20,
        color: "#6200EE",
        alignSelf: "flex-start"
    },
})