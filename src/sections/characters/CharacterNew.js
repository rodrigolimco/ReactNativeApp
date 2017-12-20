import React, { Component } from 'react'
import { View, TextInput, Image, StyleSheet } from 'react-native'
import { Colors } from 'react_native_app/src/commons'
import { Input } from 'react_native_app/src/widgets'

import { connect } from 'react-redux'
import * as CharactersActions from 'react_native_app/src/redux/actions/characters'

class CharacterNew extends Component {

    constructor(props){
        super(props)

        this.state = {
            name: '',
            nameError: '',
        }
    }


    render(){
        return(
            <View style={styles.container}>

                <Input 
                    onChangeText   = { (v) => this.setState({ name : v }) }
                    value           = { this.state.name }
                    error           = { this.state.nameError }
                    label           = { 'Nombre: ' }
                    placeholder     = { 'Eddard Stark' }
                />

            </View>
        )
    }
}

export default connect(null, null)(CharacterNew)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
    },
})