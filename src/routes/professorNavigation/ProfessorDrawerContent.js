import React, {useContext} from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import{ AuthContext } from '../../contexts/newAuth';

export function DrawerContent(props) {

    const { checkSession } = useContext(AuthContext);

    const activeBackgroundColor= "#6200EE"
    const activeTintColor= "#fff"
    const inactiveTintColor= "#6200EE"
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.drawerSection}>
                        <DrawerItem 
                            label="Home"
                            activeBackgroundColor={activeBackgroundColor}
                            activeTintColor={activeTintColor}
                            inactiveTintColor={inactiveTintColor}
                            onPress={() => {props.navigation.navigate('HomeProfessorStack', {screen: 'HomeProfessor'})}}
                        />
                    </View>
                    <View style={styles.drawerSection}>
                        <DrawerItem 
                            label="Minha Conta"
                            activeBackgroundColor={activeBackgroundColor}
                            activeTintColor={activeTintColor}
                            inactiveTintColor={inactiveTintColor}
                            onPress={() => {props.navigation.navigate("MinhaContaProfStack", {screen: 'MinhaContaProfessor'})}}
                        />
                    </View>
                    <View style={styles.drawerSection}>
                        <DrawerItem 
                            label="Projetos Arquivados"
                            activeBackgroundColor={activeBackgroundColor}
                            activeTintColor={activeTintColor}
                            inactiveTintColor={inactiveTintColor}
                            onPress={() => {props.navigation.navigate("ProjetosArquivadosStack", {screen: 'ProjetosArquivados'})}}
                        />
                    </View>
                    <View style={styles.drawerSection}>
                        <DrawerItem 
                            label="Ajuda"
                            activeBackgroundColor={activeBackgroundColor}
                            activeTintColor={activeTintColor}
                            inactiveTintColor={inactiveTintColor}
                            onPress={() => {props.navigation.navigate("AjudaProfessorStack", {screen: 'AjudaProfessor'})}}
                        />
                    </View>
                </View>
            </DrawerContentScrollView>
            <View style={styles.bottomDrawerSection}>
                <DrawerItem 
                    style = {{justifyContent: 'space-evenly'}}
                    
                    label="Sair"
                    inactiveTintColor='#fff'
                    inactiveBackgroundColor="#E30425"
                    onPress={() => {checkSession(null)}}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
});