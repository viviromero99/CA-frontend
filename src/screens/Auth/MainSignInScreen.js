import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MainSignInScreen({navigation}) {
    return(
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.pressableContainer}  onPress={() => navigation.navigate("CadastroAluno")}>
                    <View style={styles.insideContainer} >
                        <Ionicons name = {Platform.OS === "ios" ? "ios-person" : "md-person"} size={100} color={"#6200EE"} />
                        <Text style={styles.iconTextAluno}>Sou Aluno(a)</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.pressableContainer}  onPress={() => navigation.navigate("CadastroProfessor")}>
                    <View style={styles.insideContainer} >
                        <Ionicons name = {Platform.OS === "ios" ? "ios-person" : "md-person"} size={100} color={"#6200EE"} />
                        <Text style={styles.iconTextProf}>Sou Professor(a)</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        marginTop: 70,
        alignItems: "center",
    },
    pressableContainer: {
        marginTop: 70,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius:10, 
        borderColor: '#6200EE',
        borderWidth: 1.3,
    },
    insideContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 20,
    },
    iconTextAluno: {
        marginLeft: 35,
        marginRight: 35,
        color: '#6200EE',
        fontSize: 20,
        alignSelf: "center",
    },
    iconTextProf: {
        marginLeft: 20,
        marginRight: 20,
        color: '#6200EE',
        fontSize: 20,
        alignSelf: "center",
    }
})