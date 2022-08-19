import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { db } from './database/firebase'
import { doc, setDoc } from "firebase/firestore";

import { View, Text, Button, TextInput, ScrollView } from "react-native"

const Stack = createNativeStackNavigator();
import UsersList from './screens/UsersList';
import CreateUserScreen from './screens/CreateUserScreen';
import UserDetailScreen from './screens/UserDetailScreen';

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='CreateUserScreen' component={CreateUserScreen}/>
      <Stack.Screen name='UserList' component={UsersList}/>
      <Stack.Screen name='UserDetailScreen' component={UserDetailScreen}/>
    </Stack.Navigator>
  )
}


const create = () => {
  const myDoc = doc(db,"colection","mydocument")
  console.log('presionado')

  const docData = {
    name: "Los Angeles",
    state: "CA",
    country: "USA"
  }
  setDoc(myDoc,docData)
  .then(() => {
    alert("documento creado")
    console.log('creadooo')
  })
  .catch((error)=> {
    console.log('porrrrr.....')
    alert(error.message)
  })




}
export default function App() {
  console.log('hola todo el mundooo ',)
  return (

    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title='crear' onPress={create}></Button>
      <StatusBar style="auto" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
