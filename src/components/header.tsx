import { Image, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'silver'}}>
      <Image source={require("../assets/logotipo.png")} style={{width: 100, height: 100}} />    
      <Text>SISTEMA PARA TORNEIOS</Text>
      <Image source={require("../assets/creditos.png")} style={{width: 100, height: 100}} />    
    </View>
  )
}