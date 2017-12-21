import React, { Component } from 'react'
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Colors } from 'react_native_app/src/commons'
import HousesCell from './HousesCell'
import { Actions } from 'react-native-router-flux'

import { connect } from 'react-redux'
import * as HousesActions from 'react_native_app/src/redux/actions/houses'

class HousesList extends Component {
    
    componentWillMount() {
       this.props.fetchHousesList()
    }

    renderFooter(){
        return <ActivityIndicator 
            animating={this.props.isFetching} 
            size="large" 
            color="grey" 
            style={{ marginVertical: 20}} 
            />
            
        /*if(this.props.isFetching){
            return (
                <View>
                    <ActivityIndicator 
                        animating={true}
                        size="large" 
                        color="grey"
                        style={{ marginVertical: 20}}
                    />
                </View>
            )
        } else {
            return null
        }*/
    }

    onSelect(house){
        this.props.updateSelected(house)
    }

    renderItem(item, index) {
        return <HousesCell 
                    item={item}
                    onSelect={ (house) => this.onSelect(house) } 
                />
    }

    render() {
        const isFetching = this.props.isFetching

        return (
            <View style={styles.container}>
                
                <FlatList
                data={ this.props.list }
                ListFooterComponent={ () => this.renderFooter() }
                renderItem={ ({ item, index }) => this.renderItem(item, index)}
                keyExtractor={ (item, index) => item.id}
                extraData={ this.props }
                numColumns={2}
                />
                
            </View>
        )
    }
}


const mapStateToProps =  (state) => {
    return {
        list: state.houses.list,
        //selected: state.houses.item,
        isFetching: state.houses.isFetching
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchHousesList: () => {
            dispatch(HousesActions.fetchHousesList())
        },

        updateSelected: (house) => {
            dispatch(HousesActions.updateHouseSelected(house))
            Actions.CharactersList({ title: house.nombre })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HousesList)




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingBottom: 20,
        paddingTop: 60
    },
})