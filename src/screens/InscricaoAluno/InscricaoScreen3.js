import React, {useEffect, useContext, useState} from 'react';
import { TextInput, StyleSheet, Text, TouchableOpacity, View, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../contexts/newAuth';
import { createInscricao } from '../../services/alunoApi'
import { ScrollView } from 'react-native-gesture-handler';


export default function InscricaoScreen3({navigation, route}){

  const { checkSession, getUser } = useContext(AuthContext);
  const { tela1 } = route.params;
  const { tela2 } = route.params;

  const dataAtual = new Date();

  const [show, setShow] = useState(false)
  const [data, setData] = useState({
      aluno: "",
      date: dataAtual,
      dataNasc: "",
      entradaUFF: "",
      saidaUFF: "",
      lattes: "",
      isValidDataNasc: false,
      isValidEntradaUff: false,
      isValidSaidaUff: false,
      isValidLattes: false
  })
  

  const showDatePicker = () => {
    setShow(!show);
  };

  const handleDataNascChange = (event, selectedDate) => {
    const currentDate = selectedDate || data.date;
    const str = currentDate.toISOString();

    let dat = str.slice(0,10);

    // Extract the string into month, date and year
    let pdate = dat.split('-');
    
    const resultDate = `${pdate[2]}/${pdate[1]}/${pdate[0]}`
    
    setData({
        ...data,
        date: currentDate,
        dataNasc: resultDate,
        isValidDataNasc: true,
    })
    setShow(false);
  }

  const handleEntradaUffChange = (val) => {
    let reg = /^\d{4}(\/)((1)|(2))$/;

    if(reg.test(val) === true) {
    setData({
        ...data,
        entradaUFF: val,
        isValidEntradaUff: true
    });
    } else {
    setData({
        ...data,
        entradaUFF: val,
        isValidEntradaUff: false
    });
    }
  }

  const handleSaidaUffChange = (val) => {
    let reg = /^\d{4}(\/)((1)|(2))$/;

    if(reg.test(val) === true) {
    setData({
        ...data,
        saidaUFF: val,
        isValidSaidaUff: true
    });
    } else {
    setData({
        ...data,
        saidaUFF: val,
        isValidSaidaUff: false
    });
    }
  }

  const handleCVlattesChange = (val) => {
    let reg = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

    if(reg.test(val) === true) {
    setData({
        ...data,
        lattes: val,
        isValidLattes: true
    });
    } else {
    setData({
        ...data,
        lattes: val,
        isValidLattes: false
    });
    }
  }

  async function handleInscricao(dataNasc, entradaUFF, saidaUFF, lattes){

    let nasc = ""
    let entrada = ""
    let saida = ""
    let cvlattes = ""

    if (data.isValidDataNasc == false) nasc = null;

    if (data.isValidDataNasc == true) nasc = dataNasc;

    if (data.isValidEntradaUff == false) entrada = null;

    if (data.isValidEntradaUff == true) entrada = entradaUFF;

    if (data.isValidSaidaUff == false) saida = null;

    if (data.isValidSaidaUff == true) saida = saidaUFF;

    if (data.isValidLattes == false) cvlattes = null;

    if (data.isValidLattes == true) cvlattes = lattes;

    const inscricao = {
      nome: tela1.nome, 
      matriculaUFF: tela1.matriculaUFF, 
      curso: tela1.curso, 
      matriculaFAPERJ: tela1.matriculaFAPERJ, 
      rg: tela1.rg, 
      email: tela1.email,
      telefone: tela2.telefone, 
      celular: tela2.celular, 
      cep: tela2.cep, 
      endereco: tela2.endereco, 
      bairro: tela2.bairro, 
      cidade: tela2.cidade, 
      estado: tela2.estado,
      dataNasc: nasc,
      entradaUFF: entrada,
      saidaUFF: saida,
      lattes: cvlattes,
    }

    console.log(inscricao);

    try{
      const response = await createInscricao(data.aluno, tela1.projetoId, inscricao);
    
      if (response.status == 200){
        Alert.alert('Sucesso!', response.data.message, [
          {
            text: 'Ok',
            onPress: () => navigation.navigate("HomeAluno")
          }
        ]);
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
    }

  }

  useEffect(() => {
        async function check() {
          try {
            const user = await getUser();
            await checkSession(user);
            setData({
              ...data,
              aluno: user,
            });
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
        
            <View style={{justifyContent: "flex-start", flexDirection: "row", marginBottom: 15}}>
                <Text style={styles.text}>Data de Nascimento: </Text>
                <Text onPress={showDatePicker} style={styles.dateText}>{data.dataNasc === "" ? "Selecionar Data" : data.dataNasc}</Text>
            </View>

            {show && <DateTimePicker
                    testID="dateTimePicker"
                    value={data.date}
                    mode="date"
                    display="default"
                    maximumDate={dataAtual}
                    onChange={handleDataNascChange}
            />}

            <Text style = {styles.text}>Ano/Semestre de Entrada na UFF: </Text>
            <View style={styles.inputContent}>
              <TextInput
                  style = {styles.input}
                  placeholder = "   Ano/Semestre de Entrada na UFF"
                  placeholderTextColor="#00a896"
                  onChangeText = {val => handleEntradaUffChange(val)}
              />

              {data.isValidEntradaUff ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
            </View>

            <Text style = {styles.text}>Ano/Semestre de Previsão de Colação: </Text>
            <View style={styles.inputContent}>
              <TextInput
                  style = {styles.input}
                  placeholder = "   Ano/Semestre de Previsão de Colação"
                  placeholderTextColor="#00a896"
                  onChangeText = {val => handleSaidaUffChange(val)}
              />

              {data.isValidSaidaUff ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
            </View>

            <Text style = {styles.text}>CV Lattes: </Text>
            <View style={styles.inputContent}>
              <TextInput
                  style = {styles.input}
                  placeholder = "   Link do CV Lattes"
                  placeholderTextColor="#00a896"
                  onChangeText = {val => handleCVlattesChange(val)}
              />
              {data.isValidLattes ? <Ionicons name={Platform.OS === "ios" ? "ios-checkmark": "md-checkmark"} color="#03DAC6" size={50}/> : null}
            </View>
            <View style={styles.helpContainer}>
              <Text style = {styles.helpText1}>Não tem um CV Lattes?  </Text>
              <TouchableOpacity onPress={()=>{navigation.navigate("AjudaAlunoStack", {screen: "AjudaAluno"})}}>
                  <Text style = {styles.helpText2}>Clique aqui</Text>
              </TouchableOpacity>
            </View>
            
        </View>
        <View style={{marginTop: 180, marginBottom: 20}}>
            <TouchableOpacity 
            style = {styles.button} 
            onPress={()=>handleInscricao(data.dataNasc, data.entradaUFF, data.saidaUFF, data.lattes)}>
                <Text style = {styles.buttonText}>Concluir Inscrição</Text>
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
  dateText: {
    fontSize: 18,
    color: "#6200EE",
    fontWeight: "300",
    marginTop: 35,
  },
})