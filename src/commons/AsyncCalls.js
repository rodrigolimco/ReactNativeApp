import axios from 'axios'

export function fetchHousesList() {
    return axios.get('/casas')
    
}