import api from '../../services/api'
export default function(){
    const entidade_id = localStorage.getItem('entidade_id');
    const token = localStorage.getItem("_token");
    const config ={
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    return api.get(`/pescadores/${entidade_id}/registros/total/`, config);
}