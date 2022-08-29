import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { View, Text, Button, TextInput, ScrollView } from "react-native"

const Stack = createNativeStackNavigator();
import Login from './screens/Login';
import Home from './screens/Home';
import UserDetailScreen from './screens/UserDetailScreen';
import ReadQr from './src/components/ReadQr';

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='UserDetailScreen' component={UserDetailScreen}/>
      <Stack.Screen name='Home' component={Home}/>
      <Stack.Screen name='IniciarSesión' component={Login}/>
      <Stack.Screen name='ReadQr' component={ReadQr}/>
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
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
