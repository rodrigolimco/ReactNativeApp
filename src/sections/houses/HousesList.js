import React, { Component } from 'react'
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native'
import { AsyncCalls, Colors } from 'react_native_app/src/commons'
import HousesCell from './HousesCell'

import { connect } from 'react-redux'
import * as HousesActions from 'react_native_app/src/redux/actions/houses'

class HousesList extends Component {
    
    componentWillMount() {
       this.props.fetchHousesList()
    }

    onSelect(house){

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
                data={ this.props.list }
                renderItem={ ({ item, index }) => this.renderItem(item, index)}
                keyExtractor={ (item, index) => item.id}
                extraData={ this.state }
                numColumns={2}
                />
                
            </View>
        )
    }
}


const mapStateToProps =  (state) => {
    return {
        list: state.houses.list
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchHousesList: () => {
            dispatch(HousesActions.fetchHousesList())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HousesList)




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(42,42,42)',
        paddingVertical: 20,
    },
})