import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {deleteProjeto} from '../../services/professorApi';


import ProjetoAbertoPreviewScreen from '../../screens/ProjetosProfessor/ProjetoAbertoPreviewScreen';
import CriarProjetoScreen from '../../screens/ProjetosProfessor/CriarProjetoScreen';
import ProjetoFechadoPreviewScreen from '../../screens/ProjetosProfessor/ProjetoFechadoPreviewScreen';
import EditProjetoScreen from '../../screens/ProjetosProfessor/EditProjetoScreen';
import CandidatosListScreen from '../../screens/ProjetosProfessor/CandidatosListScreen';
import CandidatoPreviewScreen from '../../screens/ProjetosProfessor/CandidatoPreviewScreen';
import SelecionadosListScreen from '../../screens/ProjetosProfessor/SelecionadosListScreen';
import SelecionadoPreviewScreen from '../../screens/ProjetosProfessor/SelecionadoPreviewScreen';
import AssuntosProjetoScreen from '../../screens/ProjetosProfessor/AssuntosProjetoScreen';
import AbrirProjetoScreen from '../../screens/ProjetosProfessor/AbrirProjetoScreen';


const ProjStack = createStackNavigator();
//const INITIAL_ROUTE = '';

export default function ProjetoStack({navigation}){

    const handleDelete = async (cpf, projeto) => {
        try{
            const response = await deleteProjeto(cpf, projeto);
            if (response.status == 200) {
                navigation.navigate("HomeProfessor")
            }else{
                Alert.alert("Erro!", "Erro ao deletar projeto",{
                    text: "Ok",
                })
            }
        }catch(err){
            console.log(err);
        }
    }

    const createTwoButtonAlertDeletar = (cpf, projeto) => {
        Alert.alert(
            "Deletar Projeto?",
            "Este projeto será permanentemente apagado.",
            [
                {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
                },
                { text: "Sim", onPress: () => handleDelete(cpf, projeto)}
            ],
            { cancelable: false }
        );
    }

    return(
        <ProjStack.Navigator>
            <ProjStack.Screen
            name = "Novo Projeto"
            component = {CriarProjetoScreen}
            options={{
                title: "Novo Projeto",
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: '#6200EE'
                },         
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.goBack()}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#fff"/>
                </TouchableOpacity>
            }}
            />

            <ProjStack.Screen
            name = "ProjetoAbertoPreview"
            component = {ProjetoAbertoPreviewScreen}
            options={ ({ route }) => ({ 
                title: `${route.params.projeto.titulo}`,
                headerTintColor: "#6200EE",
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.goBack()}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#6200EE"/>
                </TouchableOpacity>
             })
            }
            />

            <ProjStack.Screen
            name = "EditProjeto"
            component = {EditProjetoScreen}
            options={ ({ route }) => ({ 
                title: `${route.params.projeto.titulo}`,
                headerTintColor: "#6200EE",
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.navigate("ProjetoAbertoPreview", {projeto: route.params.projeto})}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#6200EE"/>
                </TouchableOpacity>,
                headerRight: () => 
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => createTwoButtonAlertDeletar(route.params.projeto.usuarioCpf, route.params.projeto.id)}>
                    <Text style={{fontSize: 14, fontWeight: '500', color: "#E30425"}}>Deletar</Text>
                </TouchableOpacity>
            })}
            />

            <ProjStack.Screen
            name = "AssuntosProjeto"
            component = {AssuntosProjetoScreen}
            options={({ route }) => ({
                title: "Assuntos",
                headerTintColor: "#6200EE",
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.navigate("ProjetoAbertoPreview")}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#6200EE"/>
                </TouchableOpacity>
            })}
            />

            <ProjStack.Screen
            name = "ProjetoFechadoPreview"
            component = {ProjetoFechadoPreviewScreen}
            options={ ({ route }) => ({ 
                title: `${route.params.projeto.titulo}`,
                headerTintColor: "#6200EE",
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.goBack()}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#6200EE"/>
                </TouchableOpacity>,
                headerRight: () => 
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => createTwoButtonAlertDeletar(route.params.projeto.usuarioCpf, route.params.projeto.id)}>
                    <Text style={{fontSize: 14, fontWeight: '500', color: "#E30425"}}>Deletar</Text>
                </TouchableOpacity>,
                })
            }
            />

            <ProjStack.Screen
            name = "AbrirProjeto"
            component = {AbrirProjetoScreen}
            options={ ({ route }) => ({ 
                title: `${route.params.projeto.titulo}`,
                headerTintColor: "#6200EE",
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.navigate("ProjetoFechadoPreview", {projeto: route.params.projeto})}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#6200EE"/>
                </TouchableOpacity> })
            }
            />

            <ProjStack.Screen
            name = "CandidatosList"
            component = {CandidatosListScreen}
            options={{
                title: "Candidatos",
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: '#03DAC6'
                },         
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.navigate("SelecionadosList")}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#fff"/>
                </TouchableOpacity>
            }}
            />

            <ProjStack.Screen
            name = "SelecionadosList"
            component = {SelecionadosListScreen}
            options={{
                title: "Alunos Selecionados",
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: '#03DAC6'
                },         
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.navigate("ProjetoFechadoPreview")}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#fff"/>
                </TouchableOpacity>
            }}
            />

            <ProjStack.Screen
            name = "SelecionadoPreview"
            component = {SelecionadoPreviewScreen}
            options={ ({ route }) => ({ 
                title: `${route.params.selecionado.nome}`,
                headerTintColor: "#6200EE",
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.navigate("SelecionadosList")}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#6200EE"/>
                </TouchableOpacity>
                })
            }
            />

            <ProjStack.Screen
            name = "CandidatoPreview"
            component = {CandidatoPreviewScreen}
            options={ ({ route }) => ({ 
                title: `${route.params.candidato.nome}`,
                headerTintColor: "#6200EE",
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.navigate("CandidatosList")}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#6200EE"/>
                </TouchableOpacity>
                })
            }
            />
            
        </ProjStack.Navigator>
    )
}