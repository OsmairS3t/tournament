import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons'
import { container } from "../../../styles/global";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { ISelect, IStatusTeam } from "../../utils/interface";
import { SelectList } from "react-native-dropdown-select-list";

export default function Classification() {
  const [tournament, setTournament] = useState('')
  const [dataTournament, setDataTournament] = useState<ISelect[]>([])
  const [classification, setClassification] = useState<IStatusTeam[]>([])
  const [classGroupA, setClassGroupA] = useState<IStatusTeam[]>([])
  const [classGroupB, setClassGroupB] = useState<IStatusTeam[]>([])

  async function getTournaments() {
    const { data } = await supabase.from('tournaments').select('*')
    if (data) {
      const temp: ISelect[] = data.map(item => {
        return { key: item.id, value: item.name }
      })
      setDataTournament(temp)
    }
  }

  async function getClassGroup(tournament_id: number) {
    try {
      const dataClassA = await supabase
        .from('statusteam')
        .select('*')
        .eq('tournament_id', tournament_id)
        .eq('group_team', "Grupo A")
        .order('points', { ascending: false })
      if (dataClassA.data) {
        setClassGroupA(dataClassA.data)
      }
      if (dataClassA.error) {
        console.log('Erro lista Classificação A: ', dataClassA.error)
      }

      const dataClassB = await supabase
        .from('statusteam')
        .select('*')
        .eq('tournament_id', tournament_id)
        .eq('group_team', "Grupo B")
        .order('points', { ascending: false })
      if (dataClassB.data) {
        setClassGroupB(dataClassB.data)
      }
      if (dataClassB.error) {
        console.log('Erro lista Classificação B: ', dataClassB.error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTournaments()
  }, [])

  return (
    <View style={container.content}>
      <Text>Classificação</Text>
      <View style={container.form}>

        <View style={container.groupHeader}>
          <SelectList
            placeholder="Torneio"
            boxStyles={container.selectMini}
            setSelected={(val: string) => setTournament(val)}
            onSelect={() => getClassGroup(Number(tournament))}
            data={dataTournament}
            save="key"
          />
          <TouchableOpacity style={container.buttonIcon} onPress={() => getClassGroup(Number(tournament))}>
            <Feather name='repeat' size={20} style={container.textButtonAddNew} />
          </TouchableOpacity>
        </View>

        <Text style={container.textTblGroup}>GRUPO A:</Text>
        <View style={container.tblClassification}>
          <Text style={container.tblTTTDPrimary}>TIME</Text>
          <Text style={container.tblTTTD}>P</Text>
          <Text style={container.tblTTTD}>V</Text>
          <Text style={container.tblTTTD}>D</Text>
          <Text style={container.tblTTTD}>E</Text>
          <Text style={container.tblTTTD}>GP</Text>
          <Text style={container.tblTTTD}>GC</Text>
          <Text style={container.tblTTTD}>SG</Text>
        </View>
        {classGroupA.map(item => (
          <View key={item.id} style={container.tblClassification}>
            <Text style={container.tblTDPrimary}>{item.team_name}</Text>
            <Text style={container.tblTD}>{item.points}</Text>
            <Text style={container.tblTD}>{item.wins}</Text>
            <Text style={container.tblTD}>{item.defeats}</Text>
            <Text style={container.tblTD}>{item.draws}</Text>
            <Text style={container.tblTD}>{item.goal_scored}</Text>
            <Text style={container.tblTD}>{item.goal_conceded}</Text>
            <Text style={container.tblTD}>{item.goal_difference}</Text>
          </View>
        ))}

        <Text style={container.textTblGroup}>GRUPO B:</Text>
        <View style={container.tblClassification}>
          <Text style={container.tblTTTDPrimary}>TIME</Text>
          <Text style={container.tblTTTD}>P</Text>
          <Text style={container.tblTTTD}>V</Text>
          <Text style={container.tblTTTD}>D</Text>
          <Text style={container.tblTTTD}>E</Text>
          <Text style={container.tblTTTD}>GP</Text>
          <Text style={container.tblTTTD}>GC</Text>
          <Text style={container.tblTTTD}>SG</Text>
        </View>
        {classGroupB.map(item => (
          <View key={item.id} style={container.tblClassification}>
            <Text style={container.tblTDPrimary}>{item.team_name}</Text>
            <Text style={container.tblTD}>{item.points}</Text>
            <Text style={container.tblTD}>{item.wins}</Text>
            <Text style={container.tblTD}>{item.defeats}</Text>
            <Text style={container.tblTD}>{item.draws}</Text>
            <Text style={container.tblTD}>{item.goal_scored}</Text>
            <Text style={container.tblTD}>{item.goal_conceded}</Text>
            <Text style={container.tblTD}>{item.goal_difference}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}