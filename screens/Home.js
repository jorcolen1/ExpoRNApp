import React, { useEffect, useState } from "react"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../database/firebase'
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
    
      const [values, setValues] = useState(intialValues)
      const [eventId, setEventId] = useState('')
      const [listaEventos, setListaEventos] = useState([])
      const [selectedLanguage, setSelectedLanguage] = useState('Evento');
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

    useEffect(() => {
        
    }, [])

   
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
        <View style={styles.inputGroup}>
            <Text style={[styles.title]}>Evento:</Text>
            <ModalDropdown options={['option 1', 'option 2']}/>
            <ModalDropdown 
            value={values.eventoName}
            options={listaEventos.map((evento) => (
                `${evento.name}`,
                console.log('adatos',evento.name)
            ))}/>
        </View>
        <View style={styles.inputGroup}>
            <Picker
            selectedValue={state.eventoName}
            onValueChange={(value) => handleChange('eventoName', value)}>
            <Picker.Item  label={"----"} value={""} />
            {listaEventos.map((evento) => (
                <Picker.Item  key={evento.id} label={evento.name} value={evento.id} />
              ))}
            </Picker>
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
