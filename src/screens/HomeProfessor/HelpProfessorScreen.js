import React, {useContext, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import { AuthContext } from '../../contexts/newAuth';

export default function HelpProfessorScreen({navigation}){

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
          <Text style={styles.title}>Criar Projeto</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.subtext}>Criar um projeto implica abrir as inscrições para alunos que visualizam o seu projeto em seus feeds.</Text>
            <Text style={styles.subtext}>A partir disso você pode então:</Text>
            <Text style={styles.linkText}>Editar alguns dados do projeto;</Text>
            <Text style={styles.linkText}>Fechar as incrições para o projeto, mesmo que o prazo ainda não tenha chegado;</Text>
            <Text style={styles.linkText}>Editar os assuntos associados ao projeto.</Text>
            <Text style={styles.subtext}> Visto que um projeto só chega ao feed de um aluno se, pelo menos um assunto do projeto, for de interesse do aluno, é importante que os assuntos sejam escolhidos com atenção.</Text>
          </View>
          <Text style={styles.title}>Fechar Inscrições de Projeto</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.subtext}>Fechar inscrições em um projeto implica em poder visualizar e selecionar os candidados que preencheram todos os dados pedidos na inscrição.</Text>
            <Text style={styles.subtext}>A partir disso você pode então:</Text>
            <Text style={styles.linkText}>Selecionar os candidatos, de acordo com a análise de seus dados;</Text>
            <Text style={styles.linkText}>Abrir novamente as incrições para o projeto;</Text>
            <Text style={styles.linkText}>Após selecionar os candidatos para as vagas oferecidas, arquivar o projeto.</Text>
          </View>
          <Text style={styles.title}>Arquivar Projeto</Text>
          <View style={[styles.inputContainer, {marginBottom: 35}]}>
            <Text style={styles.subtext}>Arquivar um projeto implica em fechar completamente as incrições para o projeto.</Text>
            <Text style={styles.subtext}>Esta ação é irreversível e só poderá ser realizada após preenchimento das vagas do projeto.</Text>
            <Text style={styles.subtext}>Projetos arquivados ficam salvos na conta do professor, assim como os selecionados para o projeto.</Text>
          </View>
        </ScrollView>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'space-evenly',
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
      marginTop:35
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
      fontSize: 16,
      color: "#03DAC6",
      marginBottom: 10,
      marginHorizontal: 15,
    },
})