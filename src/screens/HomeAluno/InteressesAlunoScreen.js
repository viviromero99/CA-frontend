import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert, ActivityIndicator, Platform} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AreasBox from '../../components/AreasBox';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../contexts/newAuth';
import { getInteresses, removeInteresse } from '../../services/alunoApi';


export default function InteressesAlunoScreen({route, navigation}){

    const { getUser, checkSession } = useContext(AuthContext);

    const [selectedId, setSelectedId] = useState(null);

    const [data, setData] = useState({
        cpf: '',
        interesses: [],
        isLoading: true,
    });

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#6200EE" : "#03DAC6";
    
        return (
            <AreasBox 
            nome={item.nome}
            onSelectArea={selectedId ? () => setSelectedId(null) : () => setSelectedId(item.id)}
            style={{ backgroundColor }}
          />
        );
    };

    async function deleteInteresse(cpf, info) {

        try{
            const response = await removeInteresse(cpf, info);

            if (response.status == 200){
                const res = await getInteresses(cpf);

                if (res.status == 200){
                    setSelectedId(null);
                    Alert.alert('Sucesso!', response.data.message, [{
                        text: 'Ok',
                        onPress: () => setData({
                            ...data,
                            interesses: res.data,
                        })
                    }]);
                }
                return;
            }else{
                Alert.alert('Erro!', response.data.message, [{
                    text: 'Ok',
                }]);
                return;
            }
        }catch(err){
            console.log(err);
            return;
        }
    }
    

    useEffect(() => {
        let mounted = true;

        async function fetchInteresses() {
            try {
                const user = await getUser();
                await checkSession(user);
                if (mounted){
                    const response = await getInteresses(user);
                    if (response.status == 200 && mounted){
                        setData({
                            cpf: user,
                            interesses: response.data,
                            isLoading: false,
                        })
                        return;
                    }
                }
            } catch(e) {
                console.log(e);
            }
        }
        fetchInteresses();
        return () => mounted = false;
    }, [data]);

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
            data={data.interesses}
            keyExtractor = {(item) => item.id.toString()}
            extraData={selectedId}
            renderItem = {renderItem}
            refreshing = {true}
            numColumns = {2}
            ListEmptyComponent = {
            <View style = {styles.emptyContainer}>
              <Text style = {styles.emptyText}>Não há nenhum interesse :(</Text>
            </View>
            }
            />

            <View style={{marginTop: 10, marginBottom: 35}}>
                <TouchableOpacity style = {selectedId? styles.buttonDelete : styles.button} onPress={selectedId ? () => {deleteInteresse(data.cpf, selectedId)} : () => navigation.navigate("Interesses", {screen: "GrandesAreasAluno"})}>
                    <View style = {{flexDirection: "row", justifyContent: "center"}}>
                        <Text style = {selectedId ? styles.buttonTextDelete : styles.buttonText}>{selectedId ? "Remover" : "Adicionar Interesses"}</Text>
                        <Ionicons name={selectedId ? (Platform.OS === "ios" ? "ios-trash" : "md-trash") : null} size={21} color='#fff'/>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    button: {
        height: 55,
        width: 200,
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
    buttonDelete: {
        height: 50,
        width: 150,
        borderWidth: 0.5,
        backgroundColor: "#E30425",
        borderColor: "#E30425",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius:20,
        alignSelf: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 18,
        color: "#fff",
        textAlign: "center",
    },
    buttonTextDelete: {
        fontSize: 18,
        color: "#fff",
        textAlign: "center",
        marginRight: 13,
    },
    emptyContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        height: 450,
    },
    emptyText:{
        fontSize: 22,
        color: "#6200EE",
        textAlign: "center"
    }
})