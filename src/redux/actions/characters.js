import * as types from '../types/characters'
import { fetch, post, remove } from 'react_native_app/src/webservices/webservices'
import { Actions } from 'react-native-router-flux'


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

export function deleteCharacter(){
    return(dispatch, getState) =>{

        dispatch(setCharactersFetching(true))
        const state= getState()
        const house = state.houses.item

        const fetchUrl = '/personajes/' + character.id
        remove( fetchUrl ).then (response => {
            dispatch(setCharactersFetching(false))
            if (response.status & response.status == 'ok'){
                dispatch(fetchCharactersList(house.id))
                dispatch(updateCharacterSelected(null))
                Actions.pop()
            }

        }).catch( error => {
            dispatch(setCharactersFetching(false))
        })
    }
}

export function postCharacter(data){
    return(dispatch, getState =>{

        dispatch(setCharactersFetching(true))
        const state= getState()
        const house = state.houses.item

        const fetchUrl = '/personajes'
        post(fetchUrl, data).then( response => {
            
            dispatch(setCharactersFetching(false))

            if (response.record){
                dispatch(fetchCharactersList(house.id))
                dispatch(updateCharacterSelected(null))
                Actions.pop()
            }

        }).catch( error => {
            dispatch(setCharactersFetching(false))
        })
    })
}