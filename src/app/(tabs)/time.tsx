import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView
} from "react-native";
import { container } from "../../../styles/global";
import { SelectList } from 'react-native-dropdown-select-list'
import { useState } from "react";

export default function Time() {
  const [name, setName] = useState('')
  const [colors, setColors] = useState('')
  const [players, setPlayers] = useState('')

  function handleSubmit() {
    const data = {
      name: name,
      colors: colors,
      players: players
    }
    console.log(data)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={container.content}>
        <Text style={container.title}>Time</Text>
        <View style={container.form}>
          <TextInput 
            style={container.input}
            placeholder="Nome do time"
            value={name}
            onChangeText={(text:string) => setName(text)}
          />
          <TextInput 
            style={container.input}
            placeholder="Cores"
            value={colors}
            onChangeText={(text:string) => setColors(text)}
          />
          <TextInput 
            style={container.input}
            placeholder="Jogadores"
            value={players}
            onChangeText={(text:string) => setPlayers(text)}
          />
          <TouchableOpacity style={container.button} onPress={handleSubmit}>
            <Text style={container.textButton}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
