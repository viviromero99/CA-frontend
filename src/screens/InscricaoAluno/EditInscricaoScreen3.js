import React, {useEffect, useContext, useState} from 'react';
import { TextInput, StyleSheet, Text, TouchableOpacity, View, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../contexts/newAuth';
import { updateCandidatura } from '../../services/alunoApi';

export default function EditInscricaoScreen3({navigation, route}){

  const { checkSession, getUser } = useContext(AuthContext);
  const { projeto } = route.params;
  const { inscricao } = route.params;
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

  const handleDataNascChange = (selectedDate) => {
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

  async function handleUpdateInscricao(){

    let update = {};

    if (tela1.nome){
      update = {
          ...update, 
          nome: tela1.nome
      }
    };

    if (tela1.matriculaUFF){
        update = {
            ...update, 
            matriculaUFF: tela1.matriculaUFF
        }
    };

    if (tela1.curso) {
        update = {
            ...update, 
            curso: tela1.curso
        }
    };

    if (tela1.matriculaFAPERJ) {
        update = {
            ...update, 
            matriculaFAPERJ: tela1.matriculaFAPERJ
        }
    };

    if (tela1.rg) {
        update = {
            ...update, 
            rg: tela1.rg
        }
    };

    if (tela1.email) {
        update = {
            ...update, 
            email: tela1.email
        }
    };

    if (tela2.telefone){
      update = {
          ...update, 
          telefone: tela2.telefone
      }
    };

    if (tela2.celular){
        update = {
            ...update, 
            celular: tela2.celular
        }
    };

    if (tela2.cep){
        update = {
            ...update, 
            cep: tela2.cep
        }
    };

    if (tela2.endereco){
        update = {
            ...update, 
            endereco: tela2.endereco
        }
    };

    if (tela2.bairro){
        update = {
            ...update, 
            bairro: tela2.bairro
        }
    };

    if (tela2.cidade){
        update = {
            ...update, 
            cidade: tela2.cidade
        }
    };

    if (tela2.estado){
        update = {
            ...update, 
            estado: tela2.estado
        }
    };

    if (data.isValidDataNasc){
      update = {
        ...update, 
        dataNasc: data.dataNasc
      }
    };

    if (data.isValidEntradaUff){
      update = {
        ...update, 
        entradaUFF: data.entradaUFF
      }
    };

    if (data.isValidSaidaUff){
      update = {
        ...update, 
        saidaUFF: data.saidaUFF
      }
    };

    if (data.isValidLattes){
      update = {
        ...update, 
        lattes: data.lattes
      }
    };

    try{
      const response = await updateCandidatura(data.aluno, tela1.projetoId, update);
    
      if (response.status == 200){
        Alert.alert('Sucesso!', response.data.message, [
          {
            text: 'Ok',
            onPress: () => navigation.navigate("ProjetoInscritoPreview", {projeto: projeto})
          }
        ]);
      }
      else{
        Alert.alert('Erro!', response.data.message , [
            {
            text: 'Ok'
            }
        ]);
      };
      return;

    }catch(err){
      console.log(err);
      return;
    }

  }

  useEffect(() => {
    let mounted = true;

    async function check() {
      try {
        const user = await getUser();
        await checkSession(user);
        if (mounted){
          setData({
            ...data,
            aluno: user,
          });
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
            <View style={{justifyContent: "flex-start", flexDirection: "row", marginBottom: 15}}>
                <Text style={styles.text}>Data de Nascimento: </Text>
                <Text onPress={showDatePicker} style={styles.dateText}>{data.dataNasc === "" ? inscricao.dataNasc : data.dataNasc}</Text>
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
                  defaultValue = {inscricao.entradaUFF}
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
                  defaultValue = {inscricao.saidaUFF}
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
                  defaultValue = {inscricao.lattes}
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
            onPress={()=>handleUpdateInscricao()}>
                <Text style = {styles.buttonText}>Concluir Edição</Text>
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
    alignSelf: "center" 
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginTop: 13,
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