import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { container } from "../../../styles/global";

export default function Home() {
  return (
    <View style={container.content}>
      <Text>Home</Text>
      <TouchableOpacity style={container.button}>
        <Text style={container.textButton}>Criar Jogos</Text>
      </TouchableOpacity>
    </View>
  )
}