import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { supabase } from "../../lib/supabase";
import { SelectList } from 'react-native-dropdown-select-list'
import { generateMatches, intercalateMatches } from "../../functions/createTournament";
import { container } from "../../../styles/global";
import { IGame, ISelect } from "../../utils/interface";

type Team = string;
type Match = [Team, Team];

export default function Jogo() {
  const [groupA, setGroupA] = useState<Team[]>([])
  const [groupB, setGroupB] = useState<Team[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [tournament, setTournament] = useState('')
  const [group, setGroup] = useState('')
  const [dataTournament, setDataTournament] = useState<ISelect[]>([])
  const [dataGroup, setDataGroup] = useState<ISelect[]>([])

  // const groupA: Team[] = ['Equipe A1', 'Equipe A2', 'Equipe A3', 'Equipe A4'];
  // const groupB: Team[] = ['Equipe B1', 'Equipe B2', 'Equipe B3', 'Equipe B4'];
  // const matchesGroupA = generateMatches(groupA);
  // const matchesGroupB = generateMatches(groupB);
  // const tournamentMatches = intercalateMatches(matchesGroupA, matchesGroupB);

  async function getTournaments() {
    const { data } = await supabase.from('tournaments').select('*')
    if (data) {
      const temp:ISelect[] = data.map(item => {
        return { key: item.id, value: item.name }
      })
      setDataTournament(temp)
    }
  }
  
  async function getTeamsByGroup(group: string, setLista: React.Dispatch<React.SetStateAction<string[]>>) {
    try {
      let element:string[] = []
      const { data, error } = await supabase
        .from('groups').select(`name, teams(name)`)
        .eq('name', group)
        .order('name', {ascending: true})
      if (data) {
        const temp:any[] = data
        temp.map(item => {
          element.push(item.teams.name)
        })
        setLista(element)
      } else {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // tournamentMatches.forEach(match => {
  //     console.log(`${match[0]} vs ${match[1]}`);
  // });

  async function handleSubmit() {
    let games: IGame[] = []
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    getTeamsByGroup('Grupo A', setGroupA)
    getTeamsByGroup('Grupo B', setGroupB)

    const matchesGroupA = generateMatches(groupA);
    const matchesGroupB = generateMatches(groupB);

    const tournamentMatches = intercalateMatches(matchesGroupA, matchesGroupB);
    tournamentMatches.forEach(async(match) => {
      await supabase.from('games').insert({
        stage: 'GRUPOS',
        data_game: today,
        time_game: '20:00',
        duration: 20,
        team_one: match[0],
        team_two: match[1],
        goal_team_one: 0,
        goal_team_two: 0,
        yellow_cards: 0,
        red_cards: 0,
        winner: ''
      })
    });
    Alert.alert('Jogos cadastrados com sucesso!')
    // console.log('Jogos cadastrados: ',games);
  }

  useEffect(() => {
    getTournaments()
  },[])

  return (
    <View style={container.content}>
      <Text>Jogos</Text>
      <View style={container.form}>
      <SelectList 
            placeholder="Torneio"
            boxStyles={container.input}
            setSelected={(val: string) => setTournament(val)} 
            data={dataTournament} 
            save="key"
          />
          <TouchableOpacity style={container.button} onPress={handleSubmit}>
            <Text style={container.textButton}>Criar Jogos</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}