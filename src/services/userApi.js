import api from './api';



//        *****  G E T   M E T H O D S  *****


export const findUser = async (cpf) => {
    try{
        const response = await api.get(`/usuarios/${cpf}`)
        return response;
    }catch(err){
        return err.response;
    }
}



//        *****  P U T   M E T H O D S  *****


export const updateUser = async (cpf, info) => {
    try{
        const response = await api.put(`/usuarios/${cpf}`, info)
        return response;
    }catch(err){
        return err.response;
    }
}


//        *****  D E L E T E   M E T H O D S  *****


export const deleteUser = async (cpf) => {
    try{
        const response = await api.delete(`/usuarios/${cpf}`)
        return response;
    }catch(err){
        return err.response;
    }
}