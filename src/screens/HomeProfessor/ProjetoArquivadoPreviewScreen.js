import React, {useContext, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../../contexts/newAuth';

export default function ProjetoArquivadoPreviewScreen({route, navigation}){

    const { checkSession } = useContext(AuthContext);

    const { projeto } = route.params;

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
                <Ionicons name={Platform.OS === "ios" ? "ios-paper" : "md-paper"} size={80} color={"#03DAC5"} />
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
                <View style={styles.content}>
                    <Text style = {styles.text}>Prazo de Inscrição:</Text>
                    <Text style = {styles.subtext}>{projeto.prazo}</Text>
                </View>
            </ScrollView>
            <View style={{marginTop: 20, marginBottom: 30, flexDirection: 'row-reverse', justifyContent: 'space-evenly'}}>
                <TouchableOpacity style = {styles.button} onPress={() => {navigation.navigate("ProjetoArquivadoSelecoes", {projeto: projeto})}}>
                    <Text style = {styles.buttonText}>Ver Selecionados</Text>
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
    content: {
        flexDirection: 'row', 
        marginBottom: 15, 
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
        fontSize: 18,
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