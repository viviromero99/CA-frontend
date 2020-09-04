import React, {useEffect, useContext, useState} from 'react';
import { TextInput, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../contexts/newAuth';
import { findUser } from '../../services/userApi';
import { ScrollView } from 'react-native-gesture-handler';


export default function InscricaoScreen1({navigation, route}){

    const { checkSession, getUser } = useContext(AuthContext);
    const { projeto } = route.params;
    
    const [data, setData] = useState({
        nome: "",
        matriculaUFF: "",
        email: "",
        curso: "",
        matriculaFAPERJ: "",
        rg: "",
        isValidName: true,
        isValidMatriculaUFF: true,
        isValidCurso: false,
        isValidMatriculaFAPERJ: false,
        isValidRg: false,
        isValidEmail: true,
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
        console.log(val)
        let reg = /^[A-Za-z0-9]+$/;

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

    function handleInscricaoTela1(nome, matriculaUFF, curso, matriculaFAPERJ, rg, email){

        let name = ""
        let matUFF = ""
        let course = ""
        let matFAPERJ = ""
        let rgAluno = ""
        let emailAluno = ""

        if (data.isValidName == false || (data.isValidName == true && data.nome == "")) name = data.nomeUser;

        if (data.isValidName == true) name = nome;

        if (data.isValidMatriculaUFF == false || (data.isValidMatriculaUFF == true && data.matriculaUFF == "")) matUFF = data.matriculaUFFUser;

        if (data.isValidMatriculaUFF == true) matUFF = matriculaUFF;

        if (data.isValidCurso == false) course = null;

        if (data.isValidCurso == true) course = curso;

        if (data.isValidMatriculaFAPERJ == false) matFAPERJ = null;

        if (data.isValidMatriculaFAPERJ == true) matFAPERJ = matriculaFAPERJ;

        if (data.isValidRg == false) rgAluno = null;

        if (data.isValidRg == true) rgAluno = rg;

        if (data.isValidEmail == false || (data.isValidEmail == true && data.email == "")) emailAluno = data.emailUser;

        if (data.isValidEmail == true) emailAluno = email;

        const tela1 = {
            nome: name,
            matriculaUFF: matUFF,
            curso: course,
            matriculaFAPERJ: matFAPERJ,
            rg: rgAluno,
            email: emailAluno,
            projetoId: projeto.id
        }
        console.log(tela1);

        navigation.navigate("Inscricao2", {tela1: tela1})
    }

    useEffect(() => {
        let mounted = true;

        async function check() {
          try {
            const user = await getUser();
            await checkSession(user);
            const response = await findUser(user);
            if (response.status == 200 && mounted){
                setData({
                    ...data,
                    nome: response.data.nome,
                    matriculaUFF: response.data.matricula,
                    email: response.data.email,
                })
                return;
            }
          } catch(e) {
              console.log(e);
          }
        }
        check();
        return () => mounted = false;
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
                            defaultValue = {data.nome}
                            placeholderTextColor="#00a896"
                            onChangeText = {(val) => handleNomeChange(val)}
                        />

                        {data.isValidName ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
                    </View>

                    <Text style = {styles.text}>Matrícula UFF: </Text>
                    <View style={styles.inputContent}>
                        <TextInput
                            style = {styles.input}
                            placeholder = "   Matrícula UFF"
                            defaultValue = {data.matriculaUFF}
                            placeholderTextColor="#00a896"
                            onChangeText = {(val) => handleMatriculaUFFChange(val)}
                        />

                        {data.isValidMatriculaUFF ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
                    </View>

                    <Text style = {styles.text}>Curso: </Text>
                    <View style={styles.inputContent}>
                        <TextInput
                            style = {styles.input}
                            placeholder = "   Curso"
                            placeholderTextColor="#00a896"
                            onChangeText = {(val) => handleCursoChange(val)}
                        />

                        {data.isValidCurso ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
                    </View>

                    <Text style = {styles.text}>Matrícula FAPERJ: </Text>
                    <View style={styles.inputContent}>
                        <TextInput
                            style = {styles.input}
                            placeholder = "   Matricula FAPERJ"
                            placeholderTextColor="#00a896"
                            onChangeText = {(val) => handleMatriculaFAPERJChange(val)}
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
                            onChangeText = {(val) => handleRgChange(val)}
                        />

                        {data.isValidRg ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
                    </View>

                    <Text style = {styles.text}>Email: </Text>
                    <View style={styles.inputContent}>
                        <TextInput
                            style = {styles.input}
                            placeholder = "   Email"
                            defaultValue = {data.email}
                            placeholderTextColor="#00a896"
                            onChangeText = {(val) => handleEmailChange(val)}
                        />

                        {data.isValidEmail ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
                    </View>
                </View>
                <View style={{marginTop: 30, marginBottom: 20}}>
                    <TouchableOpacity 
                    style = {styles.button} 
                    onPress={()=>handleInscricaoTela1(data.nome, data.matriculaUFF, data.curso, data.matriculaFAPERJ, data.rg, data.email)}>
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