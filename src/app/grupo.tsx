import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList
} from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { Feather } from '@expo/vector-icons'
import { SelectList } from 'react-native-dropdown-select-list'
import { IGroup, ISelect, ITournament } from "../utils/interface";
import { supabase } from "../lib/supabase";
import { form, global } from "../../styles/global";

type tournamentProp = {
  name: string;
}
type teamProp = {
  name: string;
}
interface ListProps {
  id: number;
  name: string;
  tournaments: tournamentProp;
  teams: teamProp;
}

export default function Grupo() {
  const [listGroups, setListGroups] = useState<any[]>([])
  const [dataTournament, setDataTournament] = useState<ISelect[]>([])
  const [dataTeam, setDataTeam] = useState<ISelect[]>([])
  const [tournament, setTournament] = useState('')
  let listIdTeam = [0]
  const [name, setName] = useState('')
  const [team, setTeam] = useState('')

  async function getTournaments() {
    const { data } = await supabase.from('tournaments').select('*')
    if (data) {
      const temp: ISelect[] = data.map(item => {
        return { key: item.id, value: item.name }
      })
      setDataTournament(temp)
      getTeams()
    }
  }

  async function getTeams() {
    const { data } = await supabase.from('teams').select('*').eq('tournament_id', tournament)
    if (data) {
      const temp: ISelect[] = data.map(item => {
        return { key: item.id, value: item.name }
      })
      setDataTeam(temp)
    }
  }

  async function handleSubmit() {
    try {
      await supabase.from('groups').insert({
        tournament_id: tournament,
        name: name,
        team_id: Number(team),
      })
      getTeams()
      ListGroups()
      console.log(listIdTeam)
    } catch (error) {
      console.log(error)
    }
  }

  async function ListGroups() {
    try {
      const { data } = await supabase
        .from('groups')
        .select(`
        id, name, tournaments(name), teams(name)
      `)
        .order('name', { ascending: true })
      if (data) {
        setListGroups(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function handleBack() {
    router.back()
  }

  useEffect(() => {
    getTournaments()
    ListGroups()
  }, [])

  return (
      <View style={global.container}>
        <View style={global.headerPage}>
          <TouchableOpacity onPress={handleBack}>
            <Feather name='arrow-left' size={24} />
          </TouchableOpacity>
          <Text style={global.title}>Grupos</Text>
        </View>

        <View style={form.container}>
          <SelectList
            placeholder="Torneio"
            boxStyles={form.input}
            setSelected={(val: string) => setTournament(val)}
            onSelect={getTeams}
            data={dataTournament}
            save="key"
          />
          <TextInput
            style={form.input}
            placeholder="Nome do Grupo"
            value={name}
            onChangeText={(text: string) => setName(text)}
          />
          <SelectList
            placeholder="Time"
            boxStyles={form.input}
            setSelected={(val: string) => setTeam(val)}
            data={dataTeam}
            save="key"
          />
          <TouchableOpacity style={form.button} onPress={handleSubmit}>
            <Text style={form.textButton}>Salvar</Text>
          </TouchableOpacity>
        </View>

        {
          listGroups.map(item => (
            <View key={item.id} style={form.block}>
              <View style={form.subBlock}>
                <Text>{item.name}:</Text>
                <Text>{item.teams.name}</Text>
              </View>
            </View>
          ))
        }
      </View>
  )
}
