import { Image, View } from "react-native";

import { footer } from "../../styles/global";

export default function Footer() {
  return (
    <View style={footer.container}>
      <Image source={require("../assets/creditos.png")} style={footer.image} />
    </View>
  )
}