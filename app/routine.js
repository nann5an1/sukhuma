import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {useState, useContext, useEffect} from 'react';
import {SkinDataContext} from '../context/SkinDataContext';
import {router} from 'expo-router';
import { Text, StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { RefreshCw, Download, Sun, Moon, Calendar, Lightbulb, Sparkles, Heart, ShoppingBag } from "lucide-react-native";

export default function Routine(){
    const {skinData} = useContext(SkinDataContext);
    const [data, setData] = useState([]);
    const [treatments, setTreatments] = useState({ weekelytreatments: [], tips: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Skindata in routine output: ", skinData);    
        fetchFromLlama();
    }, []);

    async function fetchFromLlama(){
        try {
            setLoading(true);
            const response = await fetch("http://192.168.0.2:3000/skincareroutine", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(skinData),
            });
            
            if(response.ok){
                const result = await response.json();
                console.log("Full response: ", result);
                console.log("Type of result: ", typeof result);
                
                // If result is a string, parse it
                let parsedResult = result;
                if (typeof result === 'string') {
                    parsedResult = JSON.parse(result);
                }
                
                console.log("Parsed data: ", parsedResult);
                console.log("Data array: ", parsedResult.data);
                console.log("Treatments: ", parsedResult.treatments);
                
                setData(parsedResult.data || []);
                setTreatments(parsedResult.treatments || { weekelytreatments: [], tips: [] });
                setLoading(false);
            } else {
                console.error("Response not OK:", response.status);
                setError("Failed to fetch skincare routine");
                setLoading(false);
            }
        } catch (error) {
            console.log("Error in getting response from api:", error);
            setError(error.message);
            setLoading(false);
        }
    }

    const renderItem = ({item}, time) => {
        return (
            <View style={styles.cardcontainer}>
                <View style={[styles.idcontainer, time === "Morning" ?  null : {backgroundColor: "#e4d0fbff"}]}>
                    <Text style={[styles.idcontainertext, time === "Morning" ? null : {color: "#5200afff"}]}>{item.id}</Text>
                </View>
                <View style={styles.carddetailscontainer}>
                    <Text style={styles.cardtitle}>{item.title}</Text>
                    <Text style={styles.cardinfo}>{item.info}</Text>
                    <Text style={styles.recommendtitle}>
                        <ShoppingBag size={18} color={"#555555ff"}/>  Recommended Products:
                    </Text>
                    {item.products && item.products.map((product, index) => {
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
                    <View>
                        {item.time === "Evening" ? <Moon size={24} color="#5e3aa4ff"/> : <Sun size={28} color="#f9830eff"/>}
                    </View>
                    <Text style={[styles.headertitle, item.time === "Evening" ? {color: "#5e3aa4ff"} : {color: "#fe942aff"}]}>
                        {item.time} Routine
                    </Text>
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
                <View style={styles.treatmenttimescontainer}>
                    <Text style={styles.treatmenttimes}>{item.times}</Text>
                </View>
                <View style={styles.treatmentdetailscontainer}>
                    <Text style={styles.cardtitle}>{item.treatment}</Text>
                    <Text style={styles.treatmentinfo}>{item.info}</Text>
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
            <Text style={[styles.headertitle,{ color: "#04a2adff"}]}>Weekly Treatment</Text>
        </View>
    );

    const renderTipsHeader = () => (
        <View style={[styles.treatmentSectionHeader, {backgroundColor: "#fff6caff", borderColor: "#f3b600ff"}]}>
            <View style={styles.icon}>
                <Lightbulb size={24} color="#ffbf00ff"/>
            </View>
            <Text style={[styles.headertitle,{ color: "#ffbf00ff"}]}>Pro Tips for Better Results</Text>
        </View>  
    );

    const renderTips = ({item}) => {
        return (
            <View style={styles.tipscontainer}>
                <View style={styles.tipsdetailscontainer}>
                    <Text style={styles.cardinfo}>{item.info}</Text>
                </View>
            </View>
        );
    };

    const renderImportant = () => {
        return (
            <View style={styles.important}>
                <Text style={{fontSize: 13, fontFamily: "serif", color: "rgba(241, 41, 41, 1)", textAlign: "start"}}>
                    ⚠️ Important: Introduce new products gradually (one at a time) and always patch test. For persistent concerns, consult a dermatologist.
                </Text>
            </View>
        );
    }

    // Show loading state
    if (loading) {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={{flex: 1, backgroundColor: "#ffffff", justifyContent: "center", alignItems: "center"}}>
                    <ActivityIndicator size="large" color="#04a2adff" />
                    <Text style={{marginTop: 20, color: "#848383ff"}}>Creating your personalized routine...</Text>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }

    // Show error state
    if (error) {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={{flex: 1, backgroundColor: "#ffffff", justifyContent: "center", alignItems: "center", padding: 20}}>
                    <Text style={{color: "red", textAlign: "center"}}>Error: {error}</Text>
                    <Text style={{marginTop: 10, color: "#848383ff", textAlign: "center"}}>
                        Please check your connection and try again.
                    </Text>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }

    // Build allData only after data is loaded
    const allData = [
        { type: 'header' },
        ...data.map((item, index) => ({ type: 'routine', data: item, index })),
        { type: 'treatmentHeader' },
        ...(treatments.weekelytreatments || []).map((item, index) => ({ type: 'treatment', data: item, index })),
        { type: 'tipsHeader' },
        ...(treatments.tips || []).map((item, index) => ({ type: 'tips', data: item, index })),
        { type: 'important' },
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
        } else if (item.type === 'tipsHeader') {
            return renderTipsHeader();
        } else if(item.type === 'tips') {
            return renderTips({item: item.data});
        } else if(item.type === 'important') {
            return renderImportant();
        }
    };

    return(
        <SafeAreaProvider>
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
        gap: 10,
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
        borderRadius: 50,
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
        marginVertical: 30
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
    treatmenttimescontainer:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#e6fff8ff",
        padding: 6,
        borderRadius: 10,
        marginVertical: 2,
        borderWidth: 0.6,
        borderColor: "#04a2adff"
    },
    tipscontainer:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff8d7ff",
        padding: 10,
        borderRadius: 10,
        marginVertical: 2,
        borderWidth: 0.6,
        borderColor: "#fbb32eff",
        padding: 10
    },
    tipsdetailscontainer:{
        borderRadius: 10,
        padding: 5,
        width: 300
    },
    idcontainertext:{
        fontSize: 17, 
        color: "#f68802ff", 
        fontWeight: "bold"
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
        color: "#848383ff",
        padding: 2
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
        marginHorizontal: 20,
        marginVertical: 20,
        padding: 10
    },
    treatmentdetailscontainer:{
        borderRadius: 10,
        width: 200,
        gap: 10
    },
    treatmenttimes:{
        textAlign: "center",
        color: "#04a2adff",
        fontSize: 12,
        fontWeight: "bold",
        fontFamily: "serif"
    },
    treatmentinfo:{
        fontSize: 13,
        fontFamily: "serif",
        fontWeight: "light",
        color: "#3b3b3bff",
    },
    important:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffd4d4ff", 
        padding: 15, 
        borderWidth: 0.6,
        borderRadius: 10,
        borderColor: "#f84d44ff",
        marginTop: 20
    }
});