import React, {useEffect, useContext} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../../contexts/newAuth';

export default function ProjetoInscritoPreviewScreen({route, navigation}){

    const { checkSession, getUser } = useContext(AuthContext);
    const { projeto } = route.params;

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
                <Ionicons name={Platform.OS === "ios" ? "ios-paper" : "md-paper"} size={100} color={"#03DAC5"} />
            </View>
            <ScrollView style={styles.detailsContainer}>

                <Text style = {styles.text}>Orientador </Text>
                <Text style = {styles.subtext}> {projeto.orientador}</Text>

                <Text style = {styles.text}>Área</Text>
                <Text style = {styles.subtext}> {projeto.area}</Text>

                <View style={styles.content}>
                    <Text style = {styles.text}>Instituto</Text>
                    <Text style = {styles.subtext}> {projeto.instituto}</Text>
                </View>

                <Text style = {styles.text}>Título do Projeto:</Text>
                <Text style = {styles.subtext}> {projeto.titulo}</Text>


                <Text style = {styles.text}>Descrição do Projeto:</Text>
                <Text style = {styles.subtext}> {projeto.descricao}</Text>

                <View style={styles.content}>
                    <Text style = {styles.text}>Vagas Disponíveis:</Text>
                    <Text style = {styles.subtext}> {projeto.vagas}</Text>
                </View>
                <View style={styles.content}>
                    <Text style = {styles.text}>Prazo de Inscrição:</Text>
                    <Text style = {styles.subtext}>{projeto.prazo}</Text>
                </View>
            </ScrollView>
            <View style={{marginTop: 20, marginBottom: 30}}>
                <TouchableOpacity style = {styles.button} onPress={() => {navigation.navigate("InscricaoPreview", {projeto: projeto})}}>
                    <Text style = {styles.buttonText}>Ver Inscrição</Text>
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
        height: 60,
        width: 200,
        borderWidth: 0.5,
        backgroundColor: "#03DAC5",
        borderColor: "#03DAC5",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius:20,
        alignSelf: "center" 
    },
    buttonText: {
        fontSize: 22,
        color: "#fff",
        textAlign: "center",
        marginTop: 14,
    }
  })