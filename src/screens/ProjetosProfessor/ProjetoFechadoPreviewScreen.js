import React, { useEffect, useContext} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import {updateProject, deleteCandidaturasNaoSelecionadas} from '../../services/professorApi';
import { AuthContext } from '../../contexts/newAuth';


export default function ProjetoFechadoPreviewScreen({route, navigation}){

    const { checkSession } = useContext(AuthContext);
    const { projeto } = route.params;

    const handleArquivar = async (cpf, proj) => {
        if (projeto.selecionados == projeto.vagas){

            try{
                const response = await updateProject(cpf, proj, {estaArquivado: true});

                if(response.status == 200){

                    await deleteCandidaturasNaoSelecionadas(cpf, proj)
                    Alert.alert("Sucesso!", "Projeto foi arquivado com sucesso.", [
                        { text: "Ok", onPress: () => navigation.navigate("HomeProfessor")}
                    ]);
                }else{
                    Alert.alert("Erro!", "Ocorreu um erro ao executar operação.", [
                        { text: "Ok" }
                    ]);
                }
                return;

            }catch(err){
                console.log(err);
                return;
            }
        }else{
            Alert.alert("Erro!", "Para arquivar um projeto é preciso preencher todas as vagas ofertadas!", [
                { text: "Ok" }
            ]);
        }

    }

    const createTwoButtonAlert = (cpf, projeto) =>
        Alert.alert(
            "Arquivar Projeto?",
            "Este projeto será permanentemente arquivado.",
            [
                {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
                },
                { text: "OK", onPress: () => handleArquivar(cpf, projeto)}
            ],
            { cancelable: false }
        );
    
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

    return(
        <View style = {styles.container}>
            <View style={styles.welcomeContainer}>
                <Ionicons name={Platform.OS === "ios" ? "ios-paper" : "md-paper"} size={70} color={"#03DAC5"} />
            </View>
            <ScrollView style={styles.detailsContainer}>
            <Text style = {styles.text}>Orientador </Text>
                <Text style = {styles.bigSubtext}> {projeto.orientador}</Text>

                <Text style = {styles.text}>Área</Text>
                <Text style = {styles.bigSubtext}> {projeto.area}</Text>

                <View style={styles.content}>
                    <Text style = {styles.text}>Instituto</Text>
                    <Text style = {styles.subtext}> {projeto.instituto}</Text>
                </View>

                <Text style = {styles.text}>Título do Projeto:</Text>
                <Text style = {styles.bigSubtext}> {projeto.titulo}</Text>


                <Text style = {styles.text}>Descrição do Projeto:</Text>
                <Text style = {styles.bigSubtext}> {projeto.descricao}</Text>

                <View style={styles.content}>
                    <Text style = {styles.text}>Vagas Disponíveis:</Text>
                    <Text style = {styles.subtext}> {projeto.vagas}</Text>
                </View>

                <Text style = {styles.text}>Prazo de Inscrição:</Text>
                <Text style = {styles.subtext}>{projeto.prazo}</Text>

            </ScrollView>
            <View style = {{marginTop: 20}}>
                <TouchableOpacity style = {styles.bigButton} onPress={() => {navigation.navigate("SelecionadosList", {projeto: projeto})}}>
                    <Text style = {styles.bigButtonText}>Ver Seleções</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop: 20, marginBottom: 30, flexDirection: 'row-reverse', justifyContent: 'space-evenly'}}>
                <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate("AbrirProjeto", {projeto: projeto})}>
                    <Text style = {styles.buttonText}>Abrir Inscrições Novamente</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.buttonDelete} onPress={() => createTwoButtonAlert(projeto.usuarioCpf, projeto.id)}>
                    <View style = {{flexDirection: "row", justifyContent: "center"}}>
                        <Text style = {styles.buttonTextDelete}>Arquivar Projeto</Text>
                    </View>
                </TouchableOpacity>
            </View>
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
    },
    text: {
        fontWeight: "bold",
        marginBottom: 15,
        fontSize: 20,
        color: "#6200EE",
        alignSelf: "flex-start",
    },
    subtext: {
        fontWeight: '300',
        marginBottom: 35,
        fontSize: 20,
        color: "#6200EE",
        alignSelf: "flex-start",
        marginLeft: 8,
    },
    bigSubtext: {
        fontWeight: '300',
        marginBottom: 35,
        fontSize: 20,
        color: "#6200EE",
        alignSelf: "flex-start",
        marginHorizontal: 15,
    },
    button: {
        height: 60,
        width: 180,
        borderWidth: 0.5,
        backgroundColor: "#03DAC5",
        borderColor: "#03DAC5",
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
    buttonDelete: {
        height: 60,
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
        marginRight: 10,
    },
    bigButton: {
        height: 60,
        width: 350,
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
    bigButtonText: {
        fontSize: 20,
        color: "#fff",
        textAlign: "center",
    },
    content: {
        flexDirection: 'row', 
        marginBottom: 15, 
    }
  })