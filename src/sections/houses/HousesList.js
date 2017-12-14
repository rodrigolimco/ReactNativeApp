import React, { Component } from 'react'
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native'
import { AsyncCalls, Colors } from 'react_native_app/src/commons'
import HousesCell from './HousesCell'

export default class HousesList extends Component {

    constructor(props) {
        super(props)

        this.state = {
          list: [],
          selected: null,
        }
    }
    
    componentWillMount() {
        AsyncCalls.fetchHousesList()
        .then((response) => {
            console.log("axios get response: ", response);
            const nuestraLista = response.data && response.data.records ? response.data.records : []
            this.setState({ list : nuestraLista })
          })
          .catch((error) => {
              console.log("axios get error: ", error);
          });
    }

    onSelect(house){
        this.setState({ selected: house})
    }

    renderItem(item, index) {
        return <HousesCell 
                    item={item}
                    onSelect={ (house) =>this.onSelect(house) } 
                />
    }

    render() {
        return (
            <View style={styles.container}>
                
                <FlatList
                data={ this.state.list }
                renderItem={ ({ item, index }) => this.renderItem(item, index)}
                keyExtractor={ (item, index) => item.id}
                extraData={ this.state }
                numColumns={2}
                />
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(42,42,42)',
        paddingVertical: 20,
    },
})