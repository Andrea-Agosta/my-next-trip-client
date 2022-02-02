import axios from "axios";
import {BACKEND_URL} from "../config";


async function serverConnection(method, path, queryParams){
    let options = {
        method: method,
        url: BACKEND_URL + path,
        params: queryParams
    };

    return await axios.request(options).then(response => {
        return response;
    }).catch(function (error) {
        console.error(error);
        return error;
    });
}

export default serverConnection;