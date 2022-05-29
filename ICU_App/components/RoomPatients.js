import React ,{useState,useEffect} from 'react';
import  {View,Text,StyleSheet,Button,FlatList} from 'react-native';
import {Card , FAB} from 'react-native-paper';

function RoomPatients(props) {
  const [data,setData] = useState([])  // data same name as in flatList
  const [loading , setIsLoading] = useState(true)
  const room_data  = props.route.params.room_data;

  const loadData = ()=>{
    fetch('http://192.168.1.43:3000/getPatients',{
          method:'GET'
        })
        .then(resp=>resp.json())
        .then(article=>{
          setData(article)
          setIsLoading(false)
          console.log('all')
          console.log(room_data)
        })
        .catch(error=>console.log(error))

  }
  useEffect(()=>{
    loadData()
  },[])
 
  const insertId = (my_patient_id)=>{
    fetch('http://192.168.1.43:3000/postPatients',{
  
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({patient_id:my_patient_id})
      })
      .then(resp=>resp.json())
      .then(data=>{
          console.log("data");
        // props.navigation.navigate('Room',{doctor_data:data})
      })
      .catch(error=>console.log(error))
}
  const clickedItem = (data)=>{
    props.navigation.navigate('Patient',{patient_data:data})
  }
  const renderData = (item)=>{
    return(
        <Card style={styles.cardStyle}>
          <Text style ={{fontSize:23}} onPress={()=>{
            insertId(item.patient_id)
            clickedItem(item)}}>Patient # {item.patient_id}</Text>
          {/* <Text>{item.body}</Text> */}

        </Card>
    )
  }
   
  return (
    <View style={{flex:1}}>
       <Text style ={{fontSize:23}}>In Room # {room_data.room_id}</Text>
        <FlatList
        data = {data}
        renderItem = { ({item})=>{
          return renderData(item)
        }}
        onRefresh = {()=> loadData()}
        refreshing = {loading}
        keyExtractor = {item => `${item.id}`}
        />

        {/* <FAB
        style = {styles.fab}
        small = {false}
        icon = "plus"
        theme={{colors:{accent:"green"}}}
        onPress ={()=>props.navigation.navigate('Create')} //console.log("pressed");
        /> */}
    </View>
  )
}

const styles = StyleSheet.create({
    // textStyle:{
    //     color:'green',
    //     padding:10,
    //     margin:20
    // },
    cardStyle:{
        padding:10,
        margin:10
    },
    fab:{
      position:'absolute',
      margin:16,
      right:0,
      bottom:0
  },

})
export default RoomPatients