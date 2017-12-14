import * as types from '../types/houses'
import { fetch, post } from 'react_native_app/src/webservices/webservices'


function updateHousesList(value) { // Función que devuelve el action que actualiza el reducer
    return {
        type: types.HOUSES_UPDATE_LIST,
        value: value,
    }
}

export function fetchHousesList() { // Función que carga del WS el listado
    return (dispatch, getState) => {

        const fetchUrl = '/casas'
        fetch(fetchUrl).then( response => {
            console.log("fetch response: ", response)
            const list = response.records
            dispatch(updateHousesList(list))
        }).catch( error => {
            console.log("error: ", error)
        })
               
    }
}