import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AreasBox from '../../components/AreasBox';
import { getGrandesAreas } from '../../services/alunoApi';
import { AuthContext } from '../../contexts/newAuth';


export default function GrandesAreasAlunoScreen({route, navigation}){

  const { checkSession, getUser } = useContext(AuthContext);

  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState({
    grandesAreas: [],
    isLoading: true,
  })

  const renderItem = ({ item }) => {
      const backgroundColor = "#03DAC6";
  
      return (
          <AreasBox 
          nome={item.nome}
          onSelectArea={() => navigation.navigate("InteressesEmAreas", {grandeArea: item.id})}
          style={{ backgroundColor }}
        />
      );
  };

  useEffect(() => {

    async function fetchGrandesAreas() {
    try {
      const user = await getUser();
      await checkSession(user);
      const response = await getGrandesAreas();
      if (response.status == 200){
        setData({
          grandesAreas: response.data,
          isLoading: false,
        });
        return;
      }
    } catch(e) {
      console.log(e);
    }
    }
    fetchGrandesAreas();
  }, []);

  if(data.isLoading){
      return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size='small' color={"#6200EE"}/>
      </View>
      );
  }
  return(
      <View style = {styles.container}>
          <FlatList
          data={data.grandesAreas}
          keyExtractor = {(item) => item.id.toString()}
          extraData={selectedId}
          renderItem = {renderItem}
          refreshing = {true}
          numColumns = {2}
          ListEmptyComponent = {
          <View style = {styles.emptyContainer}>
            <Text style = {styles.emptyText}>Não há nenhuma grande área :(</Text>
          </View>
          }
          />
      </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    }
})