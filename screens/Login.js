import React, { useState, useEffect } from "react"
import {View, Text, Button, ScrollView, TextInput, StyleSheet} from 'react-native'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../database/firebase'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import {AppStyles} from '../AppStyles'

const Login = (props) => {

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
      <Text style={[styles.title, styles.leftTitle]}>Iniciar Sesión</Text>
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
          <Button
            title="Ingresar"
            style={styles.loginText}
            onPress={() => onPressLogin()}
            />
        </View>
      <Text >{error}</Text>

        
    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  or: {
    color: 'black',
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20,
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
    padding: 10,
    marginTop: 30,
  },
  loginText: {
    color: AppStyles.color.tint,
  
  },
  placeholder: {
    color: 'red',
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
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
  }
});
export default Login