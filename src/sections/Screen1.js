import React, { Component } from 'react';
import {View, Text, StyleSheet, Button } from 'react-native';
import {Actions} from 'react-native-router-flux'

export default class Screen1 extends React.Component {
    
    _goScreen2(){
        Actions.screen2({texto:'Probamos que no ha sido suerte'})
    }

    render(){
        return (
            <View>
                <Text>Esta es la screen 1</Text>
                <Button 
                    onPress={() => this._goScreen2()}
                    title="Ir a la pantalla 2"
                />
            </View>
        )
    }
}