import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons';


import NovaInscricaoPreviewScreen from '../../screens/InscricaoAluno/NovaInscricaoPreviewScreen';
import CriteriosScreen from '../../screens/InscricaoAluno/CriteriosScreen';
import InscricaoScreen1 from '../../screens/InscricaoAluno/InscricaoScreen1';
import InscricaoScreen2 from '../../screens/InscricaoAluno/InscricaoScreen2';
import InscricaoScreen3 from '../../screens/InscricaoAluno/InscricaoScreen3';

import ProjetoInscritoPreviewScreen from '../../screens/InscricaoAluno/ProjetoInscritoPreviewScreen';
import InscricaoPreviewScreen from '../../screens/InscricaoAluno/InscricaoPreviewScreen';
import EditInscricaoScreen1 from '../../screens/InscricaoAluno/EditInscricaoScreen1';
import EditInscricaoScreen2 from '../../screens/InscricaoAluno/EditInscricaoScreen2';
import EditInscricaoScreen3 from '../../screens/InscricaoAluno/EditInscricaoScreen3';

import ProjetoSelecionadoPreviewScreen from '../../screens/InscricaoAluno/ProjetoSelecionadoPreviewScreen';
import InscricaoSelecionadaPreviewScreen from '../../screens/InscricaoAluno/InscricaoSelecionadaPreviewScreen';



const InscStack = createStackNavigator();
const INITIAL_ROUTE = 'Inscricao Preview';

export default function InscricaoStack({navigation}){
    return(
        <InscStack.Navigator initialRouteName={INITIAL_ROUTE}>
            <InscStack.Screen 
            name="NovaInscricaoPreview" 
            component={NovaInscricaoPreviewScreen}
            options={ ({ route }) => ({ 
                title: `${route.params.projeto.titulo}`,
                headerTintColor: "#6200EE",
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.goBack()}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#6200EE"/>
                </TouchableOpacity> })
            }
            />

            <InscStack.Screen 
            name="Criterios" 
            component={CriteriosScreen}
            options={({ route }) => ({ 
                title: null,
                headerTintColor: "#6200EE",
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.navigate("NovaInscricaoPreview", {projeto: route.params.projeto})}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#6200EE"/>
                </TouchableOpacity>
            })}
            />

            <InscStack.Screen 
            name="Inscricao1" 
            component={InscricaoScreen1}
            options={{
                title: null,
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: '#6200EE'
                },         
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.navigate("Criterios")}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#fff"/>
                </TouchableOpacity>
            }}
            />

            <InscStack.Screen 
            name="Inscricao2" 
            component={InscricaoScreen2}
            options={{
                title: null,
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: '#6200EE'
                },         
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.navigate("Inscricao1")}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#fff"/>
                </TouchableOpacity>
            }}
            />

            <InscStack.Screen 
            name="Inscricao3" 
            component={InscricaoScreen3}
            options={{
                title: null,
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: '#6200EE'
                },         
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.navigate("Inscricao2")}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#fff"/>
                </TouchableOpacity>
            }}
            />

            <InscStack.Screen
            name="ProjetoInscritoPreview" 
            component={ProjetoInscritoPreviewScreen}
            options={ ({ route }) => ({ 
                title: `${route.params.projeto.titulo}`,
                headerTintColor: "#6200EE",
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.goBack()}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#6200EE"/>
                </TouchableOpacity> })
            }
            />

            <InscStack.Screen
            name="InscricaoPreview" 
            component={InscricaoPreviewScreen}
            options={ ({ route }) => ({ 
                title: `${route.params.projeto.titulo}`,
                headerTintColor: "#6200EE",
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.goBack()}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#6200EE"/>
                </TouchableOpacity> })
            }
            />

            <InscStack.Screen
            name="EditInscricao1" 
            component={EditInscricaoScreen1}
            options={{
                title: null,
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: '#6200EE'
                },         
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.navigate("InscricaoPreview")}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#fff"/>
                </TouchableOpacity>
            }}
            />

            <InscStack.Screen
            name="EditInscricao2" 
            component={EditInscricaoScreen2}
            options={{
                title: null,
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: '#6200EE'
                },         
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.navigate("EditInscricao1")}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#fff"/>
                </TouchableOpacity>
            }}
            />

            <InscStack.Screen
            name="EditInscricao3" 
            component={EditInscricaoScreen3}
            options={{
                title: null,
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: '#6200EE'
                },         
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.navigate("EditInscricao2")}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#fff"/>
                </TouchableOpacity>
            }}
            />

            <InscStack.Screen
            name="ProjetoSelecionadoPreview" 
            component={ProjetoSelecionadoPreviewScreen}
            options={ ({ route }) => ({ 
                title: `${route.params.projeto.titulo}`,
                headerTintColor: "#6200EE",
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.goBack()}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#6200EE"/>
                </TouchableOpacity> })
            }
            />

            <InscStack.Screen
            name="InscricaoSelecionadaPreview" 
            component={InscricaoSelecionadaPreviewScreen}
            options={ ({ route }) => ({ 
                title: `${route.params.projeto.titulo}`,
                headerTintColor: "#6200EE",
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.navigate("ProjetoSelecionadoPreview")}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#6200EE"/>
                </TouchableOpacity> })
            }
            />
        </InscStack.Navigator>
    )
}