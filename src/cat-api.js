import axios from "axios";

let API_KEY = axios.defaults.headers.common["x-api-key"];
axios.defaults.headers.common["x-api-key"] = "live_7KcFQokTXWuCg2QTmACVWjZ5SfTFjPueMy59pCERFjtpnT1nWhBo4ZjmwfcuwrSb";

export function fetchBreeds() {
    return axios.get("https://api.thecatapi.com/v1/breeds")
    .then((resp) => {return resp.data})
    
    
}



export function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(resp => { return resp.data})
    
    

}
