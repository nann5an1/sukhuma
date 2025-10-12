import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {useState, useContext, useEffect} from 'react';
import {SkinDataContext} from '../context/SkinDataContext';
import {router} from 'expo-router';
import { Text, StyleSheet, View, FlatList } from "react-native";
import { RefreshCw, Download, Sun, Moon, Calendar, Lightbulb, Sparkles, Heart, ShoppingBag } from "lucide-react-native";

const data= [
    {
    time: "Morning",
    routine: [
        {
            id: 1,
            title: "Gentle Cleanser",
            products: ["Paula's Choice CLEAR Pore Normalizing Cleanser", "La Roche-Posay Effaclar Purifying Gel", "Drunk Elephant Beste No. 9 Jelly Cleanser"],
            info: "Use a foaming gel cleanser with salicylic acid"
        },
        {
            id: 2,
            title: "Routine 2",
            products:  ["p1", "p2", "p3"],
            info: "Routine 2"
        },
        {
            id: 3,
            title: "Routine 3",
            products:  ["p1", "p2", "p3"],
            info: "Routine 3"
        }
    ]},
    {
    time: "Evening",
    routine: [
        {
            id: 1,
            title: "Gentle Cleanser",
            products: ["Paula's Choice CLEAR Pore Normalizing Cleanser", "La Roche-Posay Effaclar Purifying Gel", "Drunk Elephant Beste No. 9 Jelly Cleanser"],
            info: "Use a foaming gel cleanser with salicylic acid"
        },
        {
            id: 2,
            title: "Routine 2",
            products:  ["p1", "p2", "p3"],
            info: "Routine 2"
        },
        {
            id: 3,
            title: "Routine 3",
            products:  ["p1", "p2", "p3"],
            info: "Routine 3"
        }
    ]}
];

const treatments = {
        weekelytreatments: [
        {
            id: 1,
            treatment: "Clay Mask",
            info: "Use purifying clay mask to deep clean pores",
            times: "1-2x per week"
        },
        {
            id: 2,
            treatment: "Gentle Exfoliation",
            info: "Use AHA/BHA chemical exfoliant",
            times: "2-3x per week"
        }
    ]
};

