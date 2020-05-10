import api from '../../services/api'

export default async function(){
    const token = localStorage.getItem("_token");
    if(!token) return false;

    const config ={
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    
    const entidade_id = localStorage.getItem('entidade_id');
    if(!entidade_id) return false;


    try{
        await api.get(`/pescadores/${entidade_id}/registros/total/`, config);
    }catch(e){
        return false;
    }

    return true;
}