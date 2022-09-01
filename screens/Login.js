import React, { useState, useEffect } from "react"
import {Image, View, Text, Button, ScrollView, TextInput, StyleSheet, ActivityIndicator, Pressable } from 'react-native'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../database/firebase'
import { useFonts } from 'expo-font';


import {AppStyles} from '../AppStyles'

const Login = (props) => {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../assets/fonts/Inter-Black.otf'),
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState()
  const [state, setState] = useState({     
    email: '',
    password: ''
})
  const login = async (email, password) => signInWithEmailAndPassword(auth, email, password)

  const onPressLogin = async () => {
    setError('')
    console.log(state)
        if (state.email === ''){
            alert('Ingrese el E-mail')
        }else
        {
          try {
            const idDadMaster = await login(state.email, state.password)
            console.log('idDadMaster-->', idDadMaster.user.uid)
            props.navigation.navigate('Home')  
          } catch (error) {
            //setError(error.message)
            alert(error.message)
          }
            
        }

  }
  const handleChange = ( name, value) => {
    //console.log(name, value)
    setState({ ...state, [name]: value })
  }
  return (
    <View style={styles.container}>
      <View style={styles.imagenContainer}>
        <Image source = {require("../assets/logo.png")}
        style={styles.image}
        />
      </View>
      <Text style={[styles.title]}>Iniciar Sesión</Text>
      <View style={styles.InputContainer}>
          <TextInput 
                style={styles.body}
                placeholder="E-mail"
                value={state.email}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              onChangeText={(value) => handleChange('email', value)}            
          />
      </View>
      <View style={styles.InputContainer}>
          <TextInput 
              style={styles.body}
              secureTextEntry={true}
              placeholder="Password"
              value={state.password}
              placeholderTextColor={AppStyles.color.grey}
              underlineColorAndroid="transparent"
              onChangeText={(value) => handleChange('password', value)}            
          />
      </View>
      <View style={styles.loginContainer} >
          <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => onPressLogin()}>
                <Text style={styles.textStyle}>Ingresar</Text>
          </Pressable>
      </View>
      <Text >{error}</Text>

        
    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  tipoLetra: {
    fontFamily: 'Inter-Black'
  },
  imagenContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.blanck,
    borderRadius: AppStyles.borderRadius.main,
    padding: 15,
    marginTop:10,
    marginBottom:30,
  },
  image :{
    width: 250,
    height: 180,
    borderWidth: 2,
    borderColor: "#FFF",

  },
  title: {
    fontSize: AppStyles.fontSize.title,
    //fontWeight: 'bold',
    color: AppStyles.color.black,
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'Inter-Black'
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20,
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text,
  },
  
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.blank,
    borderRadius: AppStyles.borderRadius.main,
    marginTop: 40,
    marginBottom: 60,
  },
  placeholder: {
    color: 'red',
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
  },
  button: {
    borderRadius: AppStyles.borderRadius.main,
    borderWidth: 1,
    borderColor: AppStyles.color.grey,
    padding: 15,
    elevation: 2,
    marginTop: 5,
  },
  buttonOpen: {
    backgroundColor: AppStyles.color.facebook,
  },
  buttonClose: {
    borderRadius: 20,
    padding: 20,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
});
export default Login