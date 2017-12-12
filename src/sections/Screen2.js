import React, { Component } from 'react';
import {View, Text, StyleSheet, Button } from 'react-native';
import {Actions} from 'react-native-router-flux'

export default class Screen2 extends React.Component {
    
    render(){
        return (
            <View>
                <Text>Esta es la screen 2</Text>
                <Text>{ this.props.texto }</Text>
                <Button
                    title = {'Volver atrás'}
                    onPress={ () => Actions.pop() }
                />
            </View>
        )
    }
}