import React, {useContext} from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import{ AuthContext } from '../../contexts/newAuth';

export function DrawerContent(props, navigation) {

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
                            onPress={() => {props.navigation.navigate('HomeAlunoStack', {screen: "HomeAluno"})}}
                        />
                    </View>
                    <View style={styles.drawerSection}>
                        <DrawerItem 
                            label="Minha Conta"
                            activeBackgroundColor={activeBackgroundColor}
                            activeTintColor={activeTintColor}
                            inactiveTintColor={inactiveTintColor}
                            onPress={() => {props.navigation.navigate('MinhaContaAlunoStack', {screen: "MinhaContaAluno"})}}
                        />
                    </View>
                    <View style={styles.drawerSection}>
                        <DrawerItem 
                            label="Meus Interesses"
                            activeBackgroundColor={activeBackgroundColor}
                            activeTintColor={activeTintColor}
                            inactiveTintColor={inactiveTintColor}
                            onPress={() => {props.navigation.navigate("MeusInteressesStack", {screen: 'Meus Interesses'})}}
                        />
                    </View>
                    <View style={styles.drawerSection}>
                        <DrawerItem 
                            label="Ajuda"
                            activeBackgroundColor={activeBackgroundColor}
                            activeTintColor={activeTintColor}
                            inactiveTintColor={inactiveTintColor}
                            onPress={() => {props.navigation.navigate('AjudaAlunoStack', {screen: "AjudaAluno"})}}
                        />
                    </View>
                </View>
            </DrawerContentScrollView>
            <View style={styles.bottomDrawerSection}>
                <DrawerItem 
                    inactiveBackgroundColor="#E30425"
                    inactiveTintColor="#fff"
                    label="Sair"
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