import api from './api';



//        *****  P O S T   M E T H O D S  *****


export const addInteresses = async (cpf, interesses) => {
    try{
        const response = await api.post(`/usuarios/alunos/${cpf}/interesses`, interesses);
        return response;
    }catch(err){
        return err.response;
    }
}


export const createInscricao = async (cpf, projeto, candidatura) => {
    try{
        const response = await api.post(`/usuarios/alunos/${cpf}/candidaturas/${projeto}`, candidatura);
        return response;
    }catch(err){
        return err.response;
    }
}


//        *****  G E T   M E T H O D S  *****


export const getProjetosSugeridos = async (cpf) => {
    try{
        const response = await api.get(`/usuarios/alunos/${cpf}/sugestoes`)
        return response;
    }catch(err){
        return err.response;
    }
}

export const getProjetosInscritos = async (cpf) => {
    try{
        const response = await api.get(`/usuarios/alunos/${cpf}/candidaturas`)
        return response;
    }catch(err){
        return err.response;
    }
}

export const getInscricao = async (cpf, projeto) => {
    try{
        const response = await api.get(`/usuarios/alunos/${cpf}/candidaturas/${projeto}`)
        return response;
    }catch(err){
        return err.response;
    }
}

export const getProjetosSelecionados = async (cpf) => {
    try{
        const response = await api.get(`/usuarios/alunos/${cpf}/selecoes`)
        return response;
    }catch(err){
        console.log(err.response.data)
        return err.response;
    }
}

export const getInteresses = async (cpf) => {
    try{
        const response = await api.get(`/usuarios/alunos/${cpf}/interesses`)
        return response;
    }catch(err){
        return err.response;
    }
}

export const getGrandesAreas = async () => {
    try{
        const response = await api.get(`/grandesareas`)
        return response;
    }catch(err){
        return err.response;
    }
}

export const getAreas = async (cpf, grandeArea) => {
    try{
        const response = await api.get(`/usuarios/alunos/${cpf}/areas/${grandeArea}`)
        return response;
    }catch(err){
        return err.response;
    }
}


//        *****  P U T   M E T H O D S  *****


export const updateCandidatura = async (cpf, projeto, info) => {
    try{
        const response = await api.put(`/usuarios/alunos/${cpf}/candidaturas/${projeto}`, info)
        return response;
    }catch(err){
        return err.response;
    }
}


//        *****  D E L E T E   M E T H O D S  *****


export const removeInteresse = async (cpf, info) => {
    try{
        const response = await api.delete(`/usuarios/alunos/${cpf}/interesses/${info}`)
        return response;
    }catch(err){
        return err.response;
    }
}

export const deleteInscricao = async (cpf, projeto) => {
    try{
        const response = await api.delete(`/usuarios/alunos/${cpf}/candidaturas/${projeto}`)
        return response;
    }catch(err){
        return err.response;
    }
}

export const deleteInscricoes = async (cpf) => {
    try{
        const response = await api.delete(`/usuarios/alunos/${cpf}/candidaturas/`)
        return response;
    }catch(err){
        return err.response;
    }
}

