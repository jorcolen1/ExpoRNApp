import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
