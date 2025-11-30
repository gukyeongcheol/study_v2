import { API_BASE_URL } from "./ApiConfig.js";
import axios from 'axios';

export function sendFetch(api, method, request){
    let options = {
        headers: new Headers({
            "Content-Type":"application/json"
        }),
        url:API_BASE_URL + api,
        method:method
    };

    if(request){
        options.body = JSON.stringify(request);
    }

    return fetch(options.url, options).then((response) => {
        if(response.status === 200){
            return response.json();
        }
    }).catch((error) => {
        console.log("http error");
        console.log(error);
    })
}

export async function sendAxios(api, method, request){
    try{
        const response = await axios({
            method:method,
            url:API_BASE_URL + api,
            data: request ? request : null,
            headers:{
                "Content-Type":"application/json"
            }
        });
      
        return response.data; // fetch의 response.json() 과 동일
    }
    catch(error){
        console.log("http error:",error);

        throw error;
    }
    
}