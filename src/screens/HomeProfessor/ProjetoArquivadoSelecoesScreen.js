import React, {useState, useEffect, useContext} from 'react';
import { Platform, StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CandidatoBox from '../../components/CandidatoBox';
import { getSelecionados } from '../../services/professorApi';
import {AuthContext} from '../../contexts/newAuth'

export default function ProjetoArquivadoSelecoesScreen({route, navigation}) {

  const { checkSession } = useContext(AuthContext);

  const { projeto } = route.params;

  const [data, setData] = useState({
    selecionados: [],
    isLoading: true,
  });

  useEffect(() => {
    let mounted = true;

    async function fetchSelecionados() {
      try {
        await checkSession(projeto.usuarioCpf);
        const response = await getSelecionados(projeto.usuarioCpf, projeto.id);
        if (response.status == 200 && mounted){
          setData({
            selecionados: response.data,
            isLoading: false,
          });
          return;
        }
      } catch(e) {
          console.log(e);
      }
    }
    fetchSelecionados();
    return () => mounted = false;
  }, [data]);

  const renderItem = ({ item }) => {
    return (
        <CandidatoBox {...item} 
        color = "#6200EE"
        onSelectCandidato = {() => navigation.navigate("SelecionadoArquivadoPreview", {selecionado: item, projeto: projeto})}
        />
    );
  };

  if(data.isLoading){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size='small' color={"#6200EE"}/>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
      data={data.selecionados}
      keyExtractor = {(item) => item.id.toString()}
      numColumns={2}
      ListEmptyComponent = {
        <View style = {styles.emptyContainer}>
          <Text style = {styles.emptyText}>Não há nenhum candidato selecionado :(</Text>
        </View>
      }
      renderItem = {renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "space-evenly"
  },
  button: {
    height: 50,
    width: 190,
    borderWidth: 0.5,
    backgroundColor: "#6200EE",
    borderColor: "#6200EE",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius:20,
    alignSelf: "center",
    justifyContent: "center" 
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: 600,
  },
  emptyText:{
      fontSize: 19,
      color: "#6200EE",
      textAlign: "center"
  }
});