import axios from 'axios'

const API_BASE_URL = 'https://api.met.no/weatherapi'

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'weatherApp/1.0 (tiberioursan@gmail.com)'
    },
})

export default apiClient