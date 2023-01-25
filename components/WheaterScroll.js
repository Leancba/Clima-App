import React from "react"
import { View, ScrollView, Image, Text, StyleSheet  } from "react-native"
import moment from "moment-timezone";
import FutureForecast from "./FutureForecast.js"

const WheaterScroll = ({wheaterData}) => {
    return (
        <ScrollView horizontal= {false} style = {styles.ScrollView} >
            <CurrentTempEl data = {wheaterData? wheaterData[0] : {} } />
            <FutureForecast data = {wheaterData} />
        </ScrollView>

    )
}

const CurrentTempEl = ({data}) => {

    if(data && data.weather){
        const img = {uri : 'http://openweathermap.org/img/wn/'+ data.weather[0].icon + '@2x.png'}
    
        return (
            <View style = {styles.currentTempContainer}>
                <Image source={img} style = {styles.image}/>
                <View style = {styles.otherContainer}>
                    <Text style = {styles.day}>{moment(data.dt * 1000).format('dddd')}</Text>
                    <Text style = {styles.temp}>Min - {Math.round(data.temp.min)}&#176;C</Text>
                    <Text style = {styles.temp}>Max - {Math.round(data.temp.max)}&#176;C</Text>
                </View>
            </View>
        )
    } else{
        return (
            <View>
                
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    ScrollView: {
        flex:0.4,
        backgroundColor: '#18181bcc',
        padding: 40
    },
    image: {
        width: 150,
        height: 150
    },
    currentTempContainer: {
        
        marginBottom: 15,
        flexDirection: 'row',
        backgroundColor: '#00000033',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth:2,
        padding: 10
    }, 
    day: {
        fontSize: 25,
        color: 'white',
        backgroundColor: "#3c3c44",
        padding: 10,
        textAlign: 'center',
        borderRadius: 50,
        fontWeight: "700",
        marginBottom: 30
    },
    temp: {
        fontSize: 20,
        color: 'white',
        fontWeight: "700",
        textAlign: 'center'
    },
    otherContainer: {
        paddingRight: 30
        
    }
})

export default WheaterScroll