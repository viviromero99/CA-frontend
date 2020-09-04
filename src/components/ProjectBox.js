import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {Text, TouchableOpacity, StyleSheet, View } from 'react-native';


export default function ProjectBox(props){
    return(
        <View style = {styles.container}>
            <TouchableOpacity onPress={() => props.onSelectProject(props)}>
                <View style={{flexDirection: "row-reverse", justifyContent: "space-between", marginBottom: 28}}>
                    <Ionicons name={props.icon} size={props.size} color={props.color ? props.color : "#03DAC6"}/>
                    <Text style={styles.contentTitulo}>{props.titulo}</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={styles.contentText2}>{props.info}</Text>
                    <Text style={styles.contentText3}>{props.area}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 20,
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
        marginLeft: 14,
        marginRight: 16,
        marginTop: 15,
        marginBottom:15,
        backgroundColor: '#6200EE'
    },
    contentText:{
        fontSize: 20,
        color: "#fff",
        marginTop: 10,
        marginBottom: 10,
        alignSelf: "flex-start"
    },
    contentTitulo:{
        fontSize: 20,
        fontWeight: "600",
        color: "#fff",
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 5,
        alignSelf: "flex-start"
    },
    contentText3:{
        fontSize: 17,
        color: "#fff",
        marginTop: 15,
        marginBottom: 10,
        alignSelf: "flex-end"
    },
    contentText2:{
        fontSize: 18,
        color: "#fff",
        marginTop: 15,
        marginBottom: 10,
        alignSelf: "flex-end"
    }
});