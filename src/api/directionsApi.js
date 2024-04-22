import axios from "axios";

const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: 'pk.eyJ1IjoiYW5kcmVzbXVyaWxsbzEzIiwiYSI6ImNsdTRwc2ZpNTBlM2cyaW5vbm9jY2t5cHUifQ.plWF3v3JEwzpUoptAXuJ6g'
    }
})

export default directionsApi;