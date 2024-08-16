import { Text, TouchableOpacity, View } from "react-native";
import { container } from "../../../styles/global";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { ISelect, IStatusTeam } from "../../utils/interface";
import { SelectList } from "react-native-dropdown-select-list";

export default function Classification() {
  const [tournament, setTournament] = useState('')
  const [dataTournament, setDataTournament] = useState<ISelect[]>([])
  const [classification, setClassification] = useState<IStatusTeam[]>([])
  
  async function getTournaments() {
    const { data } = await supabase.from('tournaments').select('*')
    if (data) {
      const temp:ISelect[] = data.map(item => {
        return { key: item.id, value: item.name }
      })
      setDataTournament(temp)
    }
  }

  async function getClassification(tournament_id: number) {
    const { data, error } = await supabase
      .from('statusteam')
      .select('*')
      .eq('tournament_id', tournament_id)
      .order('points', {ascending: false})
    if (data) {
      setClassification(data)
    }
    if (error) {
      console.log('Erro lista Classificação: ', error)
    }
  }

  useEffect(() => {
    getTournaments()
  },[])

  return (
    <View style={container.content}>
      <Text>Classificação</Text>
      <View style={container.form}>
        <SelectList 
          placeholder="Torneio"
          boxStyles={container.input}
          setSelected={(val: string) => setTournament(val)} 
          onSelect={() => getClassification(Number(tournament))}
          data={dataTournament} 
          save="key"
        />
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
        {classification.map(item => (
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