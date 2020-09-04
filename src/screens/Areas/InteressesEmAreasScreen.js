import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { AuthContext } from '../../contexts/newAuth';
import { getAreas, addInteresses } from '../../services/alunoApi';

export default function InteressesEmAreasScreen({navigation, route}) {

  const { getUser, checkSession } = useContext(AuthContext);

  const { grandeArea } = route.params;

  const [data, setData] = useState({
    usuario: '',
    areas: [],
    selecionados: [],
    disabled: true,
    isLoading: true,
  })

  const onSelectionsChange = selecionados => {
    if (selecionados !== []){
      setData({
        ...data,
        selecionados: selecionados,
        disabled: false,
      })
    }else{
      setData({
        ...data,
        selecionados: selecionados,
        disabled: true,
      })
    }
    console.log(selecionados);
  }

  useEffect(() => {

    async function fetchAreas() {
      try {
        const user = await getUser();
        await checkSession(user);
        const response = await getAreas(user, grandeArea);
        if (response.status == 200){
          setData({
            ...data,
            usuario: user,
            areas: response.data,
            isLoading: false,
          });
          return;
        }
      } catch(e) {
        console.log(e);
      }
    }
    fetchAreas();
  }, []);

  async function addInterests(cpf, info) {
    try{
        const response = await addInteresses(cpf, info);
        if (response.status == 200){
          Alert.alert('Sucesso!', response.data.message, [{
            text: 'Ok',
            onPress: () => navigation.navigate("MeusInteressesStack", {screen: "Meus Interesses"})
          }]);
        }else {
          Alert.alert('Erro!', "Ocorreu um erro ao realizar operação", [{
            text: 'Ok',
            onPress: () => navigation.navigate("MeusInteressesStack", {screen: "Meus Interesses"})
          }]);
        }
        return;

    }catch(err){
        console.log(err);
    }
  }

  if(data.isLoading){
      return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size='small' color={"#6200EE"}/>
      </View>
      );
  }
  return (
    <View style={[styles.container, {justifyContent: 'space-between'}]}>
        <SectionedMultiSelect
          items={data.areas}
          uniqueKey="id"
          displayKey="nome"
          selectChildren={true}
          subKey="Subareas"
          selectText="Escolha interesses..."
          selectedText="selecionados"
          confirmText="Confirmar"
          searchPlaceholderText="Pesquisar interesses..."
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={onSelectionsChange}
          selectedItems={data.selecionados}
        />
      <View style={{marginBottom: 40}}>
          <TouchableOpacity 
          style = {data.disabled ? styles.buttonDisabled : styles.button} 
          onPress={() => {addInterests(data.usuario, data.selecionados)}}
          disabled={data.disabled}>
              <Text style = {styles.buttonText}>Concluir</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  button: {
    height: 55,
    width: 170,
    borderWidth: 0.5,
    backgroundColor: "#6200EE",
    borderColor: "#6200EE",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius:20,
    alignSelf: "center",
    justifyContent: 'center'
  },
  buttonDisabled: {
    height: 55,
    width: 170,
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
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
});