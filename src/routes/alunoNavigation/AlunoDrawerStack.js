import React, {useContext} from 'react';
import { TouchableOpacity, View, Text, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerContent } from './AlunoDrawerContent';
import{ AuthContext } from '../../contexts/newAuth';
import { deleteUser } from '../../services/userApi';


import AlunoBottomTabNavigator from './AlunoBottomTabNavigator';
import ProfileAlunoScreen from '../../screens/HomeAluno/ProfileAlunoScreen';
import HelpAlunoScreen from '../../screens/HomeAluno/HelpAlunoScreen';
import InteressesAlunoScreen from '../../screens/HomeAluno/InteressesAlunoScreen';
import EditProfileAlunoScreen from '../../screens/HomeAluno/EditProfileAlunoScreen';


const Drawer = createDrawerNavigator();
const INITIAL_ROUTE = 'HomeAlunoStack';

export default function AlunoDrawerStack({navigation}){
    return(
        <Drawer.Navigator initialRouteName={INITIAL_ROUTE} edgeWidth={0}
        drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name = "HomeAlunoStack" component = {HomeAlunoStack}/>
            <Drawer.Screen name = "MinhaContaAlunoStack" component = {ProfileAlunoStack}/>
            <Drawer.Screen name = "MeusInteressesStack" component = {InteressesAlunoStack}/>
            <Drawer.Screen name = "AjudaAlunoStack" component = {HelpAlunoStack}/> 
        </Drawer.Navigator>
    );
}

const HAAStack = createStackNavigator();

function HomeAlunoStack({navigation}){
    return(
        <HAAStack.Navigator>
            <HAAStack.Screen
            name = "HomeAluno"
            component = {AlunoBottomTabNavigator}
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
        </HAAStack.Navigator>
    )
}

const PAAStack = createStackNavigator();

function ProfileAlunoStack({navigation}){

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
        <PAAStack.Navigator>
            <PAAStack.Screen
            name = "MinhaContaAluno"
            component = {ProfileAlunoScreen}
            options = {{
                headerTitle: "Minha Conta",
                headerLeft: () => 
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.toggleDrawer()}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-menu" : "md-menu"} size={27} color='#6200EE'/>
                </TouchableOpacity>,
                headerTintColor: '#6200EE'
            }}
            />
            <PAAStack.Screen
            name = "EditContaAluno"
            component = {EditProfileAlunoScreen}
            options = {{
                headerTitle: "Editar Conta",
                headerLeft: () => 
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.navigate("MinhaContaAluno")}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"} size={27} color='#6200EE'/>
                </TouchableOpacity>,
                headerTintColor: '#6200EE',
                headerRight: () => 
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={createTwoButtonAlertDeletar}>
                    <Text style={{fontSize: 14, fontWeight: '500', color: "#E30425"}}>Deletar</Text>
                </TouchableOpacity>
            }}
            />
        </PAAStack.Navigator>
    )
}

const MIStack = createStackNavigator();

function InteressesAlunoStack({navigation}){
    return(
        <MIStack.Navigator>
            <MIStack.Screen
            name = "Meus Interesses"
            component = {InteressesAlunoScreen}
            options = {{
                headerLeft: () => 
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.toggleDrawer()}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-menu" : "md-menu"} size={27} color='#6200EE'/>
                </TouchableOpacity>,
                headerTintColor: '#6200EE',
            }}
            />
        </MIStack.Navigator>
    )
}

const AAStack = createStackNavigator();

function HelpAlunoStack({navigation}){
    return(
        <AAStack.Navigator>
            <AAStack.Screen
            name = "AjudaAluno"
            component = {HelpAlunoScreen}
            options = {{
                headerTitle: "Ajuda",
                headerLeft: () => 
                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => {navigation.toggleDrawer()}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-menu" : "md-menu"} size={27} color='#6200EE'/>
                </TouchableOpacity>,
                headerTintColor: '#6200EE',
            }}
            />
        </AAStack.Navigator>
    )
}
