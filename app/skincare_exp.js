import { Text, StyleSheet, View, Pressable, FlatList } from "react-native";
import {useState, useContext, useEffect} from 'react';
import {SkinDataContext} from '../context/SkinDataContext';
import {router} from 'expo-router';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const data = [
    {
        id: 1,
        key: "start_out",
        title: "Just Starting Out",
        description: "New to skincare",
        info: "Let's build you a simple routine"
    },
    {
        id: 2,
        key: "basic",
        title: "Basic Routine",
        description: "Cleanser & moisturizer",
        info: "Ready to level up",
    },
    {
        id: 3,
        key: "growing",
        title: "Growing Collection",
        description: "Multiple products & steps",
        info: "You know your stuff",
    },
    {
        id: 4,
        key: "enthusiast",
        title: "Skincare Enthusiast",
        description: "Full routine with active products",
        info: "Looking to optimize",
    },
];
export default function skincare_exp(){
   const {skinData, setSkinData} = useContext(SkinDataContext); //parse the conetext object not the context component(SkinDataProvider)
   const [isDisabled, setIsDisabled] = useState(true);

   useEffect(() => {
    skinData && skinData.skincare_exp && skinData.skincare_exp.length > 0 ? setIsDisabled(false) : setIsDisabled(true);
   }, [skinData.skincare_exp]);
    function skinCareExp(exp){
        setSkinData({...skinData, skincare_exp: exp});
    }

    //flatlist is the looping component just like map
    const renderItem = ({item}) => 
    {
        const valueExists = skinData.skincare_exp === item.key;
        return(
        <Pressable 
        style={valueExists ? styles.optionactive : styles.option} onPress={() => {skinData.skincare_exp === item.key ? skinCareExp("") : skinCareExp(item.key)}}>
            <Text style={valueExists ? styles.optiontitleactive : styles.optiontitle}>{item.title}</Text>
            <Text style={valueExists ? styles.optiondescriptionactive : styles.optiondescription}>{item.description}</Text>
            <Text style={valueExists ? styles.optioninfoactive : styles.optioninfo}>{item.info}</Text>
        </Pressable>
    )};

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffffff'}}>
                <Text style={styles.question}>What's your current skincare experience?</Text>
                <Text style={styles.description}>We'll match recommendations to your level</Text>
                <FlatList
                data={data}
                renderItem={renderItem}
                numColumns={2}
                scrollEnabled={false}
                contentContainerStyle={styles.listContainer}
                />
                <View style={styles.buttons}>
                    <Pressable style={styles.backbutton}
                    onPress={() => router.push("/sensitivity")}><Text style={{fontSize: 15}}>Back</Text>
                    </Pressable>
                    <Pressable style={isDisabled ? styles.nextbtndisabled :styles.nextbutton}
                    onPress={() => router.push("/details")}
                    disabled={isDisabled}><Text style={{color: '#ffffffff', fontSize: 15}}>Continue</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    question:{
        textAlign: 'center',
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
     listContainer:{
        marginVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    option:{
        color: '#003119ff',
        backgroundColor: '#f5faf7ff',
        margin: 5, 
        width: 180,
        height: 200,
        padding: 10,
        borderColor: '#a2d8beff', 
        borderWidth: 0.7,
        borderRadius: 20,
        gap: 10
    },
    optionactive:{
        color: '#003119ff',
        backgroundColor: '#04a2adff',
        marginVertical: 5, 
        marginHorizontal: 5,
        width: 180,
        padding: 5,
        borderColor: '#a2d8beff', 
        borderWidth: 0.7,
        borderRadius: 20,
        gap: 10,
        transform: [{scale: 1.1}]
        
    },
    optiontitle:{
        color: '#363636ff',
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "serif",
        textAlign: 'center',
        marginTop: 10
    },
     optiontitleactive:{
        color: '#ffffffff',
        fontSize: 17,
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
    optiondescriptionactive:{
        color: '#e4e4e4ff',
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
    optioninfoactive:{
        color: '#e4e4e4ff',
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
    nextbtndisabled:{
        paddingVertical: 10, 
        paddingHorizontal: 40,
        backgroundColor: '#b0e2e6ff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccf4f7ff'
    },
    buttons:{
        marginVertical: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50
    }
});