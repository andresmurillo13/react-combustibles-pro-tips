import axios from "axios";

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        language: 'es',
        country: 'co',
        access_token: 'pk.eyJ1IjoiYW5kcmVzbXVyaWxsbzEzIiwiYSI6ImNsdTRwc2ZpNTBlM2cyaW5vbm9jY2t5cHUifQ.plWF3v3JEwzpUoptAXuJ6g'
    }
})

export default searchApi;