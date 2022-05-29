import React ,{useState,useEffect} from 'react';
import  {View,Text,StyleSheet,Button,FlatList} from 'react-native';
import {Card , FAB} from 'react-native-paper';

function Room(props) {
  const [data,setData] = useState([])  // data same name as in flatList
  const [loading , setIsLoading] = useState(true)
  const doctor_data  = props.route.params.doctor_data;

  const loadData = ()=>{
    fetch('http://192.168.1.43:3000/getRooms',{
          method:'GET'
        })
        .then(resp=>resp.json())
        .then(article=>{
          console.log(article)
          console.log('hello')
          console.log(doctor_data)
          setData(article)
          setIsLoading(false)
        })
        .catch(error=>console.log(error))

  }
  useEffect(()=>{
    loadData()
  },[])

  const insertId = (my_room_id)=>{
    fetch('http://192.168.1.43:3000/postRooms',{
  
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({room_id:my_room_id})
      })
      .then(resp=>resp.json())
      .then(data=>{
          console.log("data");
        // props.navigation.navigate('Room',{doctor_data:data})
      })
      .catch(error=>console.log(error))
}



  const clickedItem = (data)=>{
    props.navigation.navigate('RoomPatients',{room_data:data})
  }
  const renderData = (item)=>{
    return(
        <Card style={styles.cardStyle}>
          <Text 
          style ={{fontSize:23}} 
          onPress={()=>{
            insertId(item.room_id)
            clickedItem(item)
            }}>Room # {item.room_id}</Text>
          {/* <Text>{item.body}</Text> */}

        </Card>
    )
  }
   
  return (
    <View style={{flex:1}}>
        <Text style ={{fontSize:23}}>Welcome {doctor_data[0]}</Text>
        <FlatList
        data = {data}
        renderItem = { ({item})=>{
          return renderData(item)
        }}
        onRefresh = {()=> loadData()}
        refreshing = {loading}
        keyExtractor = {item => `${item.id}`}
        />
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
export default Room