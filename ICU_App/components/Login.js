import React ,{useState}from 'react'
import  {View,Text,StyleSheet} from 'react-native';
import {TextInput , Button }  from 'react-native-paper';

function Login(props) {
    const [email,setEmail] = useState("") 
    const [password,setPassword] = useState("") 
    const [borderBottomColor, setBorderColor] = React.useState();
    const insertData = ()=>{
        fetch('http://192.168.1.43:3000/login',{
      
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:email , password:password})
          })
          .then(resp=>resp.json())
          .then(data=>{
              console.log("data",data);
            props.navigation.navigate('Room',{doctor_data:data})
          })
          .catch(error=>console.log(error))
    }

  return (
    <View>
     <TextInput style={styles.inputStyle}
     label="Email"
     value = {email}
     mode = "outlined"
     onChangeText = {text => setEmail(text)}
     />
     <TextInput 
     style={styles.inputStyle}
     label="Password"
     value = {password}
     mode = "outlined"
     onChangeText = {text => setPassword(text)}
     />
     <Button
     style ={{margin:20}}
    //  icon ="pencil"
     mode="contained"
     color= '#40b1d3'
     onPress={()=> insertData()} 
     >Login</Button>
    </View>


  )
}

const styles = StyleSheet.create({
    inputStyle: {
      padding: 10,
      // marginTop: 30,
      margin:20,
    },
  });
  
export default Login




