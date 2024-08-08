import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  Alert
} from "react-native";
import { container } from "../../../styles/global";
import { SelectList } from 'react-native-dropdown-select-list'
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Torneio() {
  const [name, setName] = useState('')
  const [modality, setModality] = useState('')
  const [amountGroup, setAmountGroup] = useState('')
  const [amountTeam, setAmountTeam] = useState('')
  const [kind, setKind] = useState('')
  const dataModality = [
    {key: 'Futebol', value: 'Futebol' },
    {key: 'Volei', value: 'Volei' },
  ]
  const dataKind = [
    {key: 'Mata-Mata', value: 'Mata-Mata' },
    {key: 'Pontos Corridos', value: 'Pontos Corridos' },
  ]

  async function handleSubmit() {
    try {
      const { error } = await supabase.from('tournaments').insert({
        name: name,
        modality: modality,
        amount_groups: amountGroup,
        amount_team: amountTeam,
        kind: kind
      })
      console.log(error)
      Alert.alert('Torneio incluido com sucesso!')
    } catch (error) {
      console.log('Create tournament error: ',error)
    }
    // console.log(data)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={container.content}>
        <Text style={container.title}>Torneios</Text>
        <View style={container.form}>
          <TextInput 
            style={container.input}
            placeholder="Nome do torneio"
            value={name}
            onChangeText={(text:string) => setName(text)}
          />
          <SelectList 
            placeholder="Modalidade"
            boxStyles={container.input}
            setSelected={(val: string) => setModality(val)} 
            data={dataModality} 
            save="value"
          />
          <TextInput 
            keyboardType="numeric"
            style={container.input}
            placeholder="Qtd Grupos"
            value={amountGroup}
            onChangeText={(text:string) => setAmountGroup(text)}
          />
          <TextInput 
            keyboardType="numeric"
            style={container.input}
            placeholder="Qtd Equipes"
            value={amountTeam}
            onChangeText={(text:string) => setAmountTeam(text)}
          />
          <SelectList 
            placeholder="Tipo"
            boxStyles={container.input}
            setSelected={(val: string) => setKind(val)} 
            data={dataKind} 
            save="value"
          />
          <TouchableOpacity style={container.button} onPress={handleSubmit}>
            <Text style={container.textButton}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
