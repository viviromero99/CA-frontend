import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { getAreasDisponiveis, addAssuntos } from '../../services/professorApi';
import { AuthContext } from '../../contexts/newAuth';


export default function AssuntosEmAreasScreen({navigation, route}) {

  const { checkSession } = useContext(AuthContext);

  const { grandeArea } = route.params;
  const { projeto } = route.params;

  const [data, setData] = useState({
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
      await checkSession(projeto.usuarioCpf);
      const response = await getAreasDisponiveis(projeto.usuarioCpf, projeto.id, grandeArea);
      if (response.status == 200){
        setData({
          ...data,
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

  async function addSubareas(info) {
    try{
        const response = await addAssuntos(projeto.usuarioCpf, projeto.id, info);
        if (response.status == 200){
          Alert.alert('Sucesso!', response.data.message, [{
            text: 'Ok',
            onPress: () => navigation.navigate("Projeto", {screen: "ProjetoAbertoPreview", params: {projeto: projeto}})
          }]);

        }else{
          Alert.alert('Erro!', "Ocorreu um erro ao realizar operação", [{
            text: 'Ok',
            onPress: () => navigation.navigate("Projeto", {screen: "ProjetoAbertoPreview", params: {projeto: projeto}})
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
          selectText="Escolha assuntos..."
          selectedText="selecionados"
          confirmText="Confirmar"
          searchPlaceholderText="Pesquisar assuntos..."
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={onSelectionsChange}
          selectedItems={data.selecionados}
        />
      <View style={{marginBottom: 40}}>
          <TouchableOpacity 
          style = {data.disabled ? styles.buttonDisabled : styles.button} 
          onPress={() => {addSubareas(data.selecionados)}}
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