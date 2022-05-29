import React ,{useState,useEffect} from 'react';
import  {View,Text,StyleSheet,FlatList,Image} from 'react-native';
import {Card , FAB , Button  } from 'react-native-paper';

function Home(props) {


  return (
    <View style={{flex:1}}>
        <Image style={{margin :20 , marginTop : 100,width: 'auto', height: 250}} source={require('../assets/icu.png')} />
        <Button  style = {styles.btn} labelStyle = {styles.textStyle} color= '#40b1d3' mode="contained" onPress={() => props.navigation.navigate('Register')}>
          Register
        </Button>
        <Button  style = {styles.btn} labelStyle = {styles.textStyle2} mode="outlined" onPress={() => props.navigation.navigate('Login')}>
          Login
        </Button>
        <Button  style = {styles.btn} labelStyle = {styles.textStyle2} mode="outlined" onPress={() => props.navigation.navigate('Batlino')}>
          Batlino
        </Button>
    </View>
  )
}

const styles = StyleSheet.create({
    textStyle:{
        color:'white',
        padding:10,
        margin:20
    },
    textStyle2:{
      color:'black',
      padding:10,
      margin:20
  },
    btn:{
      margin:20,     
  },
    
})
export default Home