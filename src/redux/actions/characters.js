import * as types from '../types/characters'
import { fetch, post } from 'react_native_app/src/webservices/webservices'

function updateCharactersList(value) { 
    return {
        type: types.CHARACTERS_UPDATE_LIST,
        value: value
    }
}

function setCharactersFetching(value) {
    return {
        type: types.CHARACTERS_SET_FETCHING,
        value: value
    }
}

export function updateCharacterSelected(value) {
    return {
        type: types.CHARACTERS_UPDATE_CHARACTER,
        value
    }
}

export function fetchCharactersList(houseId) {
    return (dispatch, getState) => {

        // Forma alternativa de acceder al state global
        // const state = getState()
        // const houseIdAlternativo = state.houses.item ? state.houses.item.id : null

        dispatch(setCharactersFetching(true))
        dispatch(updateCharactersList([]))
    
        const fetchUrl = '/personajes?casa=' + houseId
        fetch( fetchUrl ).then(response => {

            console.log("fetchCharactersList response: ", response)
            dispatch(setCharactersFetching(false))
            dispatch(updateCharactersList(response.records)) // Actualizamos el reducer con el listado

        }).catch( error => {

            console.log("fetchCharactersList error: ", error)
            dispatch(setCharactersFetching(false))

        })
    }
}