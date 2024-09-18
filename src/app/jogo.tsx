import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, Alert, ScrollView } from "react-native";
import { Feather } from '@expo/vector-icons'
import { supabase } from "../lib/supabase";
import { SelectList } from 'react-native-dropdown-select-list'
import { generateMatches, intercalateMatches } from "../functions/createTournament";
import { container, global, form } from "../../styles/global";
import { IGame, ISelect } from "../utils/interface";
import { router } from "expo-router";

type Team = string;
type Match = [Team, Team];
type TMatch = {
  id: number;
  teamOne: string;
  teamTwo: string;
  group: string;
}

export default function Jogo() {
  const [groupA, setGroupA] = useState<Team[]>([])
  const [groupB, setGroupB] = useState<Team[]>([])
  const [stage, setStage] = useState('')
  const [listGames, setListGames] = useState<TMatch[]>([])
  const [tournament, setTournament] = useState('')
  const [tournamentName, setTournamentName] = useState('')
  const [tournamentModality, setTournamentModality] = useState('')
  const [teamOne, setTeamOne] = useState('')
  const [teamTwo, setTeamTwo] = useState('')
  const [group, setGroup] = useState('')
  const [duration, setDurtion] = useState('')
  const [dataTournament, setDataTournament] = useState<ISelect[]>([])
  const [dataTeams, setDataTeams] = useState<ISelect[]>([])
  const [isModalGenerateOpen, setIsModalGenerateOpen] = useState(false)
  const [isModalOtherOpen, setIsModalOtherOpen] = useState(false)
  let id_game_created = 0

  function handleOpenModalGenerate() {
    setIsModalGenerateOpen(true)
  }

  function handleOpenModalOther() {
    setIsModalOtherOpen(true)
  }

  async function getTournaments(id?: number) {
    if (id) {
      const { data } = await supabase.from('tournaments').select('*').eq('id', id)
      if (data) {
        setTournamentName(data[0].name)
        setTournamentModality(data[0].modality)
      }
    } else {
      const { data } = await supabase.from('tournaments').select('*')
      if (data) {
        const temp: ISelect[] = data.map(item => {
          return { key: item.id, value: item.name }
        })
        setDataTournament(temp)
      }
    }
    getTeams()
  }

  async function getTeams() {
    const { data } = await supabase
      .from('teams')
      .select(`id, name`)
      .eq('tournament_id', Number(tournament))
      .order('name', { ascending: true })
    if (data) {
      const temp: ISelect[] = data.map(item => {
        return { key: item.id, value: item.name }
      })
      setDataTeams(temp)
    }
  }

  async function getTeamsByGroup(group: string, setLista: React.Dispatch<React.SetStateAction<string[]>>) {
    try {
      let element: string[] = []
      const { data, error } = await supabase
        .from('groups').select(`name, teams(name)`)
        .eq('name', group)
        .order('name', { ascending: true })
      if (data) {
        const temp: any[] = data
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

    const matchesGroupA = generateMatches(groupA, 'Grupo A');
    const matchesGroupB = generateMatches(groupB, 'Grupo B');

    const tournamentMatches = intercalateMatches(matchesGroupA, matchesGroupB);
    let temp: TMatch[] = []
    tournamentMatches.forEach(match => {
      id += 1
      temp.push({ id: id, teamOne: match[0], teamTwo: match[1], group: match[2] })
    });
    setListGames(temp)
    // console.log('Jogos cadastrados: ', temp);
  }

  async function handleSubimt(match: TMatch) {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    try {
      const { data, error } = await supabase
        .from('games')
        .insert({
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
          tournament_id: tournament,
          status_game: false,
          group_team: match.group
        })
      if (error) {
        console.log('Erro cadastro: ', error)
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
      const { data, error } = await supabase.from('games').insert({
        stage: stage,
        date_game: today,
        time_game: '20:00',
        duration: duration,
        team_one: match.teamOne,
        team_two: match.teamTwo,
        goal_team_one: 0,
        goal_team_two: 0,
        yellow_cards: 0,
        red_cards: 0,
        winner: '',
        tournament_id: tournament,
        status_game: false,
        group_team: group
      }).select('id')
      if (error) {
        console.log('Erro cadastro: ', error)
      } else {
        id_game_created = data[0].id
        if (tournamentModality === 'Volei') {
          createSets()
        }
      }
      Alert.alert('Jogo cadastrado com sucesso!')
    } catch (error) {
      console.log(error)
    }
  }

  async function createSets() {
    await supabase.from('gamesets').insert({ id_game: id_game_created, actual_set: 1, set_point_one: 0, set_point_two: 0 })
    await supabase.from('gamesets').insert({ id_game: id_game_created, actual_set: 2, set_point_one: 0, set_point_two: 0 })
    await supabase.from('gamesets').insert({ id_game: id_game_created, actual_set: 3, set_point_one: 0, set_point_two: 0 })
    await supabase.from('gamesets').insert({ id_game: id_game_created, actual_set: 4, set_point_one: 0, set_point_two: 0 })
    await supabase.from('gamesets').insert({ id_game: id_game_created, actual_set: 5, set_point_one: 0, set_point_two: 0 })
  }

  function handleBack() {
    router.back()
  }

  useEffect(() => {
    getTournaments()
    getTeams()
  }, [])

  return (
    <View style={global.container}>
      <View style={global.headerPage}>
        <TouchableOpacity onPress={handleBack}>
          <Feather name='arrow-left' size={24} />
        </TouchableOpacity>
        <Text style={global.title}>Jogos</Text>
      </View>

      <View style={form.container}>
        <TouchableOpacity style={form.button} onPress={handleOpenModalGenerate}>
          <Text style={form.textButton}>Criar Jogos Automaticamente</Text>
        </TouchableOpacity>
        <TouchableOpacity style={form.button} onPress={handleOpenModalOther}>
          <Text style={form.textButton}>Criar Jogos Avulsos</Text>
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
        <View style={global.container}>
          <View style={container.headerModalPage}>
            <Text style={container.textHeaderModalPage}>CRIAR JOGOS AUTOMATICAMENTE:</Text>
            <TouchableOpacity style={container.buttonHeaderPage} onPress={() => setIsModalGenerateOpen(false)}>
              <Feather name="x-square" size={30} style={container.iconClose} />
            </TouchableOpacity>
          </View>

          <View style={form.container}>
            <SelectList
              placeholder="Torneio"
              boxStyles={form.select}
              setSelected={(val: string) => setTournament(val)}
              onSelect={() => getTournaments(Number(tournament))}
              data={dataTournament}
              save="key"
            />

            <SelectList
              placeholder="Fase"
              boxStyles={form.select}
              setSelected={(val: string) => setStage(val)}
              data={[
                { key: 'GRUPOS', value: 'GRUPOS' },
                { key: 'SEMIFINAL', value: 'SEMIFINAL' },
                { key: '3 LUGAR', value: '3 LUGAR' },
                { key: 'FINAL', value: 'FINAL' },
              ]}
              save="key"
            />
            
            <TouchableOpacity style={form.button} onPress={createGames}>
              <Text style={form.textButton}>Criar Jogos</Text>
            </TouchableOpacity>
          </View>

          <Text style={global.text}>TORNEIO: {tournamentName}</Text>

          <Text style={global.text}>JOGOS CRIADOS:</Text>
          <ScrollView style={container.buttonListContainer}>
            {listGames.map((item) => (
              <View key={item.id} style={container.inputContainer}>
                <Text>{item.group} - {item.teamOne} x {item.teamTwo}</Text>
                <TouchableOpacity
                  style={container.buttonAddNew}
                  onPress={() => handleSubimt(item)}
                >
                  <Text style={container.textButtonAddNew}>Salvar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

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
        <View style={form.container}>
          <View style={container.headerModalPage}>
            <Text style={container.textHeaderModalPage}>CRIAR JOGOS AVULSOS:</Text>
            <TouchableOpacity style={container.buttonHeaderPage} onPress={() => setIsModalOtherOpen(false)}>
              <Feather name="x-square" size={30} style={container.iconClose} />
            </TouchableOpacity>
          </View>

          <SelectList
            placeholder="Torneio"
            boxStyles={container.input}
            setSelected={(val: string) => setTournament(val)}
            onSelect={() => getTournaments(Number(tournament))}
            data={dataTournament}
            save="key"
          />

          <SelectList
            placeholder="Fase"
            boxStyles={container.input}
            setSelected={(val: string) => setStage(val)}
            data={[
              { key: 'GRUPOS', value: 'GRUPOS' },
              { key: 'SEMIFINAL', value: 'SEMIFINAL' },
              { key: '3 LUGAR', value: '3 LUGAR' },
              { key: 'FINAL', value: 'FINAL' },
            ]}
            save="key"
          />

          {tournamentModality === "Futebol" ? 
            <TextInput
              style={container.input}
              placeholder="Duração em min"
              keyboardType="numeric"
              value={duration}
              onChangeText={(text: string) => setDurtion(text)}
            />
            :
            <TextInput
              style={container.input}
              placeholder="Pontos por Set"
              keyboardType="numeric"
              value={duration}
              onChangeText={(text: string) => setDurtion(text)}
            />
          }

          {stage === 'GRUPOS' &&
            <SelectList
              placeholder="Grupo"
              boxStyles={container.input}
              setSelected={(val: string) => setGroup(val)}
              data={[
                { key: 'Group A', value: 'Group A' },
                { key: 'Group B', value: 'Group B' }
              ]}
              save="key"
            />
          }

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
              onPress={() => handleSubimtExtra({ id: 100, teamOne: teamOne, teamTwo: teamTwo, group: group })}
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
        </View>
      </Modal>
    </View>
  )
}