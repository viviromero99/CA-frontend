import React, {useContext, useEffect, useState} from 'react';
import { Platform, StyleSheet, TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ProjectBox from '../../components/ProjectBox';
import { AuthContext } from '../../contexts/newAuth';
import { getProjetosAbertos, updateProject } from '../../services/professorApi';  

export default function HomeProfessorScreen({navigation}) {
  const { getUser, checkSession } = useContext(AuthContext);

  const dataAtual = new Date();

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
          const response = await getProjetosAbertos(user);
          if (response.status == 200){
            let projsAbertos = [];
            const projs = response.data;

            for (let index = 0; index < projs.length; index++) {
              let prazo = projs[index].prazo;

              let pdate = prazo.split('/');

              let dataProj = new Date(`${pdate[2]}-${pdate[1]}-${pdate[0]}`)

              if (dataAtual.getTime() > dataProj.getTime()){
                await updateProject(user, projs[index].id, {estaAberto: false});
              }
              else {
                projsAbertos.push(projs[index]);
              }
            }
            setData({
              cpf: user,
              projetos: projsAbertos,
              isLoading: false,
            });
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
          <Text style = {styles.emptyText}>Não há nenhum projeto aberto :(</Text>
        </View>
      }
      renderItem = {({item}) => <ProjectBox {...item} 
                                  info = {`${item.candidatos} candidatos`}
                                  icon = {Platform.OS === "ios" ? "ios-document" : "md-document"}
                                  size = {40}
                                  area = {null}
                                  onSelectProject = {() => {navigation.navigate("Projeto", {screen: "ProjetoAbertoPreview", params: {projeto: item}})}}
                                  />
                                }
                                  />
        <View style={{marginTop: 10, marginBottom: 25}}>
            <TouchableOpacity style = {styles.button} onPress={() => {navigation.navigate("Projeto", {screen: "Novo Projeto", params: {usuario: data.cpf}})}}>
                <Text style = {styles.buttonText}>Criar Projeto</Text>
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
  button: {
    height: 55,
    width: 180,
    borderWidth: 0.5,
    backgroundColor: "#03DAC5",
    borderColor: "#03DAC5",
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
      textAlign: "center",
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