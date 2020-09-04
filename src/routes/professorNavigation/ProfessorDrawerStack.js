import React, {useContext} from 'react';
import {TouchableOpacity, View, Text, Platform, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import {DrawerContent} from './ProfessorDrawerContent';
import{ AuthContext } from '../../contexts/newAuth';
import { deleteUser } from '../../services/userApi';
import { deleteProjeto } from '../../services/professorApi';


import ProfessorBottomTabNavigator from './ProfessorBottomTabNavigator';
import ProfileProfessorScreen from '../../screens/HomeProfessor/ProfileProfessorScreen';
import EditProfileProfessorScreen from '../../screens/HomeProfessor/EditProfileProfessorScreen';
import ProjetosArquivadosScreen from '../../screens/HomeProfessor/ProjetosArquivadosScreen';
import ProjetoArquivadoPreviewScreen from '../../screens/HomeProfessor/ProjetoArquivadoPreviewScreen';
import ProjetoArquivadoSelecoesScreen from '../../screens/HomeProfessor/ProjetoArquivadoSelecoesScreen';
import SelecionadoArquivadoPreviewScreen from '../../screens/HomeProfessor/SelecionadoArquivadoPreviewScreen';
import HelpProfessorScreen from '../../screens/HomeProfessor/HelpProfessorScreen';


const Drawer = createDrawerNavigator();
const INITIAL_ROUTE = 'HomeProfessorStack';

export default function ProfessorDrawerStack({navigation}){
    return(
        <Drawer.Navigator initialRouteName={INITIAL_ROUTE} edgeWidth={0}
        drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name = "HomeProfessorStack" component = {HomeProfessorStack}/>
            <Drawer.Screen name = "MinhaContaProfStack" component = {ProfileProfStack}/>
            <Drawer.Screen name = "ProjetosArquivadosStack" component = {ProjetosArquivadosStack}/>
            <Drawer.Screen name = "AjudaProfessorStack" component = {HelpProfStack}/>
        </Drawer.Navigator>
    );
}

const HPStack = createStackNavigator();

function HomeProfessorStack({navigation}){
    return(
        <HPStack.Navigator>
            <HPStack.Screen
            name = "HomeProfessor"
            component = {ProfessorBottomTabNavigator}
            options = {{
                headerTitle: () =>
                <View style={[{flex:1, flexDirection:'row', justifyContent:'center', paddingTop: 7, alignSelf: 'center'}, Platform.OS === "ios" ? null : {marginRight: 53}]}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-home" : "md-home"} size={27} color='#6200EE'/>
                </View>,
                headerLeft: () => 
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.toggleDrawer()}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-menu" : "md-menu"} size={27} color='#6200EE'/>
                </TouchableOpacity>,
                headerTintColor: '#6200EE',
            }}
            />
        </HPStack.Navigator>
    )
}

const PPStack = createStackNavigator();

function ProfileProfStack({navigation}){

    const { checkSession, getUser } = useContext(AuthContext);

    const handleDelete = async () => {
        try{
            const cpf = await getUser()
            const response = await deleteUser(cpf);
            if(response.status == 200){
                checkSession(null);
            }
            return;
        }catch(err){
            console.log(err);
        }
    };

    const createTwoButtonAlertDeletar = () => {
        Alert.alert(
            "Deletar Conta?",
            "Esta conta será permanentemente apagada.",
            [
                {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
                },
                { text: "Sim", onPress: () => handleDelete()}
            ],
            { cancelable: false }
        );
    };

    return(
        <PPStack.Navigator>
            <PPStack.Screen
            name = "MinhaContaProfessor"
            component = {ProfileProfessorScreen}
            options = {{
                headerTitle: "Minha Conta",
                headerLeft: () => 
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.toggleDrawer()}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-menu" : "md-menu"} size={27} color='#6200EE'/>
                </TouchableOpacity>,
                headerTintColor: '#6200EE'
            }}
            />
            <PPStack.Screen
            name = "EditContaProfessor"
            component = {EditProfileProfessorScreen}
            options = {{
                headerTitle: "Editar Conta",
                headerLeft: () => 
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.navigate("MinhaContaProfessor")}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color='#6200EE'/>
                </TouchableOpacity>,
                headerTintColor: '#6200EE',
                headerRight: () => 
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={createTwoButtonAlertDeletar}>
                    <Text style={{fontSize: 14, fontWeight: '500', color: "#E30425"}}>Deletar</Text>
                </TouchableOpacity>
            }}
            />
        </PPStack.Navigator>
    )
}

const PAStack = createStackNavigator();

function ProjetosArquivadosStack({navigation}){

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
                { text: "Sim", 
                onPress: () => handleDelete(cpf, projeto)}
            ],
            { cancelable: false }
        );
    };
    return(
        <PAStack.Navigator>
            <PAStack.Screen
            name = "ProjetosArquivados"
            component = {ProjetosArquivadosScreen}
            options = {{
                title: "Projetos Arquivados",
                headerLeft: () => 
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.toggleDrawer()}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-menu" : "md-menu"} size={27} color='#6200EE'/>
                </TouchableOpacity>,
                headerTintColor: '#6200EE',
            }}
            />
            <PAStack.Screen
            name = "ProjetoArquivadoPreview"
            component = {ProjetoArquivadoPreviewScreen}
            options={ ({ route }) => ({ 
                title: `${route.params.projeto.titulo}`,
                headerTintColor: "#6200EE",
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.navigate("ProjetosArquivados")}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#6200EE"/>
                </TouchableOpacity>,
                headerRight: () => 
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => createTwoButtonAlertDeletar(route.params.projeto.usuarioCpf, route.params.projeto.id)}>
                    <Text style={{fontSize: 14, fontWeight: '500', color: "#E30425"}}>Deletar</Text>
                </TouchableOpacity>
            })}
            />
            <PAStack.Screen
            name = "ProjetoArquivadoSelecoes"
            component = {ProjetoArquivadoSelecoesScreen}
            options={({ route }) => ({ 
                title: "Selecionados",
                headerTintColor: "#6200EE",
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.navigate("ProjetoArquivadoPreview", {projeto: route.params.projeto})}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#6200EE"/>
                </TouchableOpacity>
            })}
            />
            <PAStack.Screen
            name = "SelecionadoArquivadoPreview"
            component = {SelecionadoArquivadoPreviewScreen}
            options={ ({ route }) => ({ 
                title: `${route.params.selecionado.nome}`,
                headerTintColor: "#6200EE",
                headerLeft: () =>
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.navigate("ProjetoArquivadoSelecoes", {projeto: route.params.projeto})}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color="#6200EE"/>
                </TouchableOpacity>
            })}
            />
        </PAStack.Navigator>
    )
}

const APStack = createStackNavigator();

function HelpProfStack({navigation}){
    return(
        <APStack.Navigator>
            <APStack.Screen
            name = "AjudaProfessor"
            component = {HelpProfessorScreen}
            options = {{
                headerTitle: "Ajuda",
                headerLeft: () => 
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.toggleDrawer()}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-menu" : "md-menu"} size={27} color='#6200EE'/>
                </TouchableOpacity>,
                headerTintColor: '#6200EE',
            }}
            />
        </APStack.Navigator>
    )
}
