// app/_layout.js
import SkinDataProvider  from '../context/SkinDataContext';
import {Stack} from 'expo-router';

//wrap the children components with the context
export default function RootLayout() {
  return (
    <SkinDataProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="skin_types" options={{ title: "Skin Type" }} />
        <Stack.Screen name="sensitivity" options={{ title: "Sensitivity" }} />
        <Stack.Screen name="skincare_exp" options={{ title: "Skincare Experience" }} />
      </Stack>
    </SkinDataProvider>
  );
}