import React, { useEffect, useState } from "react"
import { db } from '../database/firebase'
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    onSnapshot,
  } from 'firebase/firestore'
import { View, Text, Button, TextInput, ScrollView, StyleSheet } from "react-native"
import ModalDropdown from 'react-native-modal-dropdown';
import {Picker} from '@react-native-picker/picker';
import {AppStyles} from '../AppStyles'


const CreateUserScreen = (props) => {
    const [state, setState] = useState({
        name: '',
        phone: '',     
        email: '',
        password: ''
    })
    const intialValues = {
        name: '',
        location: '',
        eventoName: '',
      }
    
      const [listaEventos, setListaEventos] = useState([])
      const [values, setValues] = useState(intialValues)
      const [eventId, setEventId] = useState('')
      useEffect(() => {
        const traerEventos = async () => {
          let eventosArr = []
          const EventosPartOne = query(
            collection(db, 'Eventos'),
            //where('state', '==', "Activo"),
            orderBy('name', 'asc'),
          )
          const snapshot = await getDocs(EventosPartOne)
          snapshot.forEach((doc) => {
            const task = doc.data()
            task.id = doc.id
            eventosArr.push(task)
          console.log('dataa: ', doc.data())

          })
          /* const unsub = onSnapshot(doc(db, 'UsersAll', uidCurrent), (doc) => {
            eventosArr = eventosArr.concat(doc.data().permEventos)
            //setListaRecintos(doc.data().permRecintos)
            console.log('Complete: ', eventosArr)
            setListaEventos(eventosArr.sort((a, b) => a.name > b.name))
          }) */
          console.log('Complete: ', eventosArr)
          setListaEventos(eventosArr.sort((a, b) => a.name > b.name))
        }
        traerEventos()
      }, [])
   
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
                  //props.navigation.navigate('IniciarSesión')
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
    <View style={styles.container}>
      <Text style={styles.title}>Gestor de ticket :</Text>
        <View style={styles.InputContainer}>
          <Text style={styles.leftTitle}>Evento:</Text>
            <Picker
            style={styles.leftTitle}
            selectedValue={state.eventoName}
            onValueChange={(value) => handleChange('eventoName', value)}>
            <Picker.Item  label={"----"} value={""} />
            {listaEventos.map((evento) => (
                <Picker.Item  key={evento.id} label={evento.name} value={evento.id} />
              ))}
            </Picker>
        </View>
        <View style={styles.InputContainer}>
            <TextInput
                style={styles.body}
                placeholder="Recinto"
                value={state.password}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent" 
                //onChangeText={(value) => handleChange('name', value)}
            />
        </View>
        <View style={styles.InputContainer}>
            <TextInput 
                style={styles.body}
                placeholder="Fecha"
                value={state.password}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
                //onChangeText={(value) => handleChange('phone', value)}
            />
        </View>
        <View style={styles.InputContainer}>
            <TextInput 
                style={styles.body}
                placeholder="Hora"
                value={state.password}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
                //onChangeText={(value) => handleChange('email', value)}            
            />
        </View>

        
        

        
       {/*  <View>
            <Button 
                title="Guardar user" 
                onPress= {() => saveNewUser() }/>
        </View>
        <View>
            <Button
                title="leer QR" 
                onPress= {() => LecturaQR() }/>
        </View> */}
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
    color: AppStyles.color.blue,
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
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
  }
});

export default CreateUserScreen
