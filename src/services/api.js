import Axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

export async function getUsers(limit){
    return Axios.get(`${baseUrl}/users/sickest/${limit}`).then(res => res.data["data"]);
}


export async function sleep(miliseconds){
    return new Promise(r => setTimeout(r, miliseconds));
}

