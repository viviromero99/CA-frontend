import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, Text, View, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { getInscricao } from '../../services/alunoApi';
import { AuthContext } from '../../contexts/newAuth';

export default function InscricaoSelecionadaPreviewScreen({route, navigation}){

    const { checkSession, getUser } = useContext(AuthContext);
    const { projeto } = route.params;

    const [usuario, setUsuario] = useState({
        nome: "",
        cpf: "",
        matriculaUFF: "",
        curso: "",
        matriculaFAPERJ: "",
        email: "",
        telefone: "",
        celular: "",
        rg: "",
        cep: "",
        endereco: "",
        bairro: "",
        cidade: "",
        estado: "",
        dataNasc: "",
        entradaUFF: "",
        saidaUFF: "",
        lattes: "",
        isLoading: true
    })

    useEffect(() => {
        let mounted = true;

        async function check() {
          try {
            const user = await getUser();
            await checkSession(user);
            const response = await getInscricao(user, projeto.id);
            if (response.status == 200 && mounted){
                setUsuario({
                    nome: response.data.nome,
                    cpf: response.data.usuarioCpf,
                    matriculaUFF: response.data.matriculaUFF,
                    curso: response.data.curso,
                    matriculaFAPERJ: response.data.matriculaFAPERJ,
                    email: response.data.email,
                    telefone: response.data.telefone,
                    celular: response.data.celular,
                    rg: response.data.rg,
                    cep: response.data.cep,
                    endereco: response.data.endereco,
                    bairro: response.data.bairro,
                    cidade: response.data.cidade,
                    estado: response.data.estado,
                    dataNasc: response.data.dataNasc,
                    entradaUFF: response.data.entradaUFF,
                    saidaUFF: response.data.saidaUFF,
                    lattes: response.data.lattes,
                    completo: response.data.completo,
                    isLoading: false
                })
                return;
            }
          } catch(e) {
              console.log(e);
          }
        }
        check();
        return () => mounted = false;
    }, []);

    if(usuario.isLoading){
        return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size='small' color={"#6200EE"}/>
          </View>
        );
    }
    return(
        <View style = {styles.container}>
            <View style={styles.welcomeContainer}>
                <Ionicons name={Platform.OS === "ios" ? "ios-paper" : "md-paper"} size={100} color={"#03DAC6"} />
            </View>
            <ScrollView style={styles.detailsContainer}>
                <Text style = {styles.text}>Nome completo</Text>
                <Text style = {styles.subtext}> {usuario.nome}</Text>
                <Text style = {styles.text}>CPF</Text>
                <Text style = {styles.subtext}> {usuario.cpf}</Text>
                <Text style = {styles.text}>RG</Text>
                <Text style = {styles.subtext}> {usuario.rg}</Text>
                <Text style = {styles.text}>Data de Nascimento</Text>
                <Text style = {styles.subtext}> {usuario.dataNasc}</Text>
                <Text style = {styles.text}>Curso</Text>
                <Text style = {styles.subtext}> {usuario.curso}</Text>
                <Text style = {styles.text}>Matricula UFF</Text>
                <Text style = {styles.subtext}> {usuario.matriculaUFF}</Text>
                <Text style = {styles.text}>Ano/Semestre de Entrada na UFF</Text>
                <Text style = {styles.subtext}> {usuario.entradaUFF}</Text>
                <Text style = {styles.text}>Ano/Semestre de Previsão de Colação</Text>
                <Text style = {styles.subtext}> {usuario.saidaUFF}</Text>
                <Text style = {styles.text}>Link do CV Lattes</Text>
                <Text style = {styles.subtext}> {usuario.lattes}</Text>
                <Text style = {styles.text}>Matricula FAPERJ</Text>
                <Text style = {styles.subtext}> {usuario.matriculaFAPERJ}</Text>
                <Text style = {styles.text}>Email</Text>
                <Text style = {styles.subtext}> {usuario.email}</Text>
                <Text style = {styles.text}>Telefone</Text>
                <Text style = {styles.subtext}> {usuario.telefone}</Text>
                <Text style = {styles.text}>Celular</Text>
                <Text style = {styles.subtext}> {usuario.celular}</Text>
                <Text style = {styles.text}>Endereço</Text>
                <Text style = {styles.subtext}> {usuario.endereco}</Text>
                <Text style = {styles.text}>CEP</Text>
                <Text style = {styles.subtext}> {usuario.cep}</Text>
                <Text style = {styles.text}>Bairro</Text>
                <Text style = {styles.subtext}> {usuario.bairro}</Text>
                <Text style = {styles.text}>Cidade</Text>
                <Text style = {styles.subtext}> {usuario.cidade}</Text>
                <Text style = {styles.text}>Estado</Text>
                <Text style = {styles.subtext}> {usuario.estado}</Text>
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
      marginTop: 20,
      marginBottom: 30
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
    button: {
        height: 55,
        width: 170,
        borderWidth: 0.5,
        backgroundColor: "#03DAC6",
        borderColor: "#03DAC6",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius:20,
        alignSelf: "center",
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 22,
        color: "#fff",
        textAlign: "center",
    },
    buttonDelete: {
        height: 55,
        width: 170,
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
        fontSize: 18,
        color: "#fff",
        textAlign: "center",
        marginRight: 13,
    },
  })