import React, { useEffect, useContext} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { updateProject, deleteCandidaturasIncompletas } from '../../services/professorApi';
import { AuthContext } from '../../contexts/newAuth';


export default function ProjetoAbertoPreviewScreen({route, navigation}){

    const { checkSession } = useContext(AuthContext);
    const { projeto } = route.params;

    const handleFechar = async (cpf, projeto) => {
        try{
            const response = await updateProject(cpf, projeto, {estaAberto: false});

            if(response.status == 200){
                await deleteCandidaturasIncompletas(cpf, projeto);

                Alert.alert("Sucesso!", "Inscrições encerradas para projeto", [
                    { text: "Ok", onPress: () => navigation.navigate("HomeProfessor")}
                ]);
            }
            
        }catch(err){
            console.log(err);
        }
    }

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
                <Ionicons name={Platform.OS === "ios" ? "ios-paper" : "md-paper"} size={70} color={"#03DAC6"} />
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
                <TouchableOpacity style = {styles.bigButton} onPress={() => {navigation.navigate("EditProjeto", {projeto: projeto})}}>
                    <Text style = {styles.bigButtonText}>Editar Projeto</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop: 20, marginBottom: 30, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <TouchableOpacity style = {styles.buttonClose} onPress={() => handleFechar(projeto.usuarioCpf, projeto.id)}>
                    <Text style = {styles.buttonText}>Encerrar Inscrições</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.button} onPress={() => {navigation.navigate("AssuntosProjeto", {projeto: projeto})}}>
                    <Text style = {styles.buttonText}>Ver Assuntos</Text>
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
      marginHorizontal: 40,
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
        height: 55,
        width: 170,
        borderWidth: 0.5,
        backgroundColor: "#6200EE",
        borderColor: "#6200EE",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius:20,
        alignSelf: "center",
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: "#fff",
        textAlign: "center",
    },
    buttonClose: {
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
    bigButton: {
        height: 55,
        width: 350,
        borderWidth: 0.5,
        backgroundColor: "#03DAC6",
        borderColor: "#03DAC6",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius:20,
        alignSelf: "center",
        justifyContent: 'center',
    },
    bigButtonText: {
        fontSize: 21,
        color: "#fff",
        textAlign: "center",
    },
    content: {
        flexDirection: 'row', 
        marginBottom: 15, 
    }
  })