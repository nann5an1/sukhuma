import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { router } from 'expo-router';
// import { Separators } from 'react-native/types_generated/index';


export default function App() {
  return (
     <View style={styles.container}>
            <View>
                <Text style={styles.title}>Welcome to Sukhuma</Text>
            </View>
            <View style={{marginVertical: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{marginLeft: 20, marginRight: 20, paddingVertical: 40, color: '#767676ff', fontSize: 18, fontFamily: "serif", textAlign: 'center'}}>Your AI-powered skincare companion. Get a personalized routine designed just for you.</Text>
            </View>
    
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10}}>
                <Text style={styles.info}>AI Personalized</Text>
               <Text style={styles.info}>2 Minutes</Text>
               <Text style={styles.info}>Science Backed</Text>
            </View>
            <View style={{marginVertical: 30, padding: 10}}>
                <Pressable style={styles.button}
                title="Start Your Glow Journey"
                onPress={() => router.push("/skin_types")}>
                    <Text style={{color: '#ffffffff', fontSize: 15, fontWeight: "bold", fontFamily: "serif"}}>Start Your Glow Journey</Text>
                </Pressable>
            </View>
            
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  title:{
    color: '#004b27ff',
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "serif"
  },
  info:{
    backgroundColor: '#e9fff4ff',
    marginVertical: 5, 
    padding: 10, 
    borderColor: '#004b27ff', 
    borderWidth: 1,
    borderRadius: 20,
    letterSpacing: 1,
    fontWeight: "400",
    fontSize: 13
},
  button: {
    color: '#ffffffff',
    paddingVertical: 20, 
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: '#003a31ff'
  }
}
);
