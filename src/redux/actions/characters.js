import * as types from '../types/characters'
import { fetch, post, remove } from 'react_native_app/src/webservices/webservices'
import { Actions } from 'react-native-router-flux'
import qs from 'qs'


function updateCharactersList(list, total) { 
    return {
        type: types.CHARACTERS_UPDATE_LIST,
        list,
        total,
    }
}

export function updateCharactersListOffset(value){
    return {
        type: types.CHARACTERS_UPDATE_LIST_OFFSET,
        value,
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

export function initCharactersList(){
    return (dispatch, getState) => {

        // Rest characters list and set total to 0
        dispatch(updateCharactersList([], 0))

        // Set offset to 0
        dispatch(updateCharactersListOffset(0))

        // Fetch list
        dispatch(fetchCharactersList())
    }
}



export function fetchCharactersList() {
    return (dispatch, getState) => {

        

        dispatch(setCharactersFetching(true))
        //dispatch(updateCharactersList([]))

        const state = getState() // Get redux state
        const houseId = state.houses.item ? state.houses.item.id : null // Get selected house id
        const list = state.characters.list // Get current characters list

        const offset = state.characters.offset
        const limit = 10

        const filters = {
            casa: houseId,
            offset: offset,
            limit: limit,
        }
    
        const fetchUrl = '/personajes?' + qs.stringify(filters)
        
        fetch( fetchUrl ).then(response => {

            console.log("fetchCharactersList response: ", response)
            dispatch(setCharactersFetching(false))

            const newList = [...list, ...response.records] // Concat current list with new results
            dispatch(updateCharactersList(newList, response.total)) // Actualizamos el reducer con el listado

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

/*export function postCharacter(data){
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
}*/

export function postCharacter(data) {
    return (dispatch, getState) => {

        dispatch(setCharactersFetching(true))
        const state = getState()
        const house = state.houses.item

        const fetchUrl = '/personajes'
        post(fetchUrl, data).then( response => {

            dispatch(setCharactersFetching(false))
            console.log("postCharacter response: ", response)

            if (response.record) {
                dispatch(fetchCharactersList(house.id))
                dispatch(updateCharacterSelected(null))
                Actions.pop()
            }

        }).catch( error => {
            dispatch(setCharactersFetching(false))
            console.log("postCharacter error: ", error)
        })
    }
} 