import { StyleSheet, Text, View } from 'react-native';
import Navigate from './navigation/navigate';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { LogBox } from 'react-native';


export default function App() {
  
  let [fontsLoaded] = useFonts({
    'Gilroy-Thin': require('./assets/fonts/Gilroy-Thin.ttf'),
    'Gilroy-Regular': require('./assets/fonts/Gilroy-Regular.ttf'),
    'Gilroy-Medium': require('./assets/fonts/Gilroy-Medium.ttf'),
    'Gilroy-Bold': require('./assets/fonts/Gilroy-Bold.ttf'),
    'Gilroy-SemiBold': require('./assets/fonts/Gilroy-SemiBold.ttf'),
    'Gilroy-ExtraBold': require('./assets/fonts/Gilroy-ExtraBold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
      <Navigate />
  );
}
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);
const styles = StyleSheet.create({
});
