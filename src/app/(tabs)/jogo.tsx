import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Alert, ScrollView } from "react-native";
import { supabase } from "../../lib/supabase";
import { SelectList } from 'react-native-dropdown-select-list'
import { generateMatches, intercalateMatches } from "../../functions/createTournament";
import { container } from "../../../styles/global";
import { IGame, ISelect } from "../../utils/interface";

type Team = string;
type Match = [Team, Team];
type TMatch = {
  id: number;
  teamOne: string;
  teamTwo: string;
}

export default function Jogo() {
  const [groupA, setGroupA] = useState<Team[]>([])
  const [groupB, setGroupB] = useState<Team[]>([])
  const [listGames, setListGames] = useState<TMatch[]>([])
  const [tournament, setTournament] = useState('')
  const [tournamentName, setTournamentName] = useState('')
  const [teamOne, setTeamOne] = useState('')
  const [teamTwo, setTeamTwo] = useState('')
  const [dataTournament, setDataTournament] = useState<ISelect[]>([])
  const [dataTeams, setDataTeams] = useState<ISelect[]>([])
  const [isModalGenerateOpen, setIsModalGenerateOpen] = useState(false)
  const [isModalOtherOpen, setIsModalOtherOpen] = useState(false)

  function handleOpenModalGenerate() {
    setIsModalGenerateOpen(true)
  }

  function handleOpenModalOther() {
    setIsModalOtherOpen(true)
  }

  async function getTournaments(id?: number) {
    if(id) {
      const { data } = await supabase.from('tournaments').select('*').eq('id', id)
      if (data) {
        setTournamentName(data[0].name)
      }
    } else {
      const { data } = await supabase.from('tournaments').select('*')
      if (data) {
        const temp:ISelect[] = data.map(item => {
          return { key: item.id, value: item.name }
        })
        setDataTournament(temp)
      }
    }
  }

  async function getTeams() {
    const { data } = await supabase
      .from('teams')
      .select(`id, name`)
      .order('name', {ascending: true})
    if (data) {
      const temp:ISelect[] = data.map(item => {
        return { key: item.id, value: item.name }
      })
      setDataTeams(temp)
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

  async function createGames() {
    let id = 0
    getTeamsByGroup('Grupo A', setGroupA)
    getTeamsByGroup('Grupo B', setGroupB)

    const matchesGroupA = generateMatches(groupA);
    const matchesGroupB = generateMatches(groupB);

    const tournamentMatches = intercalateMatches(matchesGroupA, matchesGroupB);
    let temp:TMatch[] = [] 
    tournamentMatches.forEach(match => {
      id += 1
      temp.push({ id: id, teamOne: match[0], teamTwo: match[1] })
    });
    setListGames(temp)
    console.log('Jogos cadastrados: ',temp);
  }

  async function handleSubimt(match: TMatch) {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    try {
      const {data, error} = await supabase.from('games').insert({
        stage: 'GRUPOS',
        date_game: today,
        time_game: '20:00',
        duration: 20,
        team_one: match.teamOne,
        team_two: match.teamTwo,
        goal_team_one: 0,
        goal_team_two: 0,
        yellow_cards: 0,
        red_cards: 0,
        winner: '',
        tournament_id: tournament
      })
      if (error) {
        console.log('Erro cadastro: ',error)
      }
      // Alert.alert('Jogo cadastrado com sucesso!')
      const temp = listGames.filter(item => item.id !== match.id)
      setListGames(temp)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSubimtExtra(match: TMatch) {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    try {
      const {data, error} = await supabase.from('games').insert({
        stage: 'GRUPOS',
        date_game: today,
        time_game: '20:00',
        duration: 20,
        team_one: match.teamOne,
        team_two: match.teamTwo,
        goal_team_one: 0,
        goal_team_two: 0,
        yellow_cards: 0,
        red_cards: 0,
        winner: '',
        tournament_id: tournament
      })
      if (error) {
        console.log('Erro cadastro: ',error)
      }
      Alert.alert('Jogo cadastrado com sucesso!')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTournaments()
    getTeams()
  },[])

  return (
    <View style={container.content}>
      <Text>Jogos</Text>
      <View style={container.form}>
        <SelectList 
          placeholder="Torneio"
          boxStyles={container.input}
          setSelected={(val: string) => setTournament(val)} 
          onSelect={() => getTournaments(Number(tournament))}
          data={dataTournament} 
          save="key"
        />
        <TouchableOpacity style={container.button} onPress={handleOpenModalGenerate}>
          <Text style={container.textButton}>Criar Jogos Automaticamente</Text>
        </TouchableOpacity>
        <TouchableOpacity style={container.button} onPress={handleOpenModalOther}>
          <Text style={container.textButton}>Criar Jogos Avulsos</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalGenerateOpen}
        onRequestClose={() => {
          setIsModalGenerateOpen(!isModalGenerateOpen);
        }}
      >
        <View style={container.form}>
          <TouchableOpacity style={container.button} onPress={createGames}>
            <Text style={container.textButton}>Criar Jogos</Text>
          </TouchableOpacity>
          <Text>TORNEIO: {tournamentName}</Text>
          <Text>JOGOS CRIADOS:</Text>
          <ScrollView style={container.buttonListContainer}>
            {listGames.map((item) => (
              <View key={item.id} style={container.inputContainer}>
                <Text>{item.teamOne} x {item.teamTwo}</Text>
                <TouchableOpacity 
                  style={container.buttonAddNew} 
                  onPress={() => handleSubimt(item)}
                >
                  <Text style={container.textButtonAddNew}>Salvar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={container.button} onPress={() => setIsModalGenerateOpen(false)}>
            <Text style={container.textButton}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalOtherOpen}
        onRequestClose={() => {
          setIsModalOtherOpen(!isModalOtherOpen);
        }}
      >
        <View style={container.form}>
          <Text>CRIAR JOGO AVULSO:</Text>
          <View style={container.gameContainer}>
            <SelectList 
              placeholder="Time Um"
              boxStyles={container.select}
              setSelected={(val: string) => setTeamOne(val)} 
              data={dataTeams} 
              save="value"
            />
            <TouchableOpacity 
              style={container.buttonAddNew} 
              onPress={() => handleSubimtExtra({id: 100, teamOne: teamOne, teamTwo: teamTwo})}
            >
              <Text style={container.textButtonAddNew}>X</Text>
            </TouchableOpacity>
            <SelectList 
              placeholder="Time Dois"
              boxStyles={container.select}
              setSelected={(val: string) => setTeamTwo(val)} 
              data={dataTeams} 
              save="value"
            />
          </View>
          <TouchableOpacity style={container.button} onPress={() => setIsModalOtherOpen(false)}>
            <Text style={container.textButton}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}