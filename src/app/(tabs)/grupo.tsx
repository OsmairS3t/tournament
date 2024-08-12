import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  FlatList
} from "react-native";
import { container } from "../../../styles/global";
import { SelectList } from 'react-native-dropdown-select-list'
import { useEffect, useState } from "react";
import { IGroup, ISelect, ITournament } from "../../utils/interface";
import { supabase } from "../../lib/supabase";

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
  const [listGroups, setListGroups] = useState<ListProps[]>([])
  const [dataTournament, setDataTournament] = useState<ISelect[]>([])
  const [dataTeam, setDataTeam] = useState<ISelect[]>([])
  const [tournament, setTournament] = useState('')
  let listIdTeam = [0]
  const [name, setName] = useState('')
  const [team, setTeam] = useState('')

  async function getTournaments() {
    const { data } = await supabase.from('tournaments').select('*')
    if (data) {
      const temp:ISelect[] = data.map(item => {
        return { key: item.id, value: item.name }
      })
      setDataTournament(temp)
      getTeams()
    }
  }

  async function getTeams() {
    // const { data } = await supabase
    //   .from('groups')
    //   .select('team_id')
    //   .eq('tournament_id', tournament)
    // if (data) {
    //   data.map(item => {
    //     listIdTeam.push(item.team_id)
    //   })
    // } 
    // if (listIdTeam.length > 1) {
    const { data } = await supabase.from('teams').select('*')
    if (data) {
      const temp:ISelect[] = data.map(item => {
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
      .order('name', {ascending: true})
      if(data){
        setListGroups(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTournaments()
    ListGroups()
  },[])

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
        
        {
          listGroups.map(item => (
            <View key={item.id} style={container.block}>
              <View style={container.subBlock}>
                <Text>{item.name}:</Text>
                <Text>{item.teams.name}</Text>
              </View>
            </View>
          ))
        }
      </View>
    </SafeAreaView>
  )
}
