import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import moment from "moment-timezone";

const FutureForecast = ({data}) => {
    return (
        <View style = {styles.elementos} >
           
            {
            data && data.length > 0 ?
            data.map((data, idx) => (

                idx !== 0 && <FutureForecastItem key={idx} forecastItem ={data} />

            ))

            :
            <View/>
           }
           
        </View>
    )
}

const FutureForecastItem = ({forecastItem}) => {
    
    const img = {uri : 'http://openweathermap.org/img/wn/'+ forecastItem.weather[0].icon + '@2x.png'}
    return (
        <View style = {styles.FutureForecastItemContainer} >
            <Text style = {styles.day}>{moment(forecastItem.dt * 1000).format('ddd')}</Text>
            <Image source= {img} style = {styles.image}/>
            <Text style = {styles.temp}>Min - {Math.round(forecastItem.temp.min)}&#176;C</Text>
            {console.log(forecastItem)}
            <Text style = {styles.temp}>Max - {Math.round(forecastItem.temp.max)}&#176;C</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    image : {
        width: 80,
        height: 80,
        marginLeft: 'auto',
        marginRight: 'auto'
        
    },
    FutureForecastItemContainer: {
        
        marginBottom: 20,
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#00000033',
        borderRadius: 10,
        borderColor: '#eee',
        
        padding: 30,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    day: {
        fontSize: 20,
        color: 'white',
        backgroundColor: "#3c3c44",
        width: 80,
        padding: 1,
        textAlign: 'center',
        borderRadius: 50,
        fontWeight: "900",
        marginBottom: 0,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    temp: {
        fontSize: 15,
        color: 'white',
        fontWeight: "800",
        textAlign: 'center'
    },
    elementos: {
        
        
        

    }
})

export default FutureForecast