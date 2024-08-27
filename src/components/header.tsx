import { Image, Text, View } from "react-native";

import { header } from "../../styles/global";

export default function Header() {
  return (
    <View style={header.content}>
      <Image source={require("../assets/logotipo.png")} style={header.image} />
      <Text style={header.textApp}>SISTEMA PARA TORNEIOS</Text>
    </View>
  )
}