import { Text, StyleSheet, View, Pressable } from "react-native";
import {useState, useContext} from 'react';
import {SkinDataContext} from '../context/SkinDataContext';
import {router} from 'expo-router';
export default function skincare_exp(){
   const {skinData, setSkinData} = useContext(SkinDataContext); //parse the conetext object not the context component(SkinDataProvider)
    function skinCareExp(exp){
        setSkinData({...skinData, skincare_exp: exp});
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffffff'}}>
            <Text style={styles.question}>What's your current skincare experience?</Text>
            <Text style={styles.description}>We'll match recommendations to your level</Text>
            <View style={styles.optionContainer}>
                <Pressable style={styles.option} onPress={() => {skinData.skincare_exp === "start_out" ? skinCareExp("") : skinCareExp("start_out")}}>
                    <Text style={styles.optiontitle}>Just Starting Out</Text>
                    <Text style={styles.optiondescription}>New to skincare</Text>
                    <Text style={styles.optioninfo}>Let's build you a simple routine</Text>
                </Pressable>
                 <Pressable style={styles.option} onPress={() => {skinData.skincare_exp === "start_out" ? skinCareExp("") : skinCareExp("start_out")}}>
                    <Text style={styles.optiontitle}>Just Starting Out</Text>
                    <Text style={styles.optiondescription}>New to skincare</Text>
                    <Text style={styles.optioninfo}>Let's build you a simple routine</Text>
                </Pressable>
            </View>
             <View style={styles.optionContainer}>
                <Pressable style={styles.option} onPress={() => {skinData.skincare_exp === "start_out" ? skinCareExp("") : skinCareExp("start_out")}}>
                    <Text style={styles.optiontitle}>Just Starting Out</Text>
                    <Text style={styles.optiondescription}>New to skincare</Text>
                    <Text style={styles.optioninfo}>Let's build you a simple routine</Text>
                </Pressable>
                 <Pressable style={styles.option} onPress={() => {skinData.skincare_exp === "start_out" ? skinCareExp("") : skinCareExp("start_out")}}>
                    <Text style={styles.optiontitle}>Just Starting Out</Text>
                    <Text style={styles.optiondescription}>New to skincare</Text>
                    <Text style={styles.optioninfo}>Let's build you a simple routine</Text>
                </Pressable>
            </View>
            <View style={styles.buttons}>
                <Pressable style={styles.backbutton}
                onPress={() => router.push("/sensitivity")}><Text style={{fontSize: 15}}>Back</Text>
                </Pressable>
                {skinData && skinData.sensitivity && skinData.sensitivity.length > 0 ? (
                <Pressable style={styles.nextbutton}
                onPress={() => router.push("/details")}><Text style={{color: '#ffffffff', fontSize: 15}}>Continue</Text>
                </Pressable>
                ) : null}  
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    question:{
        color: '#04a2adff',
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "serif",
        marginVertical: 20
    },
    description:{
        color: '#767676ff',
        fontFamily: "serif",
        fontSize: 15,
        fontWeight: "200",
        marginBottom: 30
    },
    optionContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 10
    },
    option:{
        color: '#003119ff',
        backgroundColor: '#f5faf7ff',
        marginVertical: 10, 
        width: 180,
        paddingVertical: 10, 
        padding: 30,
        borderColor: '#a2d8beff', 
        borderWidth: 0.7,
        borderRadius: 20
    },
    optiontitle:{
        color: '#363636ff',
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "serif",
        textAlign: 'center',
        marginTop: 10
    },
    optiondescription:{
        color: '#6b6b6bff',
        fontFamily: "serif",
        fontSize: 15,
        fontWeight: "200",
        marginBottom: 30,
        textAlign: 'center'
    },
    optioninfo:{
        color: '#767676ff',
        fontFamily: "serif",
        fontSize: 15,
        fontWeight: "200",
        marginBottom: 30,
        fontStyle: "italic",
        textAlign: 'center'
    },
    backbutton:{
        paddingVertical: 10, 
        paddingHorizontal: 40,
        borderColor: '#767676ff',
        borderWidth: 1,
        borderRadius: 10,
    },
    nextbutton:{
        paddingVertical: 10, 
        paddingHorizontal: 40,
        backgroundColor: '#04a2adff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#04a2adff'
    },
    buttons:{
        marginVertical: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50
    }
});