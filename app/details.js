import { Text, StyleSheet, View, Pressable, FlatList } from "react-native";
import {useState, useContext, useEffect} from 'react';
import {SkinDataContext} from '../context/SkinDataContext';
import {router} from 'expo-router';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Dropdown from 'react-native-input-select';

const data = [
    {
        id: "1",
        title: "Clear Skin",
        key: "clear",
        info: "No active breakouts"
    },
    {
        id: "2",
        title: "Occasional Breakouts",
        key: "occasional",
        info: "Once in a while"
    },
     {
        id: "3",
        title: "Hormonal Acne",
        key: "hormonal",
        info: "Monthly cycles"
    },
     {
        id: "4",
        title: "Cystic Acne",
        key: "cystic",
        info: "Deep, painful bumps"
    },
]
export default function details(){
    const [age, setAge] = useState("");
    const {skinData, setSkinData} = useContext(SkinDataContext);
    const [isDisabled, setIsDisabled] = useState(true);
    useEffect(() => {
        if(skinData && (skinData.age && skinData.age.length > 0) && (skinData.acnetype && skinData.acnetype.length > 0)) setIsDisabled(false);
        else setIsDisabled(true);

    }, [skinData.age, skinData.acnetype]);
    function handleSkinData(acnetype){
        setSkinData({...skinData, age: age, acnetype: acnetype});
    }
    //render each of the item ine data (flatlist)
    const renderItem = ({item}) => {
        const valueExists = skinData.acnetype === item.key;
        return(
            <Pressable onPress={() => {valueExists ? handleSkinData("") : handleSkinData(item.key)}} style={valueExists ? styles.optionactive : styles.option}>
                  <Text style={valueExists ? styles.optiontitleactive :styles.optiontitle}>{item.title}</Text>
                  <Text style={valueExists ? styles.optioninfoactive : styles.optioninfo}>{item.info}</Text>
            </Pressable>
        );
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff"}}>
                <Text style={styles.question}>What's your age range?</Text>
                <Text style={styles.description}>Age affects your skin's needs</Text>
                <View style={styles.agedropdown}>
                    <Dropdown
                        label="Knowing your age would help us analyze better"
                        placeholder="Select your age ..."
                        options={[
                        { label: '13 - 17 years', value: 'teen' },
                        { label: '18 - 24', value: 'youngadult' },
                        { label: '25 - 34', value: 'adult' },
                        { label: '35 - 44', value: 'middle' },
                        { label: '45+ years', value: 'above' },
                    ]}
                    selectedValue={age}
                    onValueChange={(value) => setAge(value)}
                     primaryColor={'green'}
                    />
                </View>
                <Text  style={styles.question}>How's your acne situation?</Text>
                <Text  style={styles.description}>We'll tailor treatment recommendations</Text>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    numColumns={2}
                    scrollEnabled={false}
                    contentContainerStyle={styles.listContainer}
                >
                </FlatList>
                 <View style={styles.buttons}>
                    <Pressable style={styles.backbutton}
                    onPress={() => router.push("/skincare_exp")}><Text style={{fontSize: 15}}>Back</Text>
                    </Pressable>
                    <Pressable style={isDisabled ? styles.nextbtndisabled :styles.nextbutton}
                    onPress={() => router.push("/concerns")}
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
    option:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e9fff4ff',
        gap: 8,
        padding: 8,
        marginHorizontal: 8,
        marginVertical: 2,
        borderRadius: 20,
        borderWidth: 0.7,
        borderColor: '#129958ff',
        width : 170,
        height: 100
    },
    optionactive:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#04a2adff',
        gap: 8,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 2,
        borderRadius: 20,
        width : 170,
        height: 100,
        transform: [{scale: 1.06}]
    },
    optioninfoactive:{
        color: '#e3e3e3ff',
    },
    optiontitle: {
        marginTop: 8,
        textAlign: 'center',
        color: '#04a2adff',
        fontSize: 15,
        fontWeight: "bold",
        fontFamily: "serif"
    },
    optiontitleactive:{
        textAlign: 'center',
        fontFamily: "serif",
        fontSize: 15,
        fontWeight: "bold",
        color: '#ffffffff'
    },
    optioninfo:{
        textAlign: 'center',
        color: '#767676ff',
        fontFamily: "serif",
        fontSize: 15,
        fontWeight: "20",
        marginBottom: 10
    },
    listContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    agedropdown:{
        width: 300,
        height: 110
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