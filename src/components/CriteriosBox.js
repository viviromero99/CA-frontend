import { Ionicons } from '@expo/vector-icons';
import React, {useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, View } from 'react-native';


export default function CriterioBox(props){

    const [selected, setSelected] = useState([]);

    const selectingItem = (id) => {
        
    }

    return(
        <View style = {styles.contentContainer}>
            <TouchableOpacity 
            style={{flexDirection: "row", justifyContent: "space-evenly", alignContent:"space-between"}}
            onPress={}
            >
                <Text style={styles.contentText}>{props.conteudo}</Text>
                <Ionicons name={props.icon} size={45} color="#03DAC6" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer:{
        flex: 1,
        borderTopWidth: 1,
        borderColor: '#6200EE',
        padding: 10,
    },
      contentText:{
        fontSize: 20,
        color: '#6200EE',
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 14,
    }
})