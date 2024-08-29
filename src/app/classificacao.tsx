import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { Feather } from '@expo/vector-icons'
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import { ISelect, IStatusTeam } from "../utils/interface";
import { SelectList } from "react-native-dropdown-select-list";
import { container, form, global } from "../../styles/global";

type TFinalClass = {
  firstPlace: string;
  secondPlace: string;
  thirdPlace: string;
}

export default function Classification() {
  const [tournament, setTournament] = useState('')
  const [finalClass, setFinalClass] = useState<TFinalClass>()
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

  function getClass(tournament_id: number) {
    getClassGroup(tournament_id)
    classFinal(tournament_id)
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

  async function classFinal(tournament_id: number) {
    const { data } = await supabase
      .from('games')
      .select('*')
      .eq('tournament_id', tournament_id)
      .not('stage', 'eq', 'GRUPOS')
    if (data) {
      let third = ''
      let second = ''
      let first = ''
      data.map(item => {
        if (item.stage === '3 LUGAR') {
          if (item.goal_team_one > item.goal_team_two) {
            third = item.team_one
          }
          if (item.goal_team_one < item.goal_team_two) {
            third = item.team_two
          }
          if (item.goal_team_one === item.goal_team_two) {
            if (item.goal_penalty_one > item.goal_penalty_two) {
              third = item.team_one
            }
            if (item.goal_penalty_one < item.goal_penalty_two) {
              third = item.team_two
            }
          }
        }
        if (item.stage === 'FINAL') {
          if (item.goal_team_one > item.goal_team_two) {
            first = item.team_one
            second = item.team_two
          }
          if (item.goal_team_one < item.goal_team_two) {
            first = item.team_two
            second = item.team_one
          }
          if (item.goal_team_one === item.goal_team_two) {
            if (item.goal_penalty_one > item.goal_penalty_two) {
              first = item.team_one
              second = item.team_two
            }
            if (item.goal_penalty_one < item.goal_penalty_two) {
              first = item.team_two
              second = item.team_one
            }
          }
        }
      })
      setFinalClass({
        firstPlace: first,
        secondPlace: second,
        thirdPlace: third
      })
    }
  }

  function handleBack() {
    router.back()
  }

  useEffect(() => {
    getTournaments()
  }, [])

  return (
    <View style={global.container}>
      <View style={global.headerPage}>
        <TouchableOpacity onPress={handleBack}>
          <Feather name='arrow-left' size={24} />
        </TouchableOpacity>
        <Text style={global.title}>Classificar</Text>
      </View>
      <View style={form.container}>

        <View style={container.groupHeader}>
          <SelectList
            placeholder="Torneio"
            boxStyles={container.selectMini}
            setSelected={(val: string) => setTournament(val)}
            onSelect={() => getClass(Number(tournament))}
            data={dataTournament}
            save="key"
          />
          <TouchableOpacity style={container.buttonIcon} onPress={() => getClass(Number(tournament))}>
            <Feather name='repeat' size={20} style={container.textButtonAddNew} />
          </TouchableOpacity>
        </View>

        <Text style={form.textTblGroup}>GRUPO A:</Text>
        <View style={form.tblClassification}>
          <Text style={form.tblTTTDPrimary}>TIME</Text>
          <Text style={form.tblTTTD}>P</Text>
          <Text style={form.tblTTTD}>V</Text>
          <Text style={form.tblTTTD}>D</Text>
          <Text style={form.tblTTTD}>E</Text>
          <Text style={form.tblTTTD}>GP</Text>
          <Text style={form.tblTTTD}>GC</Text>
          <Text style={form.tblTTTD}>SG</Text>
        </View>
        {classGroupA.map(item => (
          <View key={item.id} style={form.tblClassification}>
            <Text style={form.tblTDPrimary}>{item.team_name}</Text>
            <Text style={form.tblTD}>{item.points}</Text>
            <Text style={form.tblTD}>{item.wins}</Text>
            <Text style={form.tblTD}>{item.defeats}</Text>
            <Text style={form.tblTD}>{item.draws}</Text>
            <Text style={form.tblTD}>{item.goal_scored}</Text>
            <Text style={form.tblTD}>{item.goal_conceded}</Text>
            <Text style={form.tblTD}>{item.goal_difference}</Text>
          </View>
        ))}

        <Text style={form.textTblGroup}>GRUPO B:</Text>
        <View style={form.tblClassification}>
          <Text style={form.tblTTTDPrimary}>TIME</Text>
          <Text style={form.tblTTTD}>P</Text>
          <Text style={form.tblTTTD}>V</Text>
          <Text style={form.tblTTTD}>D</Text>
          <Text style={form.tblTTTD}>E</Text>
          <Text style={form.tblTTTD}>GP</Text>
          <Text style={form.tblTTTD}>GC</Text>
          <Text style={form.tblTTTD}>SG</Text>
        </View>
        {classGroupB.map(item => (
          <View key={item.id} style={form.tblClassification}>
            <Text style={form.tblTDPrimary}>{item.team_name}</Text>
            <Text style={form.tblTD}>{item.points}</Text>
            <Text style={form.tblTD}>{item.wins}</Text>
            <Text style={form.tblTD}>{item.defeats}</Text>
            <Text style={form.tblTD}>{item.draws}</Text>
            <Text style={form.tblTD}>{item.goal_scored}</Text>
            <Text style={form.tblTD}>{item.goal_conceded}</Text>
            <Text style={form.tblTD}>{item.goal_difference}</Text>
          </View>
        ))}
      </View>

      {finalClass &&
        <View style={{ width: '95%' }}>
          <Text style={form.finalClassTitle}>CLASSIFICAÇÃO FINAL:</Text>
          <View>
            <View style={form.groupClass}>
            <Text style={form.bold}>CAMPEÃO:</Text>
            <Text style={form.finalClassFirst}>{finalClass?.firstPlace}</Text>
            </View>
            <View style={form.groupClass}>
            <Text style={form.bold}>VICE-CAMPEÃO:</Text>
            <Text style={form.finalClassSecond}>{finalClass?.secondPlace}</Text>
            </View>
            <View style={form.groupClass}>
            <Text style={form.bold}>3º LUGAR:</Text>
            <Text style={form.finalClassThird}>{finalClass?.thirdPlace}</Text>
            </View>
          </View>
        </View>
      }
    </View>
  )
}