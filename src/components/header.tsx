import { Image, View } from "react-native";

import { header } from "../../styles/global";

export default function Header() {
  return (
    <View style={header.content}>
      <Image source={require("../assets/logotipo.png")} style={header.image} />
    </View>
  )
}