import React, {useState, useEffect, useContext} from 'react';
import { Platform, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ProjectBox from '../../components/ProjectBox';
import { getProjetosArquivados } from '../../services/professorApi';
import { AuthContext } from '../../contexts/newAuth';

export default function ProjetosArquivadosScreen({navigation}) {
  
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
        if(mounted){
          const response = await getProjetosArquivados(user);
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
          <Text style = {styles.emptyText}>Não há nenhum projeto arquivado :(</Text>
        </View>
      }
      renderItem = {({item}) => <ProjectBox {...item} 
                                icon = {Platform.OS === "ios" ? "ios-document" : "md-document"}
                                size = {45}
                                info = {`${item.area}`}
                                area = {null}
                                onSelectProject = {() => navigation.navigate("ProjetoArquivadoPreview", {projeto: item})}
                                />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
