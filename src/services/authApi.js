import api from './api';


export const loginUser = async (cpf, senha) => {
    try{
        const response = await api.post('/auth/login', {cpf: cpf, senha: senha });
        return response;
    }catch(err){
        return err.response
    }
}

export const verifyToken = async (cpf) => {
    try{
        const response = await api.get(`/auth/verifyToken/${cpf}`);
        return response;
    }catch(err){
        return err.response
    }
}

export const refreshSession = async (cpf) => {
    try{
        const response = await api.get(`/auth/newSession/${cpf}`);
        return response;
    }catch(err){
        return err.response
    }
}

export const registrarUser = async (nome, cpf, matricula, email, senha, tipo) => {
    try{
        const response = await api.post('/auth/cadastro', {
            nome: nome,
            cpf: cpf, 
            matricula: matricula,
            email: email,
            senha: senha,
            usuarioTipo: tipo,
        });
        
        return response;
    }catch(err){
        return err.response;
    }
}

export const checkUser = async (cpf, matricula, email) => {
    try{
        const response = await api.post('/auth/esqueciMinhaSenha', {
            cpf: cpf, 
            matricula: matricula,
            email: email
        });
        
        return response;
    }catch(err){
        return err.response;
    }
}

