import * as WebBrowser from 'expo-web-browser';
import React, {useContext, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../contexts/newAuth';

export default function HelpAlunoScreen({navigation}){

  const { checkSession, getUser } = useContext(AuthContext);

  useEffect(() => {
    let mounted = true;
    async function check() {
      try {
        if (mounted){
          const user = await getUser();
          await checkSession(user);
        }
      } catch(e) {
          console.log(e);
      }
    }
    check();
    return () => mounted = false;
  }, []);

    return(
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>CV Lattes</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.subtext}>Cadastre seu CV Lattes:</Text>
              <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync('https://wwws.cnpq.br/cvlattesweb/pkg_cv_estr.inicio')}>
                  <Text style={styles.linkText}>https://wwws.cnpq.br/cvlattesweb/pkg_cv_estr.inicio</Text>
              </TouchableOpacity>
              <Text style={styles.subSubtext}>Não se preocupe porque são poucos dados mesmo que você terá que preencher pois está iniciando a carreira.</Text>
            </View>
            <Text style={styles.title}>Matrícula FAPERJ</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.subtext}>Faça sua matrícula na FAPERJ:</Text>
              <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync('https://sisfaperj.faperj.br/sisfaperj/')}>
                  <Text style={styles.linkText}>https://sisfaperj.faperj.br/sisfaperj/</Text>
              </TouchableOpacity>
              <Text style={styles.subSubtext}>Complete todos os dados e envie para eles. Pegue o número de matrícula no site.</Text>
            </View>
          </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    welcomeContainer: {
      alignItems: 'center',
      marginTop: 45,
      marginBottom: 20,
    },
    welcomeImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      marginLeft: -10,
    },
    inputContainer: {
      marginHorizontal: 50
    },
    title: {
      color: "#6200EE",
      fontWeight: '600',
      fontSize: 30,
      marginBottom: 30,
      marginHorizontal: 30,
      marginTop: 50,
    },
    subtext: {
      fontSize: 18,
      color: "#6200EE",
      fontWeight: "500",
      marginBottom: 15,
    },
    subSubtext: {
      fontSize: 14,
      color: "#6200EE",
      fontWeight: '300',
    },
    linkText: {
      fontSize: 15,
      color: "#03DAC6",
      marginBottom: 20,
      marginHorizontal: 15,
    },
})