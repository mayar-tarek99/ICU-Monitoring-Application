import React ,{useState}from 'react'
import  {View,Text,StyleSheet} from 'react-native';
import {TextInput , Button }  from 'react-native-paper';

function Register(props) {
    const [name,setName] = useState("") 
    const [email,setEmail] = useState("") 
    const [password,setPassword] = useState("") 
    const insertData = ()=>{
        fetch('http://192.168.1.43:3000/register',{
      
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:name , email:email , password:password})
          })
          .then(resp=>resp.json())
          .then(data=>{
              console.log("data",data);
            props.navigation.navigate('Home')
          })
          .catch(error=>console.log(error))
    }

  return (
    <View>
     <TextInput style={styles.inputStyle}
     label="Name"
     value = {name}
     mode = "outlined"
     onChangeText = {text => setName(text)}
     />
     <TextInput style={styles.inputStyle}
     label="Email"
     value = {email}
     mode = "outlined"
     onChangeText = {text => setEmail(text)}
     />
     <TextInput style={styles.inputStyle}
     label="Password"
     value = {password}
     mode = "outlined"
     onChangeText = {text => setPassword(text)}
     />

     <Button
     style ={{margin:10}}
     mode="contained"
     onPress={()=> insertData()} 
     >Register</Button>
     </View>


  )
}

const styles = StyleSheet.create({
    inputStyle: {
      padding: 10,
      marginTop: 30,
    },
  });
  
export default Register




