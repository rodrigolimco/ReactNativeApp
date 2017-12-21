import React, { Component } from 'react'
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Colors } from 'react_native_app/src/commons'
import { Input, Button } from 'react_native_app/src/widgets'
import ImagePicker from 'react-native-image-picker'

import { connect } from 'react-redux'
import * as CharactersActions from 'react_native_app/src/redux/actions/characters'

class CharacterNew extends Component {

    constructor(props){
        super(props)

        this.state = {
            name: '',
            nameError: '',

            age: '',
            ageError: '',

            image: null
        }
    }

    validateForm(){
        let valid = true
        let errors = {}

        if(!this.state.name) {
            errors.name = 'Elige un nombre válido'
            valid = false
        }

        if(!this.state.age) {
            errors.age = 'Elige una edad válida'
            valid = false
        }

        this.setState({ 
            nameError: errors.name ? errors.name : '',
            ageError: errors.age ? errors.age : '',
        })

        return valid
    }

    onSubmit(){

        if( this.validateForm() ){
            const characterData = {
                nombre: this.state.name,
                edad: this.state.age ? this.state.age : null,
                image: this.state.image ? 'data:image/jpeg; base 64,' +this.state.image.data : null,
                casa: this.props.house.id
            }
            this.props.postCharacter(characterData)
        }
    }

    onSelectImageTapped(){
        var options = {
            title: 'Select Avatar',
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
          };

          ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else {
              //let source = { uri: response.uri };
          
              // You can also display the image using data:
              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                image: response
              });
            }
          });
    }


    render(){

        const imageUri = this.state.image ? { uri: this.state.image.uri } : null
        const imageButtonText = this.state.image ? this.state.image.fileName : 'Elegir imagen'
        
        return(
            <View style={styles.container}>

                <View style={styles.imageContainer}>
                    <Image source={imageUri} style={styles.imageContainerBackground} resizeMode={'cover'}/>
                    <TouchableOpacity style={styles.button}onPress={ () => this.onSelectImageTapped() }>
                        <Text style={styles.textButton}>{ imageButtonText }</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Input 
                        onChangeText   = { (v) => this.setState({ name : v }) }
                        value           = { this.state.name }
                        error           = { this.state.nameError }
                        label           = { 'Nombre: ' }
                        placeholder     = { 'Eddard Stark' }
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Input 
                        onChangeText   = { (v) => this.setState({ age : v }) }
                        value           = { this.state.age }
                        error           = { this.state.ageError }
                        label           = { 'Edad: ' }
                        placeholder     = { '29' }
                    />
                </View>
                
                <View sytle={styles.buttonContainer}>
                    <Button 
                        label = { 'Guardar' }
                        onPress = { () => this.onSubmit() }
                        isFetching = { this.props.isFetching }
                    />
                </View>

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        isFetching: state.characters.isFetching,
        house: state.houses.item,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    postCharacter: (data) => {
        dispatch(CharactersActions.postCharacter(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterNew)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    imageContainer: {
        alignItems: 'center',
        width: '100%',
        height: 200,
        backgroundColor: 'transparent',
        justifyContent: 'center'
    },

    imageContainerBackground: {
        position: 'absolute',
        top: 0, 
        bottom: 0,
        left: 0, 
        right: 0
    },

    button: {
        padding: 10,
        borderColor: 'white',
        borderWidth: 1, 
        borderRadius: 6
    },

    textButton: {
        color: 'white',
        fontWeight: '600',
    },

    inputContainer: {
        margin: 20,
    },

    buttonContainer: {
        margin: 20,
    },
})