export default function Routine(){
    const renderItem = ({item}, time) => {
        return (
            <View style={styles.cardcontainer}>
                <View style={[styles.idcontainer, time === "Morning" ?  null : {backgroundColor: "#e4d0fbff"}]}><Text style={[styles.idcontainertext, time === "Morning" ? null : {color: "#5200afff"}  ]}>{item.id}</Text></View>
                <View style={styles.carddetailscontainer}>
                    <Text style={styles.cardtitle}>{item.title}</Text>
                    <Text style={styles.cardinfo}>{item.info}</Text>
                    <Text style={styles.recommendtitle}><ShoppingBag size={18} color={"#555555ff"}/>  Recommended Products:</Text>
                    {item.products.map((product, index) => {
                        return(
                            <View key={index} style={[styles.productinfo, time === "Morning" ?  null : {backgroundColor: "#f7f0ffff", borderColor: "#5200afff"}]}>
                                <Text style={{color: "#291f12bd", fontSize: 13, textAlign: "center"}}>{product}</Text>
                            </View>
                        )
                    })}
                </View>
            </View>
        );
    };

    const renderTimeSection = ({item}) => {
        return (
            <>
             <View style={[styles.headercontainer, item.time === "Evening" ? {backgroundColor: "#e9deffff", borderColor: "#5e3aa4ff"} : {color: "#fe942aff"}]}>
                    <View style={[styles.icon, item.time === "Evening" ? {backgroundColor: "#5e3aa4ff"} :{backgroundColor: "#fcbf4fff"}]}>
                        {item.time === "Evening" ? <Moon size={24} color="#ffffff"/> : <Sun size={28} color="#ffffff"/>}
                    </View>
                    <Text style={[styles.headertitle, item.time === "Evening" ? {color: "#5e3aa4ff"} : {color: "#fe942aff"}]}>{item.time} Routine</Text>
                </View>
                <FlatList 
                data={item.routine}
                renderItem={(itemData) => renderItem(itemData, item.time)}
                keyExtractor={routine => String(routine.id)}
                scrollEnabled={false}
                />
            </>
        );
    }

    const renderTreatments = ({item}) => {
        return (
            <View style={styles.treatmentcontainer}>
                <View style={styles.treatmentdetailscontainer}>
                    <Text style={styles.cardtitle}>{item.treatment}</Text>
                    <Text style={styles.cardinfo}>{item.info}</Text>
                    <Text style={styles.treatmenttimes}>{item.times}</Text>
                </View>
            </View>
        );
    }

    const renderHeader = () => (
        <View style={styles.headerSection}>
            <View style={styles.heartcontainer}>
                <Heart size={38} color="#ffffff" fill="#ffffff"/>
            </View> 
            <Text style={styles.question}>Your Perfect Routine is Ready!</Text>
            <Text style={styles.description}>Personalized for you based on your skincare needs</Text>
        </View>
    );

    const renderTreatmentHeader = () => (
        <View style={styles.treatmentSectionHeader}>
            <View style={styles.icon}>
                <Calendar size={24} color="#04a2adff"/>
            </View>
            <Text style={[styles.headertitle,{ color: "#04a2adff"}]}>Weekly Treatments</Text>
        </View>
    );

    const allData = [
        { type: 'header' },
        ...data.map((item, index) => ({ type: 'routine', data: item, index })),
        { type: 'treatmentHeader' },
        ...treatments.weekelytreatments.map((item, index) => ({ type: 'treatment', data: item, index }))
    ];

    const renderAllItems = ({ item }) => {
        if (item.type === 'header') {
            return renderHeader();
        } else if (item.type === 'routine') {
            return renderTimeSection({ item: item.data });
        } else if (item.type === 'treatmentHeader') {
            return renderTreatmentHeader();
        } else if (item.type === 'treatment') {
            return renderTreatments({ item: item.data });
        }
    };

    return(
        <SafeAreaProvider >
            <SafeAreaView style={{flex: 1, backgroundColor: "#ffffff"}}>
                <FlatList 
                    data={allData}
                    renderItem={renderAllItems}
                    keyExtractor={(item, index) => String(index)}
                    contentContainerStyle={styles.flatlistcontainer}
                />
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
        marginVertical: 20,
        marginTop: 30
    },
    description:{
        color: '#2b2a2aff',
        fontFamily: "serif",
        fontSize: 15,
        fontWeight: "200",
        marginBottom: 35
    },
    icon:{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        width: 40,
        height: 40,
    },
    headercontainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        marginTop: 20,
        marginBottom: 25,
        borderRadius: 10,
        borderWidth: 0.6,
        backgroundColor: "#fff7d8ff",
        borderColor: "#fbb32eff",
        paddingVertical: 10
    },
    headertitle:{
        fontFamily: 'serif',
        fontSize: 17,
        fontWeight: "semibold",
        color: '#fbb32eff',
        fontWeight: "bold"
    },
    heartcontainer:{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: "100%",
        width: 50,
        height: 50,
        padding: 35,
        backgroundColor: "#04a2adff",
        marginTop: 50
    },
    headerSection:{
        alignItems: 'center'
    },
    treatmentSectionHeader:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#e6fff8ff",
        borderRadius: 10,
        borderColor: "#04a2adff",
        borderWidth: 0.6,
        height: 50,
        padding: 10,
        marginTop: 20
    },
    flatlistcontainer:{
        padding: 20
    },
    cardcontainer:{
        justifyContent: 'center',
        alignItems: 'start',
        flexDirection: 'row',
        gap: 10,
        width: "100%",
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 20,
        borderRadius: 15
    },
    idcontainer:{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        width: 30,
        height: 30,
        backgroundColor: "#fcd691ff"
    },
    idcontainertext:{
        fontSize: 17, color: "#f68802ff", fontWeight: "bold"
    },
    carddetailscontainer:{
        borderRadius: 10,
        padding: 5,
        width: 300,
        gap: 10
    },
    cardtitle:{
        color: "#3b3b3bff",
        fontSize: 15,
        fontWeight: "bold",
        fontFamily: "serif"
    },
    cardinfo:{
        fontSize: 14,
        fontWeight: "semibold",
        fontFamily: "serif",
        color: "#848383ff"
    },
    productinfo:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff6e4ff", 
        padding: 5, 
        borderWidth: 0.6,
        borderRadius: 10,
        borderColor: "#fbb32eff",
    },
    recommendtitle:{
        color: "#3b3b3bff",
        fontSize: 14,
        fontWeight: "semibold",
        fontFamily: "serif",
        fontStyle: "italic",
        paddingTop: 10
    },
    treatmentcontainer:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        width: "100%",
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 20,
        borderRadius: 15
    },
    treatmentdetailscontainer:{
        borderRadius: 10,
        padding: 5,
        width: 300,
        gap: 10
    },
    treatmenttimes:{
        color: "#04a2adff",
        fontSize: 13,
        fontWeight: "bold",
        fontFamily: "serif"
    }
});