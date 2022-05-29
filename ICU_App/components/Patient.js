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
function Patients(props) {
  const [data,setData] = useState([])  
  const [loading , setIsLoading] = useState(true)
  const patient_data  = props.route.params.patient_data;

  const [sensor1Data , setSensor1Data]= useState([]) 
  const [sensor2Data , setSensor2Data]= useState([])  
  const [led,setLed] = useState([]) 
  const [sig,setSig] = useState([])  

  const [name,setName] = useState([])  

  const toggleLed = ()=>{
    fetch('http://192.168.1.43:3000/toggleLed',{
  
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({ledStatus:led})
      })
      .then(resp=>resp.json())
      .then(dataa=>{
          console.log("ledStatus",dataa);
      })
      .catch(error=>console.log(error))
}

const toggleSig = ()=>{
  fetch('http://192.168.1.43:3000/toggleSignal',{

      method:'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify({signalStatus:sig})
    })
    .then(resp=>resp.json())
    .then(dataa=>{
        console.log("signalStatus",dataa);
    })
    .catch(error=>console.log(error))
}

const loadName = ()=>{
  fetch('http://192.168.1.43:3000/getPatientName',{
        method:'GET'
      })
      .then(resp=>resp.json())
      .then(article=>{
        setName(article.name)
        setIsLoading(false)
        console.log(article)
        console.log('Name..')
        console.log(article.name)
      })
      .catch(error=>console.log(error))

}

  const loadData = ()=>{
    fetch('http://192.168.1.43:3000/getPatient',{
          method:'GET'
        })
        .then(resp=>resp.json())
        .then(article=>{
          setData(article)
          setIsLoading(false)
          console.log(article)
          console.log('hey')
          console.log(patient_data)
        })
        .catch(error=>console.log(error))

  }

  const loadSensor1 = ()=>{
    fetch('http://192.168.1.43:3000/getSensor1',{
          method:'GET'
        })
        .then(resp=>resp.json())
        .then(article=>{
          setSensor1Data(article)
          setIsLoading(false)
          console.log(article)
          console.log('hey1')
         
        })
        .catch(error=>console.log(error))

  }

  const loadSensor2 = ()=>{
    fetch('http://192.168.1.43:3000/getSensor2',{
          method:'GET'
        })
        .then(resp=>resp.json())
        .then(article=>{
          setSensor2Data(article)
          setIsLoading(false)
          console.log(article)
          console.log('hey2')
       
        })
        .catch(error=>console.log(error))

  }
  useEffect(()=>{
    const interval = setInterval(() => {
      console.log('This will run every second!');
      loadName()
      loadData()
      loadSensor1()
      loadSensor2()
    }, 1000);
    return () => clearInterval(interval);
    // loadName()
    // loadData()
    // loadSensor1()
    // loadSensor2()
  
  },[])
 

   
  return (
    <View style={{flex:1}}>
       <Text style ={{fontSize:23, marginLeft:30}}>Patient Name :  {name}</Text>
       
       <Button
        style ={{margin:10}}
        mode="contained"
        onPress={()=> {
          if (led == 'ON'){setLed ('OFF')}
          else{setLed ('ON')}
          toggleLed()}} 
        >Toggle Led</Button>
        <Button
        style ={{margin:10}}
        mode="contained"
        onPress={()=> {
          if (sig == 'ON'){setSig ('OFF')}
          else{setSig ('ON')}    
          toggleSig()}} 
        >Toggle Signal</Button>
          {/* <Button
        style ={{margin:10}}
        mode="contained"
        onPress={()=> {
          setLed ('OFF')
          toggleLed()}} 
        >Toggle LDR</Button> */}
        
       <View style={{flex:1 }}>
       <Text style ={{fontSize:15, marginLeft:30}}>Temperature Sensor</Text>
       <VictoryChart
            containerComponent={<VictoryZoomContainer/>}
            theme={VictoryTheme.material}
            width={400}
            height ={250}
            >
            <VictoryLine
                style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc"}
                }}
                data={sensor1Data}
                // x ='date'
                y="sensor1"    
                // y="sensor1" 

            />
            </VictoryChart>
            </View>
        
      
       <View style={{flex:1,width:'auto' ,height: 70}}>
       <Text style ={{fontSize:15, marginLeft:30}}>LDR Sensor</Text>
       <VictoryChart
            containerComponent={<VictoryZoomContainer/>}
            theme={VictoryTheme.material}
            width={400}
            height ={250}
            >
            <VictoryLine
                style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc"}
                }}
                // data={sensor2Data}
                data={sensor2Data}

                // x ='date'
                y="sensor2" 
                // y="data" 

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
export default Patients