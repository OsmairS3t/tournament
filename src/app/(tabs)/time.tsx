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
  const [tournament, setTournament] = useState('')
  const [name, setName] = useState('')
  const [colors, setColors] = useState('')
  const [players, setPlayers] = useState('')

  const dataTournament = [
    {key: '1', value: 'Campeonato de Futsal 2024'},
    {key: '2', value: 'Campeonato de Voleibol 2024' },
  ]

  function handleSubmit() {
    const data = {
      tournament_id: tournament,
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
          <SelectList 
            placeholder="Torneio"
            boxStyles={container.input}
            setSelected={(val: string) => setTournament(val)} 
            data={dataTournament} 
            save="key"
          />
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
