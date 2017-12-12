import React, { Component } from 'react'
import { View, Text } from 'react-native'
import axios from 'axios'

export default class HousesList extends Component {

    constructor(props) {
        super(props)
        this.state = {
          list: []
        }
    }
    
    componentWillMount() {
        axios.get('http://146.185.137.85/got/web/casas')
        .then(function (response) {
          console.log("axios get response: ", response);
        })
        .catch(function (error) {
            console.log("axios get error: ", error);
        });
    }

    render() {
        return (
            <View>
                <Text>{ this.state.texto }</Text>
            </View>
        )
    }
}