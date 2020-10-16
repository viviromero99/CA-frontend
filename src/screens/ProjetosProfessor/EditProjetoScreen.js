import React, { useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform, Alert, TextInput} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';
import { updateProject } from '../../services/professorApi';
import { AuthContext } from '../../contexts/newAuth';


export default function ProjetoAbertoPreviewScreen({route, navigation}){

    const { checkSession } = useContext(AuthContext);
    const { projeto } = route.params;

    const dataAtual = new Date();

    const [show, setShow] = useState(false)
    const [data, setData] = useState({
        titulo: "",
        descricao: "",
        vagas: 0,
        date: dataAtual,
        prazo: "",
        checkTituloChange: false,
        isValidTitulo: false,
        isValidDescrip: false,
        isValidVagas: false,
        isValidPrazo: false,
    })

    const showDatePicker = () => {
        setShow(!show);
    };

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

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || data.date;
        const str = currentDate.toISOString();
        console.log(currentDate)
        let dat = str.slice(0,10);

        // Extract the string into month, date and year
        let pdate = dat.split('-');
        
        const resultDate = `${pdate[2]}/${pdate[1]}/${pdate[0]}`
        
        setData({
            ...data,
            date: currentDate,
            prazo: resultDate,
            isValidPrazo: true,
        });
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

    async function handleUpdate(){

        let update = {};
    
        if (data.checkTituloChange && data.isValidTitulo) {
          update = {
            ...update, 
            titulo: data.titulo
          }
        };

        if (data.isValidDescrip){
            update = {
                ...update, 
                descricao: data.descricao
            }
        }
    
        if (data.isValidVagas) {
          update = {
            ...update, 
            vagas: data.vagas
          }
        };
    
        if (data.isValidPrazo) {
          update = {
            ...update, 
            prazo: data.prazo
          }
        };
    
        try{
          const response = await updateProject(projeto.usuarioCpf, projeto.id, update);
    
          if (response.status == 200){
            Alert.alert('Sucesso!', 'Projeto atualizado!', [
              {
                text: 'Ok',
                onPress: () => navigation.navigate("HomeProfessorStack", { screen: "HomeProfessor"})
              }
            ]);
            return;
          }else{
            Alert.alert('Erro!', response.data.message, [
                {
                  text: 'Ok'
                }
              ]);
              return;
          }
    
        }catch(err){
          console.log(err);
          return;
        }
    
    }

    useEffect(() => {
        async function check() {
          try {
            await checkSession(projeto.usuarioCpf);
          } catch(e) {
              console.log(e);
          }
        }
        check();
    }, []);

    return(
        <View style = {styles.container}>
            <ScrollView style={styles.inputContainer}>
                <View style={styles.content}>
                    <Text style = {styles.text}>Orientador: </Text>
                    <Text style = {styles.subtext}>{projeto.orientador}</Text>
                </View>
                <View style={styles.content}>
                    <Text style = {styles.text}>Área: </Text>
                    <Text style = {styles.subtext}>{projeto.area}</Text>
                </View>
                <View style={styles.content}>
                    <Text style = {styles.text}>Instituto: </Text>
                    <Text style = {styles.subtext}>{projeto.instituto}</Text>
                </View>
                <Text style = {styles.text}>Titulo: </Text>
                <View style={styles.inputContent}>
                    <TextInput
                        style = {styles.input}
                        placeholder = {`   ${projeto.titulo}`}
                        placeholderTextColor="#00a896"
                        onChangeText = {(val) => handleTituloChange(val)}
                    />
                    {data.checkTituloChange ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
                </View>

                {(data.isValidTitulo || data.titulo === '' ) ? null : <Text style={styles.errorText} >Campo inválido</Text>}

                <Text style = {styles.text}>Descrição: </Text>
                <View style={styles.inputContent}>
                    <TextInput
                        style = {styles.descricaoInput}
                        placeholder = {`   ${projeto.descricao}`}
                        placeholderTextColor="#00a896"
                        multiline = {true}
                        numberOfLines = {3}
                        onChangeText = {(val) => handleDescricaoChange(val)}
                    />

                    {data.isValidDescrip ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
                </View>

                <View style={{justifyContent: "flex-start", flexDirection: "row"}}>
                    <Text style={styles.text}>Prazo para Inscrição: </Text>
                    <Text onPress={showDatePicker} style={styles.dateText}>{data.prazo === "" ? `${projeto.prazo}` : data.prazo}</Text>
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
                        placeholder = {`   ${projeto.vagas} vagas`}
                        placeholderTextColor="#00a896"
                        onChangeText = {(val) => handleVagasChange(val)}
                    />
                    {data.isValidVagas ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
                </View>

            </ScrollView>
            <View style={{marginTop: 20, marginBottom: 30, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <TouchableOpacity 
                style = {(data.isValidTitulo || data.isValidVagas || data.isValidPrazo || data.isValidDescrip) ? styles.button : styles.buttonDisabled} 
                disabled={!(data.isValidTitulo || data.isValidVagas || data.isValidPrazo || data.isValidDescrip)}
                onPress={() => handleUpdate()}>
                    <Text style = {styles.buttonText}>Salvar Alterações</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inputContainer: {
        marginHorizontal: 30,
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
        width: 200,
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
        width: 200,
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
        fontWeight: "bold",
        marginBottom: 15,
        fontSize: 20,
        color: "#6200EE",
        alignSelf: "flex-start",
    },
    subtext: {
        fontWeight: '300',
        marginBottom: 35,
        fontSize: 20,
        color: "#6200EE",
        alignSelf: "flex-start",
        marginLeft: 8,
    },
    content: {
        flexDirection: 'row', 
        marginBottom: 30, 
    }
  })