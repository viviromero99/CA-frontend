import React, {useContext, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { selectAluno } from '../../services/professorApi';
import { AuthContext } from '../../contexts/newAuth';

export default function CandidatoPreviewScreen({route, navigation}){

    const { checkSession } = useContext(AuthContext);

    const { projeto } = route.params;
    const { candidato } = route.params;
    
    useEffect(() => {
        async function check() {
          try {
            await checkSession(projeto.usuarioCpf);
          } catch(e) {
              console.log(e);
          }
        }
        check();
    }, []);

    const handleSelecao = async () => {

        try{
            const response = await selectAluno(projeto.usuarioCpf, projeto.id, candidato.id, {selecionado: true});
            if(response.status == 200){
                Alert.alert("Sucesso!", "Candidato selecionado com sucesso.", [
                    { text: "Ok", onPress: () => navigation.navigate("HomeProfessor")}
                ]);
            }else{
                Alert.alert("Erro!", "Ocorreu um erro ao selecionar candidato.", [
                    { text: "Ok" }
                ]);
            }
            return;

        }catch(err){
            console.log(err);
            return;
        }

    }

    return(
        <View style = {styles.container}>
            <View style={styles.welcomeContainer}>
                <Ionicons name={Platform.OS === "ios" ? "ios-person" : "md-person"} size={100} color={"#03DAC5"} />
            </View>
            <ScrollView style={styles.detailsContainer}>
                <Text style = {styles.text}>Nome completo:</Text>
                <Text style = {styles.subtext}> {candidato.nome}</Text>
                <Text style = {styles.text}>CPF:</Text>
                <Text style = {styles.subtext}> {candidato.usuarioCpf}</Text>
                <Text style = {styles.text}>RG:</Text>
                <Text style = {styles.subtext}> {candidato.rg}</Text>
                <Text style = {styles.text}>Data de Nascimento:</Text>
                <Text style = {styles.subtext}> {candidato.dataNasc}</Text>
                <Text style = {styles.text}>Curso:</Text>
                <Text style = {styles.subtext}> {candidato.curso}</Text>
                <Text style = {styles.text}>Matricula UFF:</Text>
                <Text style = {styles.subtext}> {candidato.matriculaUFF}</Text>
                <Text style = {styles.text}>Ano/Semestre de Entrada na UFF:</Text>
                <Text style = {styles.subtext}> {candidato.entradaUFF}</Text>
                <Text style = {styles.text}>Ano/Semestre de Previsão de Colação:</Text>
                <Text style = {styles.subtext}> {candidato.saidaUFF}</Text>
                <Text style = {styles.text}>Link do CV Lattes:</Text>
                <Text style = {styles.subtext}> {candidato.lattes}</Text>
                <Text style = {styles.text}>Matricula FAPERJ:</Text>
                <Text style = {styles.subtext}> {candidato.matriculaFAPERJ}</Text>
                <Text style = {styles.text}>Email:</Text>
                <Text style = {styles.subtext}> {candidato.email}</Text>
                <Text style = {styles.text}>Telefone:</Text>
                <Text style = {styles.subtext}> {candidato.telefone}</Text>
                <Text style = {styles.text}>Celular:</Text>
                <Text style = {styles.subtext}> {candidato.celular}</Text>
                <Text style = {styles.text}>Endereço:</Text>
                <Text style = {styles.subtext}> {candidato.endereco}</Text>
                <Text style = {styles.text}>CEP:</Text>
                <Text style = {styles.subtext}> {candidato.cep}</Text>
                <Text style = {styles.text}>Bairro:</Text>
                <Text style = {styles.subtext}> {candidato.bairro}</Text>
                <Text style = {styles.text}>Cidade:</Text>
                <Text style = {styles.subtext}> {candidato.cidade}</Text>
                <Text style = {styles.text}>Estado:</Text>
                <Text style = {styles.subtext}> {candidato.estado}</Text>
            </ScrollView>
            {projeto.selecionados == projeto.vagas ? null :
                <View style={{marginBottom: 30, justifyContent: 'space-evenly'}}>
                    <TouchableOpacity style = {styles.button} onPress={() => handleSelecao()}>
                        <Text style = {styles.buttonText}>Selecionar Candidato</Text>
                    </TouchableOpacity>
                </View>
            }
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
      marginBottom: 20,
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
        height: 58,
        width: 240,
        borderWidth: 0.5,
        backgroundColor: "#03DAC5",
        borderColor: "#03DAC5",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius:20,
        alignSelf: "center",
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: "#fff",
        textAlign: "center",
    },
  })