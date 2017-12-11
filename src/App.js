/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {

  constructor(props) {
    super(props)

    this.state = {
      title: 'Estoy cargando',
      texto: 'Hola mundo'
    }
  }

  componentWillMount(){
    // Antes de que se ejecute el render
  }

  componentDidMount(){
    // Después del render
    // Sólo se llama una vez, después de montado el componente
    setTimeout( () => {
      this.setState({title: 'Ya he terminado de cargar'})
    }, 2000)
  }

  /*componentWillUpdate(nextProps, nextState){
    // Antes de actualizar las propiedades o el estado del componente
  }*/

  componentDidUpdate(prevProps, prevState){
    //Después de que estén actualizadas

  }

  /*componentWillUnmount(){
    // Al destruir el componente
  }*/

  render() {

    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
 
});
