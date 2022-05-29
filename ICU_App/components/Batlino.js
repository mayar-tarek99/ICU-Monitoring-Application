import React ,{useState,useEffect} from 'react';
import  {View,Text,StyleSheet,FlatList} from 'react-native';
import {Card , FAB,Button} from 'react-native-paper';
import { VictoryBar, VictoryChart, VictoryTheme,VictoryZoomContainer,VictoryLine,VictoryAxis,VictoryLabel } from "victory-native";

const sensorData = [
  { timestamp: 1, value: 13000 },
  { timestamp: 2, value: 16500 },
  { timestamp: 3, value: 14250 },
  { timestamp: 4, value: 19000 }
];
function Batlino(props) {
  const [data,setData] = useState([])  
  const [loading , setIsLoading] = useState(true)
  const [batlinoData , setBatlinoData]= useState([]) 


  const getBatlino = ()=>{
    fetch('http://192.168.1.43:3000/getBatlino',{
          method:'GET'
        })
        .then(resp=>resp.json())
        .then(article=>{
          setBatlinoData(article)
          setIsLoading(false)
          console.log(article)
          console.log('hey1')
         
        })
        .catch(error=>console.log(error))

  }

  useEffect(()=>{
    // const interval = setInterval(() => {
    //   console.log('This will run every second!');
    //   loadName()
    //   loadData()
    //   loadSensor1()
    //   loadSensor2()
    // }, 1000);
    // return () => clearInterval(interval);

    getBatlino()

  
  },[])
 

   
  return (
    <View style={{flex:1}}>
       <Text style ={{fontSize:23, marginLeft:30}}>Batlino Output</Text>
       
        
       <View style={{flex:1 }}>
   
       <VictoryChart
            containerComponent={<VictoryZoomContainer/>}
            theme={VictoryTheme.material}
            width={400}
            height ={300}
            >
            <VictoryLine
                style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc"}
                }}
                data={batlinoData}
                // x ='date'
                y="data"    
                // y="sensor1" 

            />
            </VictoryChart>

            </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
export default Batlino