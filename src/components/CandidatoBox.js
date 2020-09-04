import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Platform } from 'react-native';


export default function CandidatoBox(props){
    return(
        <View style = {{marginTop: 15, marginBottom: 15, flexDirection: 'row', marginLeft: 10, flex:1,}}>
            <TouchableOpacity style = {[styles.container, props.color]} onPress={() => props.onSelectCandidato(props)}>
                <View style={{justifyContent: "space-evenly", alignContent: "center"}}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-person" : "md-person"} size={75} color={"#fff"}/>
                    <Text style={styles.contentText}>{props.nome}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        borderTopWidth: 0.25,
        borderRightWidth: 1.5,
        borderLeftWidth:0.25,
        borderRadius: 0,
        borderColor: '#ddd',
        borderBottomWidth: 1.5,
        shadowColor: "rgb(112,112,112)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        height:160,
        width: 175,
        backgroundColor: '#6200EE',
        alignSelf: "center",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",

    },
    contentText:{
        fontSize: 17,
        color: "#fff",
        fontWeight: "600",
        marginTop: 10,
    },
});