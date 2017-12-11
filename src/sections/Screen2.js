import React, { Component } from 'react';
import {View, Text, StyleSheet } from 'react-native';

export default class Screen2 extends React.Component {
    
    render(){
        return (
            <View>
                <Text>Esta es la screen 2</Text>
                <Text>{this.props.texto}</Text>
            </View>
        )
    }
}