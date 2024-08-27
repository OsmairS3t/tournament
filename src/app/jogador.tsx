import { useEffect, useState } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from "react-native";
import { router } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { supabase } from "../lib/supabase";
import { SelectList } from 'react-native-dropdown-select-list'
import { IPlayer, ISelect } from "../utils/interface";
import { form, global } from "../../styles/global";

export default function Time() {
  const [players, setPlayers] = useState<IPlayer[]>([])
  const [dataTeam, setDataTeam] = useState<ISelect[]>([])
  const [dataPlayer, setDataPlayer] = useState<ISelect[]>([])
  const [playerId, setPlayerId] = useState('')
  const [team, setTeam] = useState('')
  const [idPlayer, setIdPlayer] = useState(0)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [numberPosition, setNumberPosition] = useState('')

  function resetForm() {
    setPlayerId('')
    setTeam('')
    setIdPlayer(0)
    setName('')
    setAge('')
    setNumberPosition('')
  }

  async function handleSelectTeam(teamId: number) {
    try {
      const { data } = await supabase
        .from('players')
        .select('*')
        .eq('team_id', teamId)
      if (data) {
        setPlayers(data)
        const temp: ISelect[] = data.map(item => {
          return { key: item.id, value: item.name }
        })
        setDataPlayer(temp)
      }
    } catch (error) {
      console.log(error)
    }
    resetForm()
  }

  function handleSelectPlayer() {
    if (players) {
      const tempObj = players.find(item => item.id === Number(playerId))
      if (tempObj) {
        setIdPlayer(tempObj.id)
        setName(tempObj.name)
        setAge(String(tempObj.age ? tempObj.age : ''))
        setNumberPosition(tempObj.number_position)
      }
    }
  }

  async function handleSubmit() {
    try {
      await supabase.from('players').insert({
        team_id: team,
        name: name,
        age: age,
        number_position: numberPosition
      })
      Alert.alert('Jogador incluído com sucesso.')
      resetForm()
    } catch (error) {
      console.log(error)
    }
  }

  async function handleUpdate() {
    try {
      await supabase.from('players').update({
        team_id: team,
        name: name,
        age: age,
        number_position: numberPosition
      }).eq('id', idPlayer)
      Alert.alert('Dados do jogador atualizados com sucesso.')
      resetForm()
    } catch (error) {
      console.log(error)
    }
  }

  async function getTeams() {
    const { data } = await supabase.from('teams').select('*')
    if (data) {
      const temp = data.map(item => {
        return { key: item.id, value: item.name }
      })
      setDataTeam(temp)
    }
  }

  async function DeletePlayer(id: number, teamId: number) {
    Alert.alert(
      'Exclusao de Jogador',
      'Tem certeza que deseja excluir este jogador?',
      [
        {
          text: 'Sim',
          onPress: () => {
            deletePlayer(id, teamId)
          },
          style: 'default',
        },
        {
          text: 'Não',
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  }

  async function deletePlayer(id: number, teamId: number) {
    try {
      await supabase.from('players').delete().eq('id', id)
      alert('Jogador excluido com sucesso!')
      handleSelectTeam(Number(teamId))
    } catch (error) {
      console.log(error)
    }
  }

  function handleBack() {
    router.back()
  }

  useEffect(() => {
    getTeams()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={global.container}>
        <View style={global.headerPage}>
          <TouchableOpacity onPress={handleBack}>
            <Feather name='arrow-left' size={24} />
          </TouchableOpacity>
          <Text style={global.title}>Jogadores</Text>
        </View>

        <View style={form.container}>
          <SelectList
            placeholder="Time"
            boxStyles={form.input}
            setSelected={(val: string) => setTeam(val)}
            data={dataTeam}
            onSelect={() => handleSelectTeam(Number(team))}
            save="key"
          />
          <SelectList
            placeholder="Jogadores"
            boxStyles={form.input}
            setSelected={(val: string) => setPlayerId(val)}
            data={dataPlayer}
            onSelect={handleSelectPlayer}
            save="key"
          />
          <Text style={global.text}>Dados do Jogador para alteração:</Text>
          <TextInput
            style={form.input}
            placeholder="Nome"
            value={name}
            onChangeText={(text: string) => setName(text)}
          />
          <TextInput
            style={form.input}
            keyboardType='numeric'
            placeholder="Idade"
            value={age}
            onChangeText={(text: string) => setAge(text)}
          />
          <TextInput
            style={form.input}
            keyboardType='numeric'
            placeholder="Número"
            value={numberPosition}
            onChangeText={(text: string) => setNumberPosition(text)}
          />
          
          <View style={form.buttonPlayerContainer}>
            <TouchableOpacity style={form.buttonContainer} onPress={handleSubmit}>
              <Text style={form.textButton}>Incluir Novo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={form.buttonContainer} onPress={handleUpdate}>
              <Text style={form.textButton}>Alterar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {(players.length > 0) ?
          <ScrollView>
            <View style={form.tblMiniTAble}>
              <Text style={form.tblMiniTH}>Nª</Text>
              <Text style={form.tblMiniTHPrimary}>Nome</Text>
              <Text style={form.tblMiniTH}>Idade</Text>
              <Text style={form.tblMiniTH}></Text>
            </View>
            {players.map(item => (
              <View key={item.id} style={form.tblMiniRow}>
                <Text style={form.tblMiniTD}>{item.number_position}</Text>
                <Text style={form.tblMiniTDPrimary}>{item.name}</Text>
                <Text style={form.tblMiniTD}>{item.age}</Text>
                <Text style={form.tblMiniTD}>
                  <TouchableOpacity onPress={() => DeletePlayer(item.id, item.team_id)}>
                    <Feather name="trash-2" size={20} />
                  </TouchableOpacity>
                </Text>
              </View>
            ))}
          </ScrollView>
          :
          <Text>O Time ainda não tem jogadores cadastrados</Text>
        }
      </View>
    </SafeAreaView>
  )
}
