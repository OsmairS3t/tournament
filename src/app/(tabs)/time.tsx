import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView
} from "react-native";
import { container } from "../../../styles/global";
import { SelectList } from 'react-native-dropdown-select-list'
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { ISelect, ITournament } from "../../utils/interface";

export default function Time() {
  const [tournaments, setTournaments] = useState<ITournament[]>([])
  const [dataTournament, setDataTournament] = useState<ISelect[]>([])
  const [tournament, setTournament] = useState('')
  const [name, setName] = useState('')
  const [colors, setColors] = useState('')
  const [players, setPlayers] = useState('')

  async function getTournaments() {
    const { data } = await supabase.from('tournaments').select('*')
    if (data) {
      const temp = data.map(item => {
        return {key: item.id, value: item.name}
      })
      setDataTournament(temp)
    }
  }

  function handleSubmit() {
    const data = {
      tournament_id: tournament,
      name: name,
      colors: colors,
      players: players
    }
    // const { data, error } = await supabase
    //   .from('arraytest')
    //   .insert([{ id: 2, textarray: ['one', 'two', 'three', 'four'] }])

    console.log(data)
  }

  useEffect(() => {
    getTournaments()
  },[])

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
