import React, { Component } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { Colors } from 'react_native_app/src/commons'
import { Actions } from 'react-native-router-flux'

// Importamos nuestra celda
import CharacterCell from './CharacterCell'

// Redux
import { connect } from 'react-redux'
import * as CharactersActions from 'react_native_app/src/redux/actions/characters'


class CharactersList extends Component {

    componentWillMount() {
        const houseId = this.props.house ? this.props.house.id : null
        this.props.fetchCharactersList(houseId)
    }

    onSelect(character){
        this.props.updateSelected(character)
    }

    renderItem(item, index) {
        return <CharacterCell item={item} onSelect={ (character) => this.onSelect(character) } />
    }

    render() {
        console.log("this.props.list: ", this.props.list)
        return (
            <View style={styles.container}>

                <FlatList 
                    data            = { this.props.list }
                    renderItem      = { ({item, index}) => this.renderItem(item, index) }
                    keyExtractor    = { (item, index) => index }
                    extraData       = { this.props }
                />

            </View>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        house        : state.houses.item,
        list         : state.characters.list,
        character    : state.characters.item,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {

        fetchCharactersList: (houseId) => {
            dispatch(CharactersActions.fetchCharactersList(houseId))
        },

        updateSelected: (character) => {
            dispatch(CharactersActions.updateCharacterSelected(character))
            Actions.CharacterView({ title: character.nombre })

        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

})