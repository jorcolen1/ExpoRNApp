import React, { useState } from "react"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../database/firebase'
import { db } from '../database/firebase'
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { View, Text, Button, TextInput, ScrollView, StyleSheet } from "react-native"

const CreateUserScreen = (props) => {
    const [state, setState] = useState({
        name: '',
        phone: '',     
        email: '',
        password: ''
    })
    const handleChange = ( name, value) => {
        //console.log(name, value)
        setState({ ...state, [name]: value })
      }

    const saveNewUser = async() => {
        console.log(state)
        if (state.name === ''){
            alert('ingrese el nombre')
        }else
        {
            try {
                const docRef = await addDoc(collection(db, "Users"), {
                    name: state.name,
                    phone: state.phone,
                    email: state.email,
                    password: state.password
                  });
                  console.log("Document written with ID: ", docRef.id);
                  alert('Guardado')
                  props.navigation.navigate('UserList')
            } catch (error) {
                
            }
        }
        
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
                placeholder="Phone de user"
                onChangeText={(value) => handleChange('phone', value)}
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
                placeholder="Password de user"
                onChangeText={(value) => handleChange('password', value)}            
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
