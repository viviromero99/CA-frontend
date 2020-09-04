import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ProjectBox from '../../components/ProjectBox';

import { AuthContext } from '../../contexts/newAuth';
import { getProjetosInscritos } from '../../services/alunoApi';

export default function HomeInscricoesScreen({navigation}) {

  const { getUser, checkSession } = useContext(AuthContext);

  const [data, setData] = useState({
    cpf: '',
    projetos: [],
    isLoading: true,
  });

  useEffect(() => {
    let mounted = true;

    async function fetchInscricoes() {
      try {
        const user = await getUser();
        await checkSession(user);
        if(mounted){
          const response = await getProjetosInscritos(user);
          console.log(response.data)
          if (response.status == 200){
            console.log(response.data)
            setData({
              cpf: user,
              projetos: response.data,
              isLoading: false,
            });
            return;
          }
        }
      } catch(e) {
          console.log(e);
      }
    }
    fetchInscricoes();
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
          <Text style = {styles.emptyText}>Não há nenhuma inscrição em projeto :(</Text>
        </View>
      }
      renderItem = { ({item}) => <ProjectBox {...item} 
                                  info = {item.estaAberto ? `até ${item.prazo}` : " Inscrições encerradas"}
                                  icon = {item.completo ? (Platform.OS === "ios" ? "ios-checkbox-outline" : "md-checkbox-outline") : (Platform.OS === "ios" ? "ios-square-outline" : "md-square-outline")} 
                                  size = {40}
                                  color = {item.completo ? "#03DAC6" : "#fff"}
                                  onSelectProject = {() => navigation.navigate("Inscricao", {screen: "ProjetoInscritoPreview", params: {projeto: item}})}/>}/>
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
