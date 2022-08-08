import React, {useEffect, useState} from 'react';
import * as Location from "expo-location";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ImageBackground,
  useWindowDimensions
} from 'react-native';
import DateTime from './components/DateTime.js'
import WheaterScroll from './components/WheaterScroll.js';




const API_KEY ='ff26d804d0d9d838fc3e57227eed4bcc';



const img = require('./assets/image.jpg')
const img2 = require('./assets/image2.png')

const App = () => {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();

  const [data, setData] = useState({});
  const [location, setLocation] = useState([]);

  console.log(Location)

  const handleGetWeather = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return setError("Permission to access location was denied.");
    } else {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 5 });
      const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
      const data = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);
      const json = await data.json();
     
      setLocation(location[0]);

      setData(json);
      
    }
  };

  useEffect(() => {
    handleGetWeather();
  }, []);
  
  // style = {{width : windowWidth, height: windowHeight}}
  return (
  
      <View style = {{ flex : 1, width : windowWidth, height: windowHeight}}>
      <ImageBackground source={img} style = {styles.image}>
        <DateTime current = {data.current} timezone= {data.timezone} lat = {data.lat} lon = {data.lon} location = {location}  />
        <WheaterScroll wheaterData = {data.daily}/>
      </ImageBackground>
    </View>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image : {
    flex : 3,
    resizeMode: "cover",
    justifyContent: "center",
  
  }
})



export default App;
