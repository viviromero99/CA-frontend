import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ProjectBox from '../../components/ProjectBox';
import { AuthContext } from '../../contexts/newAuth';
import { getProjetosFechados } from '../../services/professorApi';  


export default function FechadosScreen({navigation}) {

  const { getUser, checkSession } = useContext(AuthContext);

  const [data, setData] = useState({
    cpf: '',
    projetos: [],
    isLoading: true,
  });

  useEffect(() => {

    async function fetchProjetos() {
      let mounted = true;
      try {
        const user = await getUser();
        await checkSession(user);
        if (mounted){
          const response = await getProjetosFechados(user);
          if (response.status == 200){
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
          <Text style = {styles.emptyText}>Não há nenhum projeto com inscrições encerradas</Text>
        </View>
      }
      renderItem = {({item}) => <ProjectBox {...item} 
                                  info = {`${item.selecionados}/${item.vagas} selecionados`}
                                  icon = {item.vagas == item.selecionados ? (Platform.OS === "ios" ? "ios-checkmark-circle" : "md-checkmark-circle") : (Platform.OS === "ios" ? "ios-construct" : "md-construct")} 
                                  size = {item.vagas == item.selecionados ? 35 : 25}
                                  area = {null}
                                  color = {item.vagas == item.selecionados ? "#03DAC6" : "#fff"}
                                  onSelectProject = {() => navigation.navigate("Projeto", {screen: "ProjetoFechadoPreview", params: {projeto: item}})}/>}/>
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
    height: 500,
  },
  emptyText:{
      fontSize: 19,
      color: "#6200EE",
      textAlign: "center"
  }
});