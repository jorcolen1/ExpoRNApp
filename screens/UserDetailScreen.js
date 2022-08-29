import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Button} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { AppStyles } from '../AppStyles'


function UserDetailScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
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
        <View style={styles.container}>
          <View style={styles.modalView}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          </View>
            {
            scanned ? 
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setScanned(false)}>
                  <Text style={styles.textStyle}>Nuevo QR</Text>
              </Pressable>
              :
              <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setScanned(true)}>
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable> 
            }
          <View style={styles.loginContainer} >
          <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible) 
                setScanned(true)}
                }>
                <Text style={styles.textStyle}>Volver</Text>
            </Pressable>
          </View>
            
            
        </View>
      </Modal>
      <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
    )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 180,
    alignItems: 'center',
    shadowColor: '#000',
    
    shadowOffset: {
      width: 0,
      
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  loginContainer: {
    width: '100%',
    backgroundColor: AppStyles.color.blank,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
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

export default UserDetailScreen