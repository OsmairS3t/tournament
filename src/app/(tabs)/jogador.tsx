import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView
} from "react-native";
import { container } from "../../../styles/global";
import { SelectList } from 'react-native-dropdown-select-list'
import { useState } from "react";

export default function Time() {
  const [players, setPlayers] = useState('')
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [numberPosition, setNumberPosition] = useState('')
  const dataPlayres = [
    {key: "Jose", value: "Jose"},
    {key: "Pedro", value: "Pedro"},
    {key: "Samuel", value: "Samuel"},
  ]

  function handleSelect() {
    console.log('Selecionou')
  }

  function handleSubmit() {
    const data = {
      name: name,
      age: age,
      numberPosition: numberPosition
    }
    console.log(data)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={container.content}>
        <Text style={container.title}>Jogador</Text>

        <View style={container.form}>
          <SelectList 
            placeholder="Jogadores"
            boxStyles={container.input}
            setSelected={(val: string) => setPlayers(val)} 
            data={dataPlayres} 
            onSelect={handleSelect}
            save="value"
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
            placeholder="Idade"
            value={age}
            onChangeText={(text:string) => setAge(text)}
          />
          <TextInput 
            style={container.input}
            placeholder="Número"
            value={numberPosition}
            onChangeText={(text:string) => setNumberPosition(text)}
          />
          <TouchableOpacity style={container.button} onPress={handleSubmit}>
            <Text style={container.textButton}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
