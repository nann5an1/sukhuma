import { Text, StyleSheet, View, Pressable, FlatList } from "react-native";
import {useState, useContext, useEffect} from 'react';
import {SkinDataContext} from '../context/SkinDataContext';
import {router} from 'expo-router';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const data = [
    {
        id:"1",
        title: "Anti-Aging",
        key: "antiaging"
    },
    {
        id:"2",
        title: "Dark Spots",
        key: "darkspots",
    },
     {
        id:"3",
        title: "Dryness",
        key: "dryness",
    },
     {
        id:"4",
        title: "Large Pores",
        key: "largepores",
    },
     {
        id:"5",
        title: "Dullness",
        key: "dullness",
    },
     {
        id:"6",
        title: "Redness",
        key: "redness",
    },
    {
        id:"7",
        title: "Uneven Texture",
        key: "uneventexture",
    },
    {
        id:"6",
        title: "Oiliness/Shine",
        key: "oiliness",
    },
    {
        id:"6",
        title: "Fine Lines",
        key: "finelines",
    },
    {
        id:"6",
        title: "Uneven Tone",
        key: "uneventone",
    }
];
export default function concerns(){
    const {skinData, setSkinData} = useContext(SkinDataContext);
    const [skinConcerns, setSkinConcerns] = useState([]);
     useEffect(() => {
        if (skinData?.skinconcerns && Array.isArray(skinData.skinconcerns) && skinData.skinconcerns.length > 0) {
            setSkinConcerns(skinData.skinconcerns);
        }
    }, []);

    function handleSkinData(){
        setSkinData({...skinData, skinconcerns: skinConcerns});
        router.push("/preferences");
    }


    function toggleSkinConcerns(concerns){
        if(skinConcerns.includes(concerns)) setSkinConcerns(skinConcerns.filter((item) => item !== concerns));
        else setSkinConcerns([...skinConcerns, concerns]); 
    }

    function renderItem({item}){
        const valueExists = skinConcerns.includes(item.key);
        return(
            <Pressable 
            onPress={() => toggleSkinConcerns(item.key)}
            style={[styles.option, valueExists ? styles.optionactive : null]}>
                <Text style={[styles.optiontitle, valueExists && styles.optiontitleactive]}>{item.title}</Text>
            </Pressable>
            
        );
    }
    return(
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#ffffffff'}}>
                <Text style={styles.question}>What are your main concerns?</Text>
                <Text style={styles.description}>Select all that apply (or skip if none)</Text>
                <FlatList
                scrollEnabled={false}
                data={data}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={styles.listcontainer}
                >
                </FlatList>
                <View style={styles.status}>
                    <Text style={{fontSize: 15}}>No concerns? That's great! You can continue without selecting any.</Text>
                </View>
                <View style={styles.buttons}>
                    <Pressable style={styles.backbutton}
                    onPress={() => router.push("/details")}><Text style={{fontSize: 15}}>Back</Text>
                    </Pressable>
                    <Pressable style={styles.nextbutton}
                    onPress={() => handleSkinData(skinConcerns)}
                    ><Text style={{color: '#ffffffff', fontSize: 15}}>Continue</Text>
                    </Pressable>
                </View>
                
            </SafeAreaView>
        </SafeAreaProvider>
    )
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
        fontWeight: "170",
        fontSize: 16,
        marginBottom: 30
    },
    option:{
        justifyContent: 'center',
        marginHorizontal: 10,
        backgroundColor: '#f5f5f5',
        padding: 10,
        width: 150,
        height:50,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#04a2adff',
    },
    optionactive:{
        textAlign: 'center',
        backgroundColor: '#04a2adff',
        padding: 10,
        width: 150,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#04a2adff',
        transform: [{scale: 1.06}]
    },
    optiontitle:{
        textAlign: 'center',
        fontFamily: "serif",
        fontSize: 16,
        color: '#3b494aff'
    },
    optiontitleactive:{
        textAlign: 'center',
        fontFamily: "serif",
        fontSize: 15,
        fontWeight: "bold",
        color: '#ffffffff'
    },
    listcontainer:{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    status:{
        marginVertical: 30,
        width: 300,
        borderColor: '#3f4b4cff',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderRadius: 20,
        padding: 20
    },
     buttons:{
        marginVertical: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50
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
});