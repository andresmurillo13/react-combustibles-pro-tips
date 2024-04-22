import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'
import mapboxgl from 'mapbox-gl'; 

mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmVzbXVyaWxsbzEzIiwiYSI6ImNsdTRwc2ZpNTBlM2cyaW5vbm9jY2t5cHUifQ.plWF3v3JEwzpUoptAXuJ6g';

if (!navigator.geolocation) {
  alert('Tu navegador no tiene opción de Geolocation');
  throw new Error('Tu navegador no tiene opción de Geolocation');
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
