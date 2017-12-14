import React, { Component } from 'react'
import { Image, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native'

export default class HousesCell extends Component {
    
    // Propiedades por defecto
    // Sirven para prevenir fallos y para documentar el componente
    static defaultProps = {
        onSelect:  () => {},
        item: {}
    }

    render(){

        const { item, onSelect } = this.props
        const image = item.image_dir ? { uri: item.image_dir } : null

        return (
            <TouchableOpacity style={styles.container} onPress={ () => onSelect( item )}>
               <Image source={ image } style={styles.image} resizeMode={'contain'}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    
    container: {
        margin: 10,
        width: Dimensions.get('window').width / 2 -20,
        height: (Dimensions.get('window').width / 2) * (857/600),

        ...Platform.select({
            ios: {
              shadowColor: 'rgba(255,255,255,0.1)',
              shadowOpacity: 1,
              shadowOffset: { height: 4, width: 4 },
              shadowRadius: 2,
            },
            android: {
              elevation: 4,
            },
        })

    },

    image: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
})