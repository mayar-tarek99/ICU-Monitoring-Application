import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home';
import Register from './components/Register'; 
import Login from './components/Login';  
import Room from './components/Room';  
import RoomPatients from './components/RoomPatients';  
import Patient from './components/Patient';
import Batlino from './components/Batlino';
// import Chart from './components/Chart';
import Contants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

function App() {
  return (

    <View style={styles.container}>
      {/* <Home/>  */}
      {/* <Create/> */}
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Register' component={Register}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Room' component={Room}/>
        <Stack.Screen name='RoomPatients' component={RoomPatients}/>
        <Stack.Screen name='Patient' component={Patient}/>
        <Stack.Screen name='Batlino' component={Batlino}/>
        {/* <Stack.Screen name='Chart' component={Chart}/> */}

      </Stack.Navigator>
      <StatusBar style="auto" />
    </View>
  );
}
export default()=>{
return(
  <NavigationContainer>
    <App/>
  </NavigationContainer>
)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eddfdf',
    marginTop:Contants.statusBarHeight
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
