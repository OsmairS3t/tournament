import { useEffect, useState } from "react";
import { 
  Alert,
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView
} from "react-native";
import { container } from "../../../styles/global";
import { SelectList } from 'react-native-dropdown-select-list'
import { supabase } from "../../lib/supabase";
import { IPlayer, ISelect } from "../../utils/interface";

export default function Time() {
  const [player, setPlayer] = useState<IPlayer[]>([])
  const [dataTeam, setDataTeam] = useState<ISelect[]>([])
  const [dataPlayer, setDataPlayer] = useState<ISelect[]>([])
  const [playerName, setPlayerName] = useState('')
  const [team, setTeam] = useState('')
  const [idPlayer, setIdPlayer] = useState(0)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [numberPosition, setNumberPosition] = useState('')

  function resetForm() {
    setPlayerName('')
    setTeam('')
    setIdPlayer(0)
    setName('')
    setAge('')
    setNumberPosition('')
  }

  async function handleSelectTeam() {
    try {
      const { data } = await supabase.from('players').select('*').eq('team_id', team)
      if (data) {
        setPlayer(data)
        const temp:ISelect[] = data.map(item => {
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
    if (player) {
      const tempObj = player.find(item => item.id === Number(playerName))
      if(tempObj) {
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

  useEffect(() => {
    getTeams()
  },[])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={container.content}>
        <Text style={container.title}>Jogador</Text>

        <View style={container.form}>
          <SelectList 
            placeholder="Time"
            boxStyles={container.input}
            setSelected={(val: string) => setTeam(val)} 
            data={dataTeam} 
            onSelect={handleSelectTeam}
            save="key"
          />
          <SelectList 
            placeholder="Jogadores"
            boxStyles={container.input}
            setSelected={(val: string) => setPlayerName(val)} 
            data={dataPlayer} 
            onSelect={handleSelectPlayer}
            save="key"
          />
          <Text style={container.text}>Dados do Jogador para alteração:</Text>
          <TextInput 
            style={container.input}
            placeholder="Nome"
            value={name}
            onChangeText={(text:string) => setName(text)}
          />
          <TextInput 
            style={container.input}
            keyboardType='numeric'
            placeholder="Idade"
            value={age}
            onChangeText={(text:string) => setAge(text)}
          />
          <TextInput 
            style={container.input}
            keyboardType='numeric'
            placeholder="Número"
            value={numberPosition}
            onChangeText={(text:string) => setNumberPosition(text)}
          />
          <View style={container.inputContainer}>
            <TouchableOpacity style={container.buttonContainer} onPress={handleSubmit}>
              <Text style={container.textButton}>Incluir Novo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={container.buttonContainer} onPress={handleUpdate}>
              <Text style={container.textButton}>Alterar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
