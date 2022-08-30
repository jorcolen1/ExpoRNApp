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
import { View, Text, Button, TextInput, StyleSheet, Modal, Pressable, Alert } from "react-native"
import { Picker } from '@react-native-picker/picker';
import { AppStyles } from '../AppStyles'
import ReadQr from '../src/components/ReadQr'
import ReadQrC from '../src/components/ReadQrC'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { async } from "@firebase/util";


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

  const [modalVisible, setModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
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
      //console.log('dataa: ', doc.data())

      })
      /* const unsub = onSnapshot(doc(db, 'UsersAll', uidCurrent), (doc) => {
        eventosArr = eventosArr.concat(doc.data().permEventos)
        //setListaRecintos(doc.data().permRecintos)
        console.log('Complete: ', eventosArr)
        setListaEventos(eventosArr.sort((a, b) => a.name > b.name))
      }) */
      //console.log('Complete: ', eventosArr)
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
      
      //console.log('values Entradas-->>', transactArrBase)
      
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
      //console.log('estadisticas',Stadistic)
      eventValues.estTotal=transactArrBase.length
      eventValues.estLibre= Stadistic[0]
      eventValues.estReservado=Stadistic[1]
      eventValues.estPendiente=Stadistic[2]
      eventValues.estVendido=Stadistic[3]
      eventValues.estValidado=Stadistic[4]
      //setListaClientes(transactData)
      //console.log('values estadisticasNames-->>', eventValues)

      setValues(eventValues)
      setStadistic(Stadistic)
      setEventId(eventoQuery.id)
    }
    if (values.eventoName) getInfo(values.eventoName)
  }, [values])
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    
    getBarCodeScannerPermissions();
  }, []);
    
      
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

      <ReadQr newUserId={eventId}/>
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

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned---evento>>>${eventId}`);
    controlTicket( type, data )
  };
  const controlTicket = async (type, data) => {
    console.log(type, data, eventId)
    const citiesRef = collection(db, "Eventos", eventId, "Entradas");
    const q = query(citiesRef, where("uuid", "==", data));

    if (type === 256){
      try {
        const querySnapshot = await getDocs(q);
        console.log('Respuesta de ',querySnapshot)
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());


        });
    } catch (error) {
        
    }
  }else
  {
    alert('No es codigo valido ')
  }
    
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
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
                placeholder="Estadisticas"
                value={`${values.estTotal},${values.estLibre},${values.estReservado},${values.estPendiente},${values.estVendido},${values.estValidado}`}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
                editable={false}
                //onChangeText={(value) => handleChange('email', value)}            
            />
        </View>
        {/* <View style={styles.loginContainer}>
            <Button
                title="leer QR"
                style={styles.loginText} 
                onPress= {() => {
                  //console.log('presssss')
                  props.navigation.navigate('ReadQr')
                } }/>
        </View> */}
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed');
              setModalVisible(!modalVisible);
              setScanned(true);
            }}>
            <View style={styles.containerQr}>
              <View style={styles.modalView}>
                <BarCodeScanner
                  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                  style={StyleSheet.absoluteFillObject}
                />
              </View>
              <View style={styles.loginContainerQr}>
              {
                scanned ? 
                  <Pressable
                    style={[styles.buttonClose]}
                    onPress={() => setScanned(false)}>
                      <Text style={styles.textStyle}>Nuevo QR</Text>
                  </Pressable>
                  :
                  <Pressable
                  style={[styles.buttonClose]}
                  onPress={() => setScanned(true)}>
                    <Text style={styles.textStyle}>Cancelar</Text>
                  </Pressable> 
                }

              </View>  
              <View style={styles.loginContainerQr} >
              <Pressable
              style={[styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible) 
                    setScanned(true)}
                    }>
                    <Text style={styles.textStyle}>Volver</Text>
                </Pressable>
              </View>
                
                
            </View>
          </Modal>
            {
              eventId !== "" ? 
                <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
                  <Text style={styles.textStyle}>Validar</Text>
                </Pressable>
              :"" 
            }
          
        </View>
       
       
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
  },

  centeredView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 22,
  },
  containerQr: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 0,
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 200,
    alignItems: 'center',
    shadowColor: '#000',
    marginTop: 130,
    shadowOffset: {
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  loginContainerQr: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: AppStyles.color.blank,
    borderRadius: AppStyles.borderRadius.main,
    padding: 20,
    marginTop: 0,
    

  },
  button: {
    borderRadius: 20,
    padding: 20,
    elevation: 2,
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: AppStyles.color.greenBlue,
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CreateUserScreen
