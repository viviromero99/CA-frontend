import React, { useContext, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { AuthContext } from '../../contexts/newAuth';

import { Criterios } from '../../data/CriteriosData';

export default function CriteriosScreen({navigation, route}) {

  const { checkSession, getUser } = useContext(AuthContext);
  const { projeto } = route.params;

  useEffect(() => {
      async function check() {
          try {
            const user = await getUser();
            await checkSession(user);
          } catch(e) {
              console.log(e);
          }
      }
      check();
  }, []);

  return (
    <View style = {styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.contentTextTitle}>Para se increver para a bolsa do projeto você precisa satisfazer os seguintes critérios:</Text>
      </View>
      <FlatList
        keyExtractor = {Criterios.id}
        data={Criterios}
        renderItem = {({item}) => 
          <View style = {styles.contentContainer2}>
            <Text style={styles.contentText}>{item.conteudo}</Text>
          </View>
        }
      />
      <View style={{marginTop: 10, marginBottom: 20}}>
        <TouchableOpacity 
        style = {styles.button} 
        onPress={()=>{navigation.navigate("Inscricao1", {projeto: projeto})}}>
          <Text style = {styles.buttonText}>Continuar</Text>
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
  contentContainer:{
    padding: 20,
    backgroundColor: "#6200EE",
    justifyContent: "center",
  },
  contentTextTitle:{
    fontSize: 20,
    textAlign:"center",
    color: "#fff"
  },
  button: {
    height: 55,
    width: 175,
    borderWidth: 0.5,
    backgroundColor: "#03DAC5",
    borderColor: "#03DAC5",
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
  contentContainer2:{
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#6200EE',
    padding: 10,
},
  contentText:{
    fontSize: 20,
    color: '#6200EE',
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 14,
}
});