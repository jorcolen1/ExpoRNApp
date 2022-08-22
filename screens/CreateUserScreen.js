import React, { useEffect, useState } from "react"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../database/firebase'
import { db } from '../database/firebase'
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { View, Text, Button, TextInput, ScrollView, StyleSheet } from "react-native"
import { BarCodeScanner } from "expo-barcode-scanner";

const CreateUserScreen = (props) => {
    const [state, setState] = useState({
        name: '',
        phone: '',     
        email: '',
        password: ''
    })

    const [hasPermissions, setHasPermissions] = useState(null)
    const [scanned, setScanned] = useState(false)
    const handleChange = ( name, value) => {
        //console.log(name, value)
        setState({ ...state, [name]: value })
      }

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            setHasPermissions(status === 'granted')
        }

        getBarCodeScannerPermissions()
    }, [])

    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true)
        alert(`Bar code with type ${type} and data ${data} has been scanned`)
    }

    if (hasPermissions === null) {
        return <Text>Requesting for camera permissions</Text>
    } 

    if (hasPermissions === false) {
        return <Text>No access to camera</Text>
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
    const LecturaQR = async() => {

        try {
                props.navigation.navigate('ReadQr')
        } catch (error) {
            
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
        <View>
            <Button 
                title="leer QR" 
                onPress= {() => LecturaQR() }/>
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
    container1: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      },

})

export default CreateUserScreen
