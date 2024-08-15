import { View, Text, Modal, TouchableOpacity, ScrollView, Alert } from "react-native";
import { container } from "../../../styles/global";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { IGame, ISelect } from "../../utils/interface";

export default function Home() {
  const [tournamentId, setTournamentId] = useState('')
  const [tournamentName, setTournamentName] = useState('')
  const [dataTournament, setDataTournament] = useState<ISelect[]>([])
  const [games, setGames] = useState<IGame[]>([])
  const [game, setGame] = useState<IGame>()
  const [isModalGameOpen, setIsModalGameOpen] = useState(false)
  const [goalOne, setGoalOne] = useState(0)
  const [goalTwo, setGoalTwo] = useState(0)
  const [teamOne, setTeamOne] = useState('')
  const [teamTwo, setTeamTwo] = useState('')
  let count = 1

  async function getTournaments() {
    const { data } = await supabase.from('tournaments').select('*')
    if (data) {
      const temp:ISelect[] = data.map(item => {
        return { key: item.id, value: item.name }
      })
      setDataTournament(temp)
    }
  }

  async function listGames(id_tournament: number) {
    const dataTournament = await supabase.from('tournaments').select('*').eq('id', id_tournament)
    if (dataTournament.data) {
      setTournamentName(dataTournament.data[0].name)
    }
    const { data } = await supabase.from('games').select('*').order('id')
    if (data) {
      setGames(data)
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
  }

  async function saveGame() {
    let winner = ''
    let tournamentId = 0
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
      if (goalOne > goalTwo) {
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
      if (goalOne < goalTwo) {
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
      if (goalOne === goalTwo) {
        winner = 'EMPATE'
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
          winner: winner
        }).eq('id', game?.id)
      Alert.alert('Resultado salvo com sucesso!')
      listGames(tournamentId)

      //verify status teamone and two if exists
      const { data } = await supabase.from('statusteam').select('*')
        .eq('tournament_id',tournamentId).eq('team_name',teamOne)
      if (data) {
        tODBpoints = data[0].points
        tODBwins = data[0].wins
        tODBdefeats = data[0].defeats
        tODBdraws = data[0].draws
        tODBgoal_scored = data[0].goal_scored
        tODBgoal_conceded = data[0].goal_conceded
        tODBgoal_difference = data[0].goal_difference
      }
      const dataTeamTwo = await supabase.from('statusteam').select('*')
        .eq('tournament_id',tournamentId).eq('team_name',teamTwo)
      if (dataTeamTwo.data) {
        tTDBpoints = dataTeamTwo.data[0].points
        tTDBwins = dataTeamTwo.data[0].wins
        tTDBdefeats = dataTeamTwo.data[0].defeats
        tTDBdraws = dataTeamTwo.data[0].draws
        tTDBgoal_scored = dataTeamTwo.data[0].goal_scored
        tTDBgoal_conceded = dataTeamTwo.data[0].goal_conceded
        tTDBgoal_difference = dataTeamTwo.data[0].goal_difference
      }
      //save statusteam One
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
        })
      //save statusteam Two
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
        })
      Alert.alert('Status de classificação atualizada com sucesso.')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTournaments()
  },[])

  return (
    <View style={container.content}>
      <Text>Torneios Luz</Text>
      <View style={container.form}>
        <SelectList 
          placeholder="Torneio"
          boxStyles={container.input}
          setSelected={(val: string) => setTournamentId(val)} 
          onSelect={() => listGames(Number(tournamentId))}
          data={dataTournament} 
          save="key"
        />
        <Text>JOGOS CADASTRADOS:</Text>
        <ScrollView style={{overflow: 'scroll', height: 450}}>
          {games.map(item => (
            <TouchableOpacity 
              key={item.id} onPress={() => playGame(item)} 
              style={container.gameContainerPlay}
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
            <Text style={container.textGameX}>X</Text>
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
            
            <View style={container.containerMarkPlay}>
              <TouchableOpacity onPress={() => {}} style={container.buttonPlayGame}>
                <Text style={container.textButtonPlayGame}>Iniciar</Text>
              </TouchableOpacity>
              <Text style={container.textGamePlay}>00:00</Text>
              <TouchableOpacity onPress={() => {}} style={container.buttonPlayGame}>
                <Text style={container.textButtonPlayGame}>Encerrar</Text>
              </TouchableOpacity>
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