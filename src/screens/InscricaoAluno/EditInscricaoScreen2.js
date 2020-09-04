import React, {useEffect, useContext, useState} from 'react';
import {TextInput, StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../contexts/newAuth';


export default function EditInscricaoScreen2({navigation, route}){

    const { checkSession, getUser } = useContext(AuthContext);
    const { tela1 } = route.params;
    const { projeto } = route.params;
    const { inscricao } = route.params;
    
    const [data, setData] = useState({
        telefone: "",
        celular: "",
        cep: "",
        endereco: "",
        bairro: "",
        cidade: "",
        estado: "",
        isValidTelefone: false,
        isValidCelular: false,
        isValidCep: false,
        isValidEndereco: false,
        isValidBairro: false,
        isValidCidade: false,
        isValidEstado: false,
    })

    const handleTelefoneChange = (val) => {
        let reg = /^[0-9]+$/;

        if( val.length >= 10 && reg.test(val) === true ) {
          setData({
              ...data,
              telefone: val,
              isValidTelefone: true
          });
        } else {
          setData({
              ...data,
              telefone: val,
              isValidTelefone: false
          });
        }
    }

    const handleCelularChange = (val) => {
        let reg = /^[0-9]+$/;

        if( val.length >= 11 && reg.test(val) === true ) {
          setData({
              ...data,
              celular: val,
              isValidCelular: true
          });
        } else {
          setData({
              ...data,
              celular: val,
              isValidCelular: false
          });
        }
    }

    const handleCepChange = (val) => {
        let reg = /^[0-9]+$/;

        if( val.length == 8 && reg.test(val) === true ) {
          setData({
              ...data,
              cep: val,
              isValidCep: true
          });
        } else {
          setData({
              ...data,
              cep: val,
              isValidCep: false
          });
        }
    }

    const handleEnderecoChange = (val) => {
       
        if(val !== "" ) {
        setData({
            ...data,
            endereco: val,
            isValidEndereco: true,
        });
        } else {
        setData({
            ...data,
            endereco: val,
            isValidEndereco: false,
        });
        }
    }

    const handleBairroChange = (val) => {
        let reg = /^([A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+\s)*[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/;

        if(reg.test(val) === true) {
        setData({
            ...data,
            bairro: val,
            isValidBairro: true,
        });
        } else {
        setData({
            ...data,
            bairro: val,
            isValidBairro: false,
        });
        }
    }

    const handleCidadeChange = (val) => {
        let reg = /^([A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+\s)*[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/;

        if(reg.test(val) === true) {
        setData({
            ...data,
            cidade: val,
            isValidCidade: true
        });
        } else {
        setData({
            ...data,
            cidade: val,
            isValidCidade: false,
        });
        }
    }

    const handleEstadoChange = (val) => {
        let reg = /^([A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+\s)*[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/;

        if(reg.test(val) === true) {
        setData({
            ...data,
            estado: val,
            isValidEstado: true,
        });
        } else {
        setData({
            ...data,
            estado: val,
            isValidEstado: false,
        });
        }
    }

    function handleUpdateInscricaoTela2(){

        let update = {}

        if (data.isValidTelefone){
            update = {
                ...update, 
                telefone: data.telefone
            }
        };

        if (data.isValidCelular){
            update = {
                ...update, 
                celular: data.celular
            }
        };

        if (data.isValidCep){
            update = {
                ...update, 
                cep: data.cep
            }
        };

        if (data.isValidEndereco){
            update = {
                ...update, 
                endereco: data.endereco
            }
        };

        if (data.isValidBairro){
            update = {
                ...update, 
                bairro: data.bairro
            }
        };

        if (data.isValidCidade){
            update = {
                ...update, 
                cidade: data.cidade
            }
        };

        if (data.isValidEstado){
            update = {
                ...update, 
                estado: data.estado
            }
        };

        navigation.navigate("EditInscricao3", {tela1: tela1, tela2: update, inscricao: inscricao, projeto: projeto})
    }

    useEffect(() => {
        async function check() {
          try {
            const user = await getUser();
            await checkSession(user);
          } catch(e) {
              console.log(e);
          }
        }
        check();
    }, []);

    return(
        <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}>
            <ScrollView>
                <View style={styles.inputContainer}>
                    <Text style = {styles.text}>Telefone: </Text>
                    <View style={styles.inputContent}>
                        <TextInput
                            style = {styles.input}
                            placeholder = "   Telefone  (somente números)"
                            placeholderTextColor="#00a896"
                            defaultValue = {inscricao.telefone}
                            onChangeText = {val => handleTelefoneChange(val)}
                        />

                        {data.isValidTelefone ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
                    </View>

                    <Text style = {styles.text}>Celular: </Text>
                    <View style={styles.inputContent}>
                        <TextInput
                            style = {styles.input}
                            placeholder = "   Celular  (somente números)"
                            defaultValue = {inscricao.celular}
                            placeholderTextColor="#00a896"
                            onChangeText = {val => handleCelularChange(val)}
                        />

                        {data.isValidCelular ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
                    </View>

                    <Text style = {styles.text}>Endereço: </Text>
                    <View style={styles.inputContent}>
                        <TextInput
                            style = {styles.input}
                            placeholder = "   Endereço"
                            defaultValue = {inscricao.endereco}
                            placeholderTextColor="#00a896"
                            onChangeText = {val => handleEnderecoChange(val)}
                        />

                        {data.isValidEndereco ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
                    </View>

                    <Text style = {styles.text}>CEP: </Text>
                    <View style={styles.inputContent}>
                        <TextInput
                            style = {styles.input}
                            placeholder = "   CEP  (somente números)"
                            defaultValue = {inscricao.cep}
                            placeholderTextColor="#00a896"
                            onChangeText = {val => handleCepChange(val)}
                        />

                        {data.isValidCep ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
                    </View>

                    <Text style = {styles.text}>Bairro: </Text>
                    <View style={styles.inputContent}>
                        <TextInput
                            style = {styles.input}
                            placeholder = "   Bairro"
                            defaultValue = {inscricao.bairro}
                            placeholderTextColor="#00a896"
                            onChangeText = {val => handleBairroChange(val)}
                        />

                        {data.isValidBairro ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
                    </View>

                    <Text style = {styles.text}>Cidade: </Text>
                    <View style={styles.inputContent}>
                        <TextInput
                            style = {styles.input}
                            placeholder = "   Cidade"
                            defaultValue = {inscricao.cidade}
                            placeholderTextColor="#00a896"
                            onChangeText = {val => handleCidadeChange(val)}
                        />

                        {data.isValidCidade ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
                    </View>

                    <Text style = {styles.text}>Estado: </Text>
                    <View style={styles.inputContent}>
                        <TextInput
                            style = {styles.input}
                            placeholder = "   Estado"
                            defaultValue = {inscricao.estado}
                            placeholderTextColor="#00a896"
                            onChangeText = {val => handleEstadoChange(val)}
                        />

                        {data.isValidEstado ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
                    </View>
                </View>
                <View style={{marginTop: 30, marginBottom: 20}}>
                    <TouchableOpacity 
                    style = {styles.button} 
                    onPress={()=>handleUpdateInscricaoTela2()}>
                        <Text style = {styles.buttonText}>Continuar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inputContainer: {
        marginHorizontal: 30,
        marginTop: 20,
        justifyContent: "space-evenly",
    },
    input: {
        backgroundColor: '#03DAC6',
        fontSize: 18,
        marginRight: 15,
        marginTop: 10,
        height: 45,
        width:275,
        color: "#6200EE",
    },
    button: {
        height: 55,
        width: 175,
        borderWidth: 0.5,
        backgroundColor: "#6200EE",
        borderColor: "#6200EE",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius:20,
        alignSelf: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 20,
        color: "#fff",
        textAlign: "center"
    },
    inputContent: {
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 10,
        marginBottom: 10
    },
    text: {
        fontSize: 20,
        fontWeight: '700',
        color: "#6200EE",
        alignSelf: "flex-start",
        marginTop: 32
    },
})