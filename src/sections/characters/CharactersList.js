import React, { Component } from 'react'
//import { FlatList, View, StyleSheet } from 'react-native'
import { ListView, View, StyleSheet, RefreshControl, TouchableOpacity, Text } from 'react-native'
import { Colors } from 'react_native_app/src/commons'
import { Actions } from 'react-native-router-flux'

// Importamos nuestra celda
import CharacterCell from './CharacterCell'

// Redux
import { connect } from 'react-redux'
import * as CharactersActions from 'react_native_app/src/redux/actions/characters'


class CharactersList extends Component {

    constructor(props){
        super(props)
        this.renderRow = this.renderRow.bind(this)
        this.onEndReached = this.onEndReached.bind(this)
    }

    componentWillMount() {
        this.props.initCharactersList()
    }

    onSelect(character){
        this.props.updateSelected(character)
    }

    renderRow(rowData){
        return <CharacterCell item={rowData} onSelect= { (character) => this.onSelect(character) } key={rowData.id} />
    }

    /*renderItem(item, index) {
        return <CharacterCell item={item} onSelect={ (character) => this.onSelect(character) } />
    }*/

    onEndReached(){
        if(this.props.list.length < this.props.total && !this.props.isFetching) {
            let newOffset = this.props.offset + 10
            this.props.fetchCharactersList(newOffset)
        }
    }

    renderFooter() {
        return (
           <TouchableOpacity onPress={ () => this.onEndReached() }>
                <Text style={{padding: 10, color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Cargar más</Text>
            </TouchableOpacity>
        )
    }

    render() {

        const list = this.props.list
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        const datasource = ds.cloneWithRows(list)

        return (
            <View style={styles.container}>
                {/*
                <FlatList 
                    data            = { this.props.list }
                    renderItem      = { ({item, index}) => this.renderItem(item, index) }
                    keyExtractor    = { (item, index) => index }
                    extraData       = { this.props }
                />
                */}

            <ListView 
                dataSource              = { datasource }
                renderRow               = { this.renderRow }
                //renderFooter            = { () => this.renderFooter}
                onEndReached            = { this.onEndReached }
                enableEmptySections     = { true }
                refreshControl          = {
                                            <RefreshControl
                                                refreshing  = { this.props.isFetching }
                                                onRefresh   = { () => this.props.initCharactersList() }
                                                colors      = { ['white'] }
                                                tintColor   = { 'white' }
                                            />
                                            }
            />

            </View>
        )
    }  
}

const mapStateToProps = (state) => {
    return {
        house      : state.houses.item,
        list       : state.characters.list,
        total      : state.characters.total,
        offset     : state.characters.offset,
        character  : state.characters.item,
        isFetching : state.characters.isFetching,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {

        initCharactersList: () => {
            dispatch(CharactersActions.initCharactersList())
        },

        fetchCharactersList: (offset) => {
            dispatch(CharactersActions.updateCharactersListOffset(offset))
            dispatch(CharactersActions.fetchCharactersList())
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