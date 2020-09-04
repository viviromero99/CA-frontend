import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import ProjectBox from '../../components/ProjectBox';
import { AuthContext } from '../../contexts/newAuth';
import { getProjetosSelecionados } from '../../services/alunoApi';  


export default function HomeSelecoesScreen({navigation}) {
  const { getUser, checkSession } = useContext(AuthContext);

  const [data, setData] = useState({
    cpf: '',
    projetos: [],
    isLoading: true,
  });

  useEffect(() => {
    let mounted = true;

    async function fetchProjetos() {
      try {
        const user = await getUser();
        await checkSession(user);
        if (mounted){
          const response = await getProjetosSelecionados(user);
          if (response.status == 200 && mounted){
            setData({
              cpf: user,
              projetos: response.data,
              isLoading: false
            });
            return;
          }
        }
      } catch(e) {
          console.log(e);
      }
    }
    fetchProjetos();
    return () => mounted = false;
  }, [data]);

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
      data={data.projetos}
      keyExtractor = {(item) => item.id.toString()}
      ListEmptyComponent = {
        <View style = {styles.emptyContainer}>
          <Text style = {styles.emptyText}>Você não foi selecionado para nenhum projeto :(</Text>
        </View>
      }
      renderItem = {({item}) => <ProjectBox {...item} 
                                icon = {Platform.OS === "ios" ? "ios-document" : "md-document"}
                                size = {45}
                                onSelectProject = {() => navigation.navigate("Inscricao", {screen: "ProjetoSelecionadoPreview", params: {projeto: item}})}/>}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: 550,
  },
  emptyText:{
      fontSize: 19,
      color: "#6200EE",
      textAlign: "center"
  }
});
