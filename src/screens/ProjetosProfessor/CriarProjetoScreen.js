import React, { useEffect, useState, useContext} from 'react';
import { TextInput, StyleSheet, Text, TouchableOpacity, View, Platform, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { createProjeto } from '../../services/professorApi';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../contexts/newAuth';


export default function CriarProjetoScreen({navigation, route}){
    const dataAtual = new Date();

    const { checkSession } = useContext(AuthContext);
    const { usuario } = route.params;

    const [show, setShow] = useState(false)
    const [data, setData] = useState({
        orientador: "",
        area: "",
        instituto: "",
        titulo: "",
        descricao: "",
        vagas: 0,
        date: dataAtual,
        prazo: "",
        checkOrientadorChange: false,
        checkAreaChange: false,
        checkInstitutoChange: false,
        checkTituloChange: false,
        isValidOrientador: false,
        isValidArea: false,
        isValidInstituto: false,
        isValidTitulo: false,
        isValidDescrip: false,
        isValidVagas: false,
        isValidPrazo: false,
    })

    const showDatePicker = () => {
        setShow(!show);
    };

    const handleOrientadorChange = (val) => {
        let reg = /^([A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+\s)*[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/;
    
        if(reg.test(val) === true) {
            setData({
                ...data,
                orientador: val,
                checkOrientadorChange: true,
                isValidOrientador: true,
            });
        } else {
            setData({
                ...data,
                orientador: val,
                checkOrientadorChange: false,
                isValidOrientador: false,
            });
        }
    }

    const handleAreaChange = (val) => {
        let reg = /^([A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+\s)*[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/;
    
        if(reg.test(val) === true) {
            setData({
                ...data,
                area: val,
                checkAreaChange: true,
                isValidArea: true,
            });
        } else {
            setData({
                ...data,
                area: val,
                checkAreaChange: false,
                isValidArea: false,
            });
        }
    }

    const handleInstitutoChange = (val) => {
        let reg = /^([A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+\s)*[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/;
    
        if(reg.test(val) === true) {
            setData({
                ...data,
                instituto: val,
                checkInstitutoChange: true,
                isValidInstituto: true,
            });
        } else {
            setData({
                ...data,
                instituto: val,
                checkInstitutoChange: false,
                isValidInstituto: false,
            });
        }
    }

    const handleTituloChange = (val) => {
        let reg = /^([A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+\s)*[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/;
    
        if(reg.test(val) === true) {
            setData({
                ...data,
                titulo: val,
                checkTituloChange: true,
                isValidTitulo: true,
            });
        } else {
            setData({
                ...data,
                titulo: val,
                checkTituloChange: false,
                isValidTitulo: false,
            });
        }
    }

    const handleDescricaoChange = (val) => {

        if(val !== ""){
            setData({
                ...data,
                descricao: val,
                isValidDescrip: true,
            });
        }else{
            setData({
                ...data,
                descricao: val,
                isValidDescrip: false,
            });
        }
    }

    const handleVagasChange = (val) => {
        const vagas = parseInt(val);
    
        if(!isNaN(val) && vagas > 0) {
            setData({
                ...data,
                vagas: vagas,
                isValidVagas: true,
            });
        } else {
            setData({
                ...data,
                vagas: val,
                isValidVagas: false
            });
        }
    }

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || data.date;
        const str = currentDate.toISOString();
        
        let dat = str.slice(0,10);

        // Extract the string into month, date and year
        let pdate = dat.split('-');

        const resultDate = `${pdate[2]}/${pdate[1]}/${pdate[0]}`

        setData({
            ...data,
            date: currentDate,
            prazo: resultDate,
            isValidPrazo: true,
        })
    }
    async function criarProjeto(cpf, orientador, titulo, area, instituto, descricao, vagas, prazo){

        if (data.isValidOrientador && data.isValidArea && data.isValidInstituto && data.isValidTitulo && data.isValidVagas && data.isValidPrazo) {
    
          try{
            const response = await createProjeto(cpf, orientador, titulo, area, instituto, descricao, vagas, prazo);
    
            if (response.status == 200){
                navigation.navigate("Assuntos", { screen: "GrandesAreasProjeto", params: {projeto: response.data}})
            }
            else{
                Alert.alert('Erro!', response.data.message , [
                    {
                    text: 'Ok'
                    }
                ]);
                return;
            };
      
          }catch(err){
            console.log(err);
            return;
          }
    
        }else {
          Alert.alert('Erro!', 'Dados de projeto inválidos.', [
              {text: 'Ok'}
          ]);
          return;
        }
    }

    useEffect(() => {
        async function check() {
          try {
            await checkSession(usuario);
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
        <ScrollView style={styles.inputContainer}>
            <Text style = {styles.text}>Nome do(a) Orientador(a): </Text>
            <View style={styles.inputContent}>
                <TextInput
                    style = {styles.input}
                    placeholder = "   Orientador"
                    placeholderTextColor="#00a896"
                    onChangeText = {(val) => handleOrientadorChange(val)}
                />
                {data.checkOrientadorChange ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={40}/> : null}
            </View>

            {(data.isValidOrientador || data.orientador === '' ) ? null : <Text style={styles.errorText} >Campo inválido</Text>}

            <Text style = {styles.text}>Área: </Text>
            <View style={styles.inputContent}>
                <TextInput
                    style = {styles.input}
                    placeholder = "   Área"
                    placeholderTextColor="#00a896"
                    onChangeText = {(val) => handleAreaChange(val)}
                />
                {data.checkAreaChange ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={40}/> : null}
            </View>

            {(data.isValidArea || data.area === '' ) ? null : <Text style={styles.errorText} >Campo inválido</Text>}

            <Text style = {styles.text}>Instituto: </Text>
            <View style={styles.inputContent}>
                <TextInput
                    style = {styles.input}
                    placeholder = "   Instituto"
                    placeholderTextColor="#00a896"
                    onChangeText = {(val) => handleInstitutoChange(val)}
                />
                {data.checkInstitutoChange ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={40}/> : null}
            </View>

            {(data.isValidInstituto || data.instituto === '' ) ? null : <Text style={styles.errorText} >Campo inválido</Text>}

            <Text style = {styles.text}>Título: </Text>
            <View style={styles.inputContent}>
                <TextInput
                    style = {styles.input}
                    placeholder = "   Titulo"
                    placeholderTextColor="#00a896"
                    onChangeText = {(val) => handleTituloChange(val)}
                />
                {data.checkTituloChange ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={40}/> : null}
            </View>

            {(data.isValidTitulo || data.titulo === '' ) ? null : <Text style={styles.errorText} >Campo inválido</Text>}

            <Text style = {styles.text}>Descrição: </Text>
            <View style={styles.inputContent}>
                <TextInput
                    style = {styles.descricaoInput}
                    placeholder = "   Descrição"
                    placeholderTextColor="#00a896"
                    multiline = {true}
                    numberOfLines = {3}
                    onChangeText = {(val) => handleDescricaoChange(val)}
                />
                {data.isValidDescrip ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={40}/> : null}
            </View>

            <View style={{justifyContent: "flex-start", flexDirection: "row", marginBottom: 15}}>
                <Text style={styles.text}>Prazo para Inscrição: </Text>
                <Text onPress={showDatePicker} style={styles.dateText}>{data.prazo === "" ? "Selecionar Data" : data.prazo}</Text>
            </View>

            {show && <DateTimePicker
                testID="dateTimePicker"
                value={data.date}
                mode="date"
                display="default"
                minimumDate={dataAtual}
                onChange={handleDateChange}
            />}

            <Text style = {styles.text}>Vagas Disponíveis: </Text>
            <View style={styles.inputContent}>
                <TextInput
                    style = {styles.input}
                    placeholder = "   Número de Vagas"
                    placeholderTextColor="#00a896"
                    onChangeText = {(val) => handleVagasChange(val)}
                />

                {data.isValidVagas ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
            </View>
            <View style={{marginTop: 20, marginBottom: 50}}>
                <TouchableOpacity 
                style = {(data.isValidOrientador && data.isValidArea && data.isValidInstituto && data.isValidTitulo && data.isValidDescrip && data.isValidVagas && data.isValidPrazo) ? styles.button : styles.buttonDisabled} 
                disabled={!(data.isValidOrientador && data.isValidArea && data.isValidInstituto && data.isValidTitulo && data.isValidDescrip && data.isValidVagas && data.isValidPrazo)} 
                onPress={() => criarProjeto(usuario, data.orientador, data.titulo, data.area, data.instituto, data.descricao, data.vagas, data.prazo)}>
                    <Text style = {styles.buttonText}>Selecionar Assuntos</Text>
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
      paddingTop: 5,
      marginTop: 30,
    },
    input: {
        backgroundColor: '#03DAC6',
        fontSize: 18,
        marginRight: 15,
        marginBottom: 15,
        height: 45,
        width:275,
        color: "#6200EE",
    },
    descricaoInput: {
        backgroundColor: '#03DAC6',
        fontSize: 18,
        marginRight: 15,
        marginBottom: 15,
        height: 80,
        width:275,
        color: "#6200EE",
    },
    button: {
        height: 55,
        width: 210,
        borderWidth: 0.5,
        backgroundColor: "#6200EE",
        borderColor: "#6200EE",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius:20,
        alignSelf: "center",
        justifyContent: 'center',
    },
    buttonDisabled: {
        height: 55,
        width: 210,
        borderWidth: 0.5,
        backgroundColor: "#D1C4E9",
        borderColor: "#D1C4E9",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius:20,
        alignSelf: "center",
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: "#fff",
        textAlign: "center",
    },
    dateText: {
        fontSize: 18,
        color: "#6200EE",
        fontWeight: "300",
        marginTop: 35,
    },
    errorText:{
        color: "#E30425",
        fontSize: 16,
      },
    inputContent: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 5,
        marginHorizontal: 15,
        justifyContent: "space-evenly"
    },
    text: {
        fontSize: 20,
        fontWeight: '700',
        color: "#6200EE",
        alignSelf: "flex-start",
        marginTop: 35
    },
})