import api from './api';




//        *****  P O S T   M E T H O D S  *****


export const addAssuntos = async (cpf, projeto, assuntos) => {

    try{
        const response = await api.post(`/usuarios/professores/${cpf}/projetos/${projeto}/assuntos`, assuntos);
        return response;
    }catch(err){
        return err.response;
    }
}

export const createProjeto = async (cpf, orientador, titulo, area, instituto, descricao, vagas, prazo) => {
    try{
        const response = await api.post(`/usuarios/professores/${cpf}/projetos`, {
            orientador: orientador,
            titulo: titulo,
            area: area,
            instituto: instituto,
            descricao: descricao,
            vagas: vagas,
            prazo: prazo,
        });
        
        return response;
    }catch(err){
        return err.response;
    }
}



//        *****  G E T   M E T H O D S  *****


export const findProjeto = async (cpf, projeto) => {
    try{
        const response = await api.get(`/usuarios/professores/${cpf}/projetos/${projeto}`)
        return response;
    }catch(err){
        return err.response;
    }
}

export const getSelecionados = async (cpf, projeto) => {
    try{
        const response = await api.get(`/usuarios/professores/${cpf}/projetos/${projeto}/selecionados`)
        return response;
    }catch(err){
        return err.response;
    }
}

export const getCandidaturas = async (cpf, projeto) => {
    try{
        const response = await api.get(`/usuarios/professores/${cpf}/projetos/${projeto}/candidaturas`)
        return response;
    }catch(err){
        return err.response;
    }
}

export const getAssuntos = async (cpf, projeto) => {
    try{
        const response = await api.get(`/usuarios/professores/${cpf}/projetos/${projeto}/assuntos`)
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

export const getAreasDisponiveis = async (cpf, projeto, grandeArea) => {
    try{
        const response = await api.get(`/usuarios/professores/${cpf}/projetos/${projeto}/areas/${grandeArea}`)
        return response;
    }catch(err){
        return err.response;
    }
}

export const getProjetosAbertos = async (cpf) => {
    try{
        const response = await api.get(`/usuarios/professores/${cpf}/abertos`)
        return response;
    }catch(err){
        return err.response;
    }
}

export const getProjetosFechados = async (cpf) => {
    try{
        const response = await api.get(`/usuarios/professores/${cpf}/fechados`)
        return response;
    }catch(err){
        return err.response;
    }
}

export const getProjetosArquivados = async (cpf) => {
    try{
        const response = await api.get(`/usuarios/professores/${cpf}/arquivados`)
        return response;
    }catch(err){
        return err.response;
    }
}



//        *****  P U T   M E T H O D S  *****


export const updateProject = async (cpf, projeto, info) => {
    try{
        const response = await api.put(`/usuarios/professores/${cpf}/projetos/${projeto}`, info)
        return response;
    }catch(err){
        return err.response;
    }
}

export const selectAluno = async (cpf, projeto, candidatura, info) => {
    try{
        const response = await api.put(`/usuarios/professores/${cpf}/projetos/${projeto}/candidaturas/${candidatura}`, info)
        return response;
    }catch(err){
        return err.response;
    }
}

export const updateCandidaturas = async (cpf, projeto, info) => {
    try{
        const response = await api.put(`/usuarios/professores/${cpf}/projetos/${projeto}/candidaturas`, info)
        return response;
    }catch(err){
        return err.response;
    }
}


//        *****  D E L E T E   M E T H O D S  *****


export const removeAssunto = async (cpf, projeto, info) => {
    try{
        const response = await api.delete(`/usuarios/professores/${cpf}/projetos/${projeto}/assuntos/${info}`)
        return response;
    }catch(err){
        return err.response;
    }
}

export const deleteCandidaturasNaoSelecionadas = async (cpf, projeto) => {
    try{
        const response = await api.delete(`/usuarios/professores/${cpf}/projetos/${projeto}/candidaturasNonSelected`)
        return response;
    }catch(err){
        return err.response;
    }
}

export const deleteCandidaturasIncompletas = async (cpf, projeto) => {
    try{
        const response = await api.delete(`/usuarios/professores/${cpf}/projetos/${projeto}/candidaturasIncompletas`)
        return response;
    }catch(err){
        return err.response;
    }
}

export const deleteProjeto = async (cpf, projeto) => {
    try{
        const response = await api.delete(`/usuarios/professores/${cpf}/projetos/${projeto}`)
        return response;
    }catch(err){
        return err.response;
    }
}

export const deleteProjetos = async (cpf) => {
    try{
        const response = await api.delete(`/usuarios/professores/${cpf}/projetos/`)
        return response;
    }catch(err){
        return err.response;
    }
}