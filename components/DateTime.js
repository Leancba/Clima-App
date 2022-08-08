import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, TextInput} from "react-native";
import moment from "moment-timezone";


const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const WheaterItem = ({title, value, unit}) => {
    return (
        <View style = {styles.WheaterItem}>
            <Text style = {styles.WheaterItemTitle} >{title}</Text>
            <Text style = {styles.WheaterItemTitle}>{value}{unit}</Text>
        </View>
    )
}
const DateTime = ({current, timezone, location}) => {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    useEffect (() => {
        setInterval(() => {
            const time = new Date();
            const month = time.getMonth();
            const date = time.getDate();
            const day = time.getDay();
            const hour = time.getHours();
            const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
            const minutes = time.getMinutes();
            const ampm = hour >=12 ? 'pm' : 'am'
        
            setTime((hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes) +ampm) 
        
            setDate(days[day] + ', ' + date+ ' ' + months[month]) 
        
        }, 1000);
    }, [])

    return (
        <View style = {styles.container} >
           <View>
             <View>
                <Text style = {styles.heading}> {time} </Text>
             </View>
             
             <View>
                <Text style = {styles.subHeading}>  {date}</Text>
             </View>
                <View style = {styles.wheaterItemContainer}>
                    <WheaterItem title= "Feels Like" value = {current? Math.round(current.feels_like) : "" } unit = "°C" />
                    <WheaterItem title= "Humidity" value= {current? current.humidity: ""} unit= "%" />
                    <WheaterItem title= "Pressure" value= {current? current.pressure: ""} unit= "hPa" />
                    <WheaterItem title= "Sunrise"  value= {current? moment.tz(current.sunrise * 1000, timezone).format('HH:mm') : "" } unit= "am" />
                    <WheaterItem title= "Sunset"  value=  {current? moment.tz(current.sunset * 1000, timezone).format('HH:mm') : "" } unit= "pm" /> 
                </View>
           </View>
            <View style = {styles.rightAlign}>
                <Text style = {styles.timezone}>{location.region} {location.subregion} , {location.country}  </Text>
               
            </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1.5,
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 15
    },
    heading:{
        position: 'relative',
        right: 5,
        fontSize: 43,
        color : 'white',
        fontWeight: '100',    
    },
    subHeading: {
        position:'relative',
        top: 30,
        left: 5,
        fontSize: 25,
        color: '#eee',
        fontWeight: '300'
    },
    rightAlign: {
        textAlign: 'right',
        marginTop: 20
    },
    timezone: {
        opacity:0.5,
        position: 'relative',
        top: 40,
        right: 190,
        fontWeight: '900',
        fontSize: 15,
        color: 'white',
    },
    latlong: {
        fontSize: 16,
        color: 'white',
        fontWeight: '700'
    },
    wheaterItemContainer: {
        position: 'relative',
        bottom: 0,
        backgroundColor: "#18181b99",
        borderRadius: 10,
        padding: 10,
        marginTop: 40
    

    },
    WheaterItem : {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    WheaterItemTitle: {
        color : '#eee',
        fontSize: 14,
        fontWeight: '100'
    },
   
    
})

export default DateTime