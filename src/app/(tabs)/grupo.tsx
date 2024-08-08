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

export default function Grupo() {
  const [tournament, setTournament] = useState('')
  const [name, setName] = useState('')
  const [team, setTeam] = useState('')

  const dataTournament = [
    {key: '1', value: 'Campeonato de Futsal 2024'},
    {key: '2', value: 'Campeonato de Voleibol 2024' },
  ]
  const dataTeam = [
    {key: "1", value: "Alianca"},
    {key: "2", value: "Flamengo"},
    {key: "3", value: "Goias"},
  ]

  function handleSubmit() {
    const data = {
      tournament_id: tournament,
      name: name,
      team_id: team,
    }
    console.log(data)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={container.content}>
        <Text style={container.title}>Grupos</Text>
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
            placeholder="Nome do Grupo"
            value={name}
            onChangeText={(text:string) => setName(text)}
          />
          <SelectList 
            placeholder="Time"
            boxStyles={container.input}
            setSelected={(val: string) => setTeam(val)} 
            data={dataTeam} 
            save="key"
          />
          <TouchableOpacity style={container.button} onPress={handleSubmit}>
            <Text style={container.textButton}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
