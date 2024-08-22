import { View, Text, Modal, TouchableOpacity, ScrollView, Alert, Button } from "react-native";
import { container } from "../../../styles/global";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { Feather } from '@expo/vector-icons'
import { SelectList } from "react-native-dropdown-select-list";
import { IGame, ISelect } from "../../utils/interface";
import Countdown from "../../functions/CountDown";
import Header from "../../components/header";

export default function Home() {
  const [tournamentId, setTournamentId] = useState('')
  const [tournamentName, setTournamentName] = useState('')
  const [dataTournament, setDataTournament] = useState<ISelect[]>([])
  const [games, setGames] = useState<IGame[]>([])
  const [game, setGame] = useState<IGame>()
  const [isModalGameOpen, setIsModalGameOpen] = useState(false)
  const [goalOne, setGoalOne] = useState(0)
  const [goalTwo, setGoalTwo] = useState(0)
  const [goalPenaltyOne, setGoalPenaltyOne] = useState(0)
  const [goalPenaltyTwo, setGoalPenaltyTwo] = useState(0)
  const [teamOne, setTeamOne] = useState('')
  const [teamTwo, setTeamTwo] = useState('')
  const [stage, setStage] = useState('')
  const [textButtonPenalty, setTextButtonPenalty] = useState('Ir para cobrança de Penaltis')
  const [isPenalty, setIsPenalty] = useState<boolean>(false)
  let count = 1

  async function loadClassification() {
    try {
      const classGroupA = await supabase
        .from('statusteam')
        .select('*')
        .eq('tournament_id', tournamentId)
        .eq('group_team', 'Grupo A')
        .order('points', {ascending: false})
        .order('wins', {ascending: false})
        .order('defeats', {ascending: true})
        .order('draws', {ascending: true})
        .order('draws', {ascending: true})
        .order('goal_scored', {ascending: false})
        .order('goal_conceded', {ascending: true})
        .order('goal_difference', {ascending: false})
      if (classGroupA.data) {
        let ordem = 1
        classGroupA.data.map(async (item) => {
          await supabase
            .from('statusteam')
            .update({classification: ordem ++})
            .eq('id', item.id)
        })
      }

      const classGroupB = await supabase
        .from('statusteam')
        .select('*')
        .eq('tournament_id', tournamentId)
        .eq('group_team', 'Grupo B')
        .order('points', {ascending: false})
        .order('wins', {ascending: false})
        .order('defeats', {ascending: true})
        .order('draws', {ascending: true})
        .order('draws', {ascending: true})
        .order('goal_scored', {ascending: false})
        .order('goal_conceded', {ascending: true})
        .order('goal_difference', {ascending: false})
      if (classGroupB.data) {
        let ordem = 1
        classGroupB.data.map(async (item) => {
          await supabase
          .from('statusteam')
          .update({classification: ordem ++})
          .eq('id', item.id)
        })
      }
      if (classGroupB.error) {
        console.log(classGroupB.error)
      }
      Alert.alert('Times classificados com sucesso.')
    } catch (error) {
      console.log(error)
    }
  }

  async function getTournaments() {
    const { data } = await supabase.from('tournaments').select('*')
    if (data) {
      const temp: ISelect[] = data.map(item => {
        return { key: item.id, value: item.name }
      })
      setDataTournament(temp)
    }
  }

  async function listGames(id_tournament: number, stage: string) {
    const dataTournament = await supabase.from('tournaments').select('*').eq('id', id_tournament)
    if (dataTournament.data) {
      setTournamentName(dataTournament.data[0].name)
    }
    const { data } = await supabase
      .from('games')
      .select('*').order('id')
      .eq('tournament_id',id_tournament)
      .eq('stage',stage)
    if (data) {
      setGames(data)
    }
  }

  function loadPenalties() {
    if (textButtonPenalty === 'Ir para cobrança de Penaltis') {
      setIsPenalty(true)
      setTextButtonPenalty('Fechar cobrança de Penaltis')
    } else {
      setIsPenalty(false)
      setTextButtonPenalty('Ir para cobrança de Penaltis')
    }
  }

  function GoalPenaltyOne(value: string) {
    if (value === '-') {
      setGoalPenaltyOne(goalPenaltyOne - 1)
    } else {
      setGoalPenaltyOne(goalPenaltyOne + 1)
    }
  }

  function GoalPenaltyTwo(value: string) {
    if (value === '-') {
      setGoalPenaltyTwo(goalPenaltyTwo - 1)
    } else {
      setGoalPenaltyTwo(goalPenaltyTwo + 1)
    }
  }

  function GoalOne(value: string) {
    if (value === '-') {
      setGoalOne(goalOne - 1)
    } else {
      setGoalOne(goalOne + 1)
    }
  }

  function GoalTwo(value: string) {
    if (value === '-') {
      setGoalTwo(goalTwo - 1)
    } else {
      setGoalTwo(goalTwo + 1)
    }
  }

  function playGame(gamePlay: IGame) {
    setIsModalGameOpen(true)
    setGame(gamePlay)
    setGoalOne(gamePlay.goal_team_one)
    setGoalTwo(gamePlay.goal_team_two)
    setTeamOne(gamePlay.team_one)
    setTeamTwo(gamePlay.team_two)
    // setGroup(gamePlay.group_team)
  }

  async function saveGame() {
    let winner = ''
    let tournamentId = 0
    let groupTeam = ''
    let tOpoints = 0
    let tOwins = 0
    let tOdefeats = 0
    let tOdraws = 0
    let tOgoal_scored = 0
    let tOgoal_conceded = 0
    let tOgoal_difference = 0
    let tTpoints = 0
    let tTwins = 0
    let tTdefeats = 0
    let tTdraws = 0
    let tTgoal_scored = 0
    let tTgoal_conceded = 0
    let tTgoal_difference = 0
    let tODBpoints = 0
    let tODBwins = 0
    let tODBdefeats = 0
    let tODBdraws = 0
    let tODBgoal_scored = 0
    let tODBgoal_conceded = 0
    let tODBgoal_difference = 0
    let tTDBpoints = 0
    let tTDBwins = 0
    let tTDBdefeats = 0
    let tTDBdraws = 0
    let tTDBgoal_scored = 0
    let tTDBgoal_conceded = 0
    let tTDBgoal_difference = 0
    if (game) {
      tournamentId = game.tournament_id
      groupTeam = game.group_team
      if (goalOne > goalTwo) { //teamOne Win
        winner = game.team_one
        tOpoints = 3
        tOwins = 1
        tOdefeats = 0
        tOdraws = 0
        tOgoal_scored = goalOne
        tOgoal_conceded = goalTwo
        tOgoal_difference = goalOne - goalTwo
        tTpoints = 0
        tTwins = 0
        tTdefeats = 1
        tTdraws = 0
        tTgoal_scored = goalTwo
        tTgoal_conceded = goalOne
        tTgoal_difference = goalTwo - goalOne
      }
      if (goalOne < goalTwo) {  //teamTwo Win
        winner = game.team_two
        tTpoints = 3
        tTwins = 1
        tTdefeats = 0
        tTdraws = 0
        tTgoal_scored = goalTwo
        tTgoal_conceded = goalOne
        tTgoal_difference = goalTwo - goalOne
        tOpoints = 0
        tOwins = 0
        tOdefeats = 1
        tOdraws = 0
        tOgoal_scored = goalOne
        tOgoal_conceded = goalTwo
        tOgoal_difference = goalOne - goalTwo
      }
      if (goalOne === goalTwo) {  //Draws
        winner = 'EMPATE'
        if (goalPenaltyOne > goalPenaltyTwo) {
          winner = game.team_one
        }
        if (goalPenaltyOne < goalPenaltyTwo) {
          winner = game.team_two
        }
        tOpoints = 1
        tOwins = 0
        tOdefeats = 0
        tOdraws = 1
        tOgoal_scored = goalOne
        tOgoal_conceded = goalTwo
        tOgoal_difference = 0
        tTpoints = 1
        tTwins = 0
        tTdefeats = 0
        tTdraws = 1
        tTgoal_scored = goalTwo
        tTgoal_conceded = goalOne
        tTgoal_difference = 0
      }
    }
    try {
      await supabase.from('games').update({
        goal_team_one: goalOne,
        goal_team_two: goalTwo,
        goal_penalty_one: goalPenaltyOne,
        goal_penalty_two: goalPenaltyTwo,
        winner: winner,
        status_game: true
      }).eq('id', game?.id)
      Alert.alert('Resultado salvo com sucesso!')
      listGames(tournamentId, stage)

      //verify status team one and two if exists ONY GROUP STAGE
      if (stage === 'GRUPOS') {
        const { data, error } = await supabase
          .from('statusteam')
          .select('*')
          .eq('tournament_id', tournamentId)
          .eq('team_name', teamOne)
        if (data) {
          if (data.length > 0) {
            tODBpoints = data[0].points
            tODBwins = data[0].wins
            tODBdefeats = data[0].defeats
            tODBdraws = data[0].draws
            tODBgoal_scored = data[0].goal_scored
            tODBgoal_conceded = data[0].goal_conceded
            tODBgoal_difference = data[0].goal_difference
            //upate database
            await supabase
              .from('statusteam')
              .update({
                points: tOpoints + tODBpoints,
                wins: tOwins + tODBwins,
                defeats: tOdefeats + tODBdefeats,
                draws: tOdraws + tODBdraws,
                goal_scored: tOgoal_scored + tODBgoal_scored,
                goal_conceded: tOgoal_conceded + tODBgoal_conceded,
                goal_difference: tOgoal_difference + tODBgoal_difference,
                group_team: groupTeam
              })
              .eq('id', data[0].id)
          } else { //save statusteam One
            await supabase.from('statusteam').insert({
              tournament_id: tournamentId,
              team_name: teamOne,
              points: tOpoints + tODBpoints,
              wins: tOwins + tODBwins,
              defeats: tOdefeats + tODBdefeats,
              draws: tOdraws + tODBdraws,
              goal_scored: tOgoal_scored + tODBgoal_scored,
              goal_conceded: tOgoal_conceded + tODBgoal_conceded,
              goal_difference: tOgoal_difference + tODBgoal_difference,
              group_team: groupTeam
            })
          }
        }
        if (error) { console.log('erro status one', error) }

        const dataTeamTwo = await supabase.from('statusteam').select('*')
          .eq('tournament_id', tournamentId)
          .eq('team_name', teamTwo)
        if (dataTeamTwo.data) {
          if (dataTeamTwo.data.length > 0) {
            tTDBpoints = dataTeamTwo.data[0].points
            tTDBwins = dataTeamTwo.data[0].wins
            tTDBdefeats = dataTeamTwo.data[0].defeats
            tTDBdraws = dataTeamTwo.data[0].draws
            tTDBgoal_scored = dataTeamTwo.data[0].goal_scored
            tTDBgoal_conceded = dataTeamTwo.data[0].goal_conceded
            tTDBgoal_difference = dataTeamTwo.data[0].goal_difference
            //upate database
            await supabase
              .from('statusteam')
              .update({
                points: tTpoints + tTDBpoints,
                wins: tTwins + tTDBwins,
                defeats: tTdefeats + tTDBdefeats,
                draws: tTdraws + tTDBdraws,
                goal_scored: tTgoal_scored + tTDBgoal_scored,
                goal_conceded: tTgoal_conceded + tTDBgoal_conceded,
                goal_difference: tTgoal_difference + tTDBgoal_difference,
                group_team: groupTeam
              })
              .eq('id', dataTeamTwo.data[0].id)
          } else {
            // save statusteam Two
            await supabase.from('statusteam').insert({
              tournament_id: tournamentId,
              team_name: teamTwo,
              points: tTpoints + tTDBpoints,
              wins: tTwins + tTDBwins,
              defeats: tTdefeats + tTDBdefeats,
              draws: tTdraws + tTDBdraws,
              goal_scored: tTgoal_scored + tTDBgoal_scored,
              goal_conceded: tTgoal_conceded + tTDBgoal_conceded,
              goal_difference: tTgoal_difference + tTDBgoal_difference,
              group_team: groupTeam
            })
          }
        }
        Alert.alert('Status de classificação atualizada com sucesso.')
        loadClassification()
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
      <Text>Torneios Luz</Text>
      <View style={container.form}>
        <SelectList
          placeholder="Torneio"
          boxStyles={container.input}
          setSelected={(val: string) => setTournamentId(val)}
          onSelect={() => listGames(Number(tournamentId), stage)}
          data={dataTournament}
          save="key"
        />

        <SelectList
          placeholder="Fase"
          boxStyles={container.input}
          setSelected={(val: string) => setStage(val)}
          onSelect={() => listGames(Number(tournamentId), stage)}
          data={[
            { key: 'GRUPOS', value: 'GRUPOS' },
            { key: 'SEMIFINAL', value: 'SEMIFINAL' },
            { key: '3 LUGAR', value: '3 LUGAR' },
            { key: 'FINAL', value: 'FINAL' },
          ]}
          save="key"
        />

        <Text>JOGOS CADASTRADOS:</Text>
        <ScrollView style={{ overflow: 'scroll', height: 450 }}>
          {games.map(item => (
            <TouchableOpacity
              key={item.id} onPress={() => playGame(item)}
              style={item.status_game ? container.gameContainerPlayDisabled : container.gameContainerPlay}
            >
              <Text>{count++}</Text>
              <Text style={container.textTeamOne}>{item.team_one}</Text>
              <Text>{item.goal_team_one}</Text>

              <Text>X</Text>

              <Text>{item.goal_team_two}</Text>
              <Text style={container.textTeamTwo}>{item.team_two}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalGameOpen}
        onRequestClose={() => {
          setIsModalGameOpen(!isModalGameOpen);
        }}>

        <View style={container.form}>
          <View style={container.gameContainerOnPlay}>

            <Text style={container.textGameX}>{game?.team_one}</Text>
            <View style={container.placar}>
              <TouchableOpacity onPress={() => GoalOne('-')} style={container.buttonPlacarMinus}>
                <Text>-</Text>
              </TouchableOpacity>
              <Text style={container.textGamePlay}>{goalOne}</Text>
              <TouchableOpacity onPress={() => GoalOne('+')} style={container.buttonPlacarPlus}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>

            {(isPenalty) &&
              <View style={container.placarPenalty}>
                <TouchableOpacity onPress={() => GoalPenaltyOne('-')} style={container.buttonPlacarPenaltyMinus}>
                  <Text>-</Text>
                </TouchableOpacity>
                <Text style={container.textGamePlay}>{goalPenaltyOne}</Text>
                <TouchableOpacity onPress={() => GoalPenaltyOne('+')} style={container.buttonPlacarPenaltyPlus}>
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            }
            
            <Text style={container.textGameX}>X</Text>
            
            {(isPenalty) &&
              <View style={container.placarPenalty}>
                <TouchableOpacity onPress={() => GoalPenaltyTwo('-')} style={container.buttonPlacarPenaltyMinus}>
                  <Text>-</Text>
                </TouchableOpacity>
                <Text style={container.textGamePlay}>{goalPenaltyTwo}</Text>
                <TouchableOpacity onPress={() => GoalPenaltyTwo('+')} style={container.buttonPlacarPenaltyPlus}>
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            }

            <View style={container.placar}>
              <TouchableOpacity onPress={() => GoalTwo('-')} style={container.buttonPlacarMinus}>
                <Text>-</Text>
              </TouchableOpacity>
              <Text style={container.textGamePlay}>{goalTwo}</Text>
              <TouchableOpacity onPress={() => GoalTwo('+')} style={container.buttonPlacarPlus}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={container.textGameX}>{game?.team_two}</Text>

            {(stage !== 'GRUPOS') && 
              <TouchableOpacity style={container.btnPenaltis} onPress={loadPenalties}>
                <Text style={container.textButtonPenaltis}>{textButtonPenalty}</Text>
              </TouchableOpacity>
            }

            <View style={container.containerMarkPlay}>
              <Countdown initialSeconds={Number(game?.duration)*60} />
            </View>

            <TouchableOpacity style={container.button} onPress={() => saveGame()}>
              <Text style={container.textButton}>Salvar Resultado</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={container.button} onPress={() => setIsModalGameOpen(false)}>
            <Text style={container.textButton}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      </View>
  )
}