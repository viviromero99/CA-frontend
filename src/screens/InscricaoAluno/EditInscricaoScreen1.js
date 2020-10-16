import React, {useEffect, useContext, useState} from 'react';
import { TextInput, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../contexts/newAuth';


export default function EditInscricaoScreen1({navigation, route}){

    const { checkSession, getUser } = useContext(AuthContext);
    const { projeto } = route.params;
    const { inscricao } = route.params;
    
    const [data, setData] = useState({
        nome: "",
        matriculaUFF: "",
        email: "",
        curso: "",
        matriculaFAPERJ: "",
        rg: "",
        isValidName: false,
        isValidMatriculaUFF: false,
        isValidCurso: false,
        isValidMatriculaFAPERJ: false,
        isValidRg: false,
        isValidEmail: false,
    })

    const handleNomeChange = (val) => {
        let reg = /^([A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+\s)*[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/;

        if(reg.test(val) === true) {
        setData({
            ...data,
            nome: val,
            isValidName: true,
        });
        } else {
        setData({
            ...data,
            nome: val,
            isValidName: false
        });
        }
    }

    const handleMatriculaUFFChange = (val) => {
        let reg = /^[A-Za-z0-9]*$/;

        if(reg.test(val) === true && val.length>=9) {
        setData({
            ...data,
            matriculaUFF: val,
            isValidMatriculaUFF: true
        });
        } else {
        setData({
            ...data,
            matriculaUFF: val,
            isValidMatriculaUFF: false
        });
        }
    }

    const handleCursoChange = (val) => {
        let reg = /^([A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+\s)*[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/;

        if(reg.test(val) === true) {
        setData({
            ...data,
            curso: val,
            isValidCurso: true,
        });
        } else {
        setData({
            ...data,
            curso: val,
            isValidCurso: false,
        });
        }
    }

    const handleMatriculaFAPERJChange = (val) => {
        let reg = /^[0-9]+$/;

        if( reg.test(val) === true && val.length>=10) {
        setData({
            ...data,
            matriculaFAPERJ: val,
            isValidMatriculaFAPERJ: true
        });
        } else {
        setData({
            ...data,
            matriculaFAPERJ: val,
            isValidMatriculaFAPERJ: false
        });
        }
    }

    const handleRgChange = (val) => {
        let reg = /^[0-9]+$/;

        if( val.length == 9 && reg.test(val) === true ) {
          setData({
              ...data,
              rg: val,
              isValidRg: true
          });
        } else {
          setData({
              ...data,
              rg: val,
              isValidRg: false
          });
        }
    }

    const handleEmailChange = (val) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (reg.test(val) === true) {
        setData({
            ...data,
            email: val,
            isValidEmail: true,
        });
        } else {
        setData({
            ...data,
            email: val,
            isValidEmail: false
        });
        }
    }

    function handleUpdateInscricaoTela1(){

        let update = {projetoId: projeto.id};

        if (data.isValidName){
            update = {
                ...update, 
                nome: data.nome
            }
        };

        if (data.isValidMatriculaUFF){
            update = {
                ...update, 
                matriculaUFF: data.matriculaUFF
            }
        };

        if (data.isValidCurso) {
            update = {
                ...update, 
                curso: data.curso
            }
        };

        if (data.isValidMatriculaFAPERJ) {
            update = {
                ...update, 
                matriculaFAPERJ: data.matriculaFAPERJ
            }
        };

        if (data.isValidRg) {
            update = {
                ...update, 
                rg: data.rg
            }
        };

        if (data.isValidEmail) {
            update = {
                ...update, 
                email: data.email
            }
        };


        navigation.navigate("EditInscricao2", {projeto: projeto, tela1: update, inscricao: inscricao, projeto: projeto})
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
                    <Text style = {styles.text}>Nome Completo: </Text>
                    <View style={styles.inputContent}>
                        <TextInput
                            style = {styles.input}
                            placeholder = "   Nome Completo"
                            defaultValue = {inscricao.nome}
                            placeholderTextColor="#00a896"
                            onChangeText = {val => handleNomeChange(val)}
                        />

                        {data.isValidName ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
                    </View>

                    <Text style = {styles.text}>Matrícula UFF: </Text>
                    <View style={styles.inputContent}>
                        <TextInput
                            style = {styles.input}
                            placeholder = "   Matricula UFF"
                            defaultValue = {inscricao.matriculaUFF}
                            placeholderTextColor="#00a896"
                            onChangeText = {val => handleMatriculaUFFChange(val)}
                        />

                        {data.isValidMatriculaUFF ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
                    </View>

                    <Text style = {styles.text}>Curso: </Text>
                    <View style={styles.inputContent}>
                        <TextInput
                            style = {styles.input}
                            placeholder = "   Curso"
                            defaultValue = {inscricao.curso}
                            placeholderTextColor="#00a896"
                            onChangeText = {val => handleCursoChange(val)}
                        />

                        {data.isValidCurso ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
                    </View>

                    <Text style = {styles.text}>Matrícula FAPERJ: </Text>
                    <View style={styles.inputContent}>
                        <TextInput
                            style = {styles.input}
                            placeholder = "   Matricula FAPERJ"
                            defaultValue = {inscricao.matriculaFAPERJ}
                            placeholderTextColor="#00a896"
                            onChangeText = {val => handleMatriculaFAPERJChange(val)}
                        />

                        {data.isValidMatriculaFAPERJ ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
                    </View>
                    <View style={styles.helpContainer}>
                        <Text style = {styles.helpText1}>Não tem uma matrícula FAPERJ?  </Text>
                        <TouchableOpacity onPress={()=>{navigation.navigate("AjudaAlunoStack", {screen: "AjudaAluno"})}}>
                            <Text style = {styles.helpText2}>Clique aqui</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style = {styles.text}>RG: </Text>
                    <View style={styles.inputContent}>
                        <TextInput
                            style = {styles.input}
                            placeholder = "   RG"
                            placeholderTextColor="#00a896"
                            defaultValue = {inscricao.rg}
                            onChangeText = {val => handleRgChange(val)}
                        />
                        
                        {data.isValidRg ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
                    </View>

                    <Text style = {styles.text}>Email: </Text>
                    <View style={styles.inputContent}>
                        <TextInput
                            style = {styles.input}
                            placeholder = "   Email"
                            placeholderTextColor="#00a896"
                            defaultValue = {inscricao.email}
                            onChangeText = {val => handleEmailChange(val)}
                        />

                        {data.isValidEmail ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
                    </View>
                </View>
                <View style={{marginTop: 30, marginBottom: 20}}>
                    <TouchableOpacity 
                    style = {styles.button} 
                    onPress={()=>handleUpdateInscricaoTela1()}>
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
    helpContainer: {
        marginTop: 18,
        flexDirection: "row",
    },
    helpText1: {
        fontSize: 13,
        color: "#6200EE"
    },
    helpText2: {
        fontSize: 13,
        color: "#03DAC6",
        fontWeight: "600"
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
