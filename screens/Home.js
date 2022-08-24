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

    const intialValues = {
        name: '',
        recintoName: '',
        unixDateStart: '',
        hourStart: '',
        hourStart: '',
        estTotal: 0,
      }
    
      const [values, setValues] = useState(intialValues)
      const [listaEventos, setListaEventos] = useState([])
      const [stadistic, setStadistic] = useState([])

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
      useEffect(() => {
        async function getInfo(eventId) {
          let transactArrBase = []
          let transactData = []
          const eventoQuery = await getDoc(doc(db, 'Eventos', eventId))
          const eventValues = eventoQuery.data()
          eventValues.id=eventId

          const RefDB = query(
            collection(db, 'Eventos', eventoQuery.id, 'Entradas'),
            orderBy('seatInfo', 'asc'),
          )
          const Entradas = await getDocs(RefDB)
          Entradas.forEach((doc) => transactArrBase.push(doc.data()))
          
          console.log('values Entradas-->>', transactArrBase)
          
          let Stadistic =[0, 0, 0, 0, 0 ]
          transactArrBase.forEach((doc) => {
            switch (doc.estado) {
              case 'Libre':
                Stadistic[0]++
                break;
              case 'Reservado':
                Stadistic[1]++
                break;
              case 'Pendiente':
                Stadistic[2]++
                break;
              case 'Vendido':
                Stadistic[3]++
                break;
              case 'Validado':
                Stadistic[4]++
                break;
              default:
                console.log('default');
            }
          })
          console.log('estadisticas',Stadistic)
          eventValues.estTotal=transactArrBase.length
          eventValues.estLibre= Stadistic[0]
          eventValues.estReservado=Stadistic[1]
          eventValues.estPendiente=Stadistic[2]
          eventValues.estVendido=Stadistic[3]
          eventValues.estValidado=Stadistic[4]
          //setListaClientes(transactData)
          console.log('values estadisticasNames-->>', eventValues)

          setValues(eventValues)
          setStadistic(Stadistic)
          setEventId(eventoQuery.id)
        }
        if (values.eventoName) getInfo(values.eventoName)
      }, [values])
    
    const handleChange = ( name, value) => {
        //console.log(name, value)
        setValues({ ...values, [name]: value })
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
  const parseDate = (unixDate) => {
    if (unixDate === undefined || isNaN(unixDate)) {
      return ''
    } else {
      const newDate = new Date(unixDate * 1000).toISOString()
      //return newDate.split('T')[0]
      return newDate.split('T')[0]
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestor de ticket :</Text>
        <View style={styles.InputContainer}>
          <Text style={styles.leftTitle}>Evento:</Text>
            <Picker
            style={styles.leftTitle}
            selectedValue={values.id}
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
                value={values.recintoName}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
                editable={false} 
                //onChangeText={(value) => handleChange('name', value)}
            />
        </View>
        <View style={styles.InputContainer}>
            <TextInput 
                style={styles.body}
                placeholder="Fecha"
                value={parseDate(values.unixDateStart)}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
                editable={false}
                //onChangeText={(value) => handleChange('phone', value)}
            />
        </View>
        <View style={styles.InputContainer}>
            <TextInput 
                style={styles.body}
                placeholder="Hora"
                value={values.hourStart}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
                editable={false}
                //onChangeText={(value) => handleChange('email', value)}            
            />
        </View>
        <View style={styles.InputContainer}>
            <TextInput 
                style={styles.body}
                placeholder=""
                value={`${values.estTotal},${values.estLibre},${values.estReservado},${values.estPendiente},${values.estVendido},${values.estValidado}`}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
                editable={false}
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
