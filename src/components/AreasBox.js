import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';


export default function AreasBox(props){
    return(
        <View style = {{marginTop: 15, marginBottom: 15, flexDirection: 'row', justifyContent: 'space-evenly', marginLeft: 10, flex:1, marginEnd:10}}>
            <TouchableOpacity style = {[props.style, styles.button]} onPress={() => props.onSelectArea(props)}>
                <Text style = {styles.buttonText}>{props.nome}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 80,
        width: 180,
        borderWidth: 0.5,
        borderColor: "#03DAC6",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius:20,
        alignSelf: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontWeight: '500',
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
        marginLeft: 8,
        marginRight: 8
    }
  })