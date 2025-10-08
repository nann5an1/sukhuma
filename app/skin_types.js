
import {View, Text, Button} from 'react-native';
import { router } from 'expo-router';
export default function skin_types() {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>skin_types</Text>
            <Button style={{marginVertical: 30}}
            title="Go Back"
            onPress={() => router.push("/")}>
            </Button>
        </View>
    );
}