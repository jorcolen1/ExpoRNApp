import React, {useState} from "react"

import { View, Text, Button, TextInput, ScrollView, StyleSheet } from "react-native"

function CreateUserScreen() {
    const [state, setState] = useState({
        name: '',
        email: '',
        phone: ''     
    })
    const handleChange = ( name, value) => {
        //console.log(name, value)
        setState({ ...state, [name]: value })
      }

      const saveNewUser = () => {
        console.log(state)
      }
  return (
    <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
            <TextInput 
                placeholder="Nombre de user" 
                onChangeText={(value) => handleChange('name', value)}
            />
        </View>
        <View style={styles.inputGroup}>
            <TextInput 
                placeholder="Email de user"
                onChangeText={(value) => handleChange('email', value)}            
            />
        </View>
        <View style={styles.inputGroup}>
            <TextInput 
                placeholder="Phone de user"
                onChangeText={(value) => handleChange('phone', value)}
            />
        </View>
        <View>
            <Button 
                title="Guardar user" 
                onPress= {() => saveNewUser() }/>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container :{
        flex :1,
        padding:35,
    },
    inputGroup:{
        flex:1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor:"#cccccc",
    },

})

export default CreateUserScreen
