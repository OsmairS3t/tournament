import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  Button,
  ScrollView,
  Alert
} from "react-native";
import { container } from "../../../styles/global";
import { SelectList } from 'react-native-dropdown-select-list'
import { EvilIcons } from '@expo/vector-icons'
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { ISelect, ITournament } from "../../utils/interface";

interface MemberInputProps {
  index: number;
}

export default function Time() {
  const [members, setMembers] = useState<number[]>([]);
  const [tournaments, setTournaments] = useState<ITournament[]>([])
  const [dataTournament, setDataTournament] = useState<ISelect[]>([])
  const [tournament, setTournament] = useState('')
  const [name, setName] = useState('')
  const [colors, setColors] = useState('')
  const [players, setPlayers] = useState('')
  
  const reset = () => {
    setName('')
    setColors('')
    setPlayers('')
  }

  async function getTournaments() {
    const { data } = await supabase.from('tournaments').select('*')
    if (data) {
      const temp = data.map(item => {
        return { key: item.id, value: item.name }
      })
      setDataTournament(temp)
    }
  }

  async function handleSubmit() {
    let jogadores:string[]=[]
    jogadores = players.split('\n')
    try {
      const { data } = await supabase
        .from('teams')
        .insert({
          tournament_id: tournament,
          name: name,
          colors: colors,
          players: jogadores
        })
        .select('id')
      const teamId = data ? data[0].id : 0
      for (let index = 0; index < jogadores.length; index++) {
        const element = jogadores[index];
        await supabase.from('players').insert({
          team_id: teamId,
          name: element
        })
      }
      Alert.alert('Time cadastrado com sucesso!')
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTournaments()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={container.content}>
        <Text style={container.header}>Time</Text>
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
            onChangeText={(text: string) => setName(text)}
          />
          <TextInput
            style={container.input}
            placeholder="Cores"
            value={colors}
            onChangeText={(text: string) => setColors(text)}
          />
          <TextInput
            style={container.inputPlayers}
            placeholder="Nomes dos Jogadores (somente nome)"
            keyboardType="default"
            multiline
            numberOfLines={20}
            maxLength={150}
            value={players}
            onChangeText={(text: string) => setPlayers(text)}
          />
          <TouchableOpacity style={container.button} onPress={handleSubmit}>
            <Text style={container.textButton}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
