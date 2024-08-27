import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from "react-native";
import { router } from "expo-router";
import { Feather } from '@expo/vector-icons'
import { global, form } from "../../styles/global";
import { SelectList } from 'react-native-dropdown-select-list'
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Torneio() {
  const [name, setName] = useState('')
  const [modality, setModality] = useState('')
  const [amountGroup, setAmountGroup] = useState('')
  const [amountTeam, setAmountTeam] = useState('')
  const [kind, setKind] = useState('')
  const dataModality = [
    { key: 'Futebol', value: 'Futebol' },
    { key: 'Volei', value: 'Volei' },
  ]
  const dataKind = [
    { key: 'Mata-Mata', value: 'Mata-Mata' },
    { key: 'Pontos Corridos', value: 'Pontos Corridos' },
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
      console.log('Create tournament error: ', error)
    }
    // console.log(data)
  }

  function handleBack() {
    router.back()
  }

  return (
    <View style={global.container}>
      <View style={global.headerPage}>
        <TouchableOpacity onPress={handleBack}>
          <Feather name='arrow-left' size={24} />
        </TouchableOpacity>
        <Text style={global.title}>Torneios</Text>
      </View>

      <View style={form.container}>
        <TextInput
          style={form.input}
          placeholder="Nome do torneio"
          value={name}
          onChangeText={(text: string) => setName(text)}
        />
        <SelectList
          placeholder="Modalidade"
          boxStyles={form.select}
          setSelected={(val: string) => setModality(val)}
          data={dataModality}
          save="value"
        />
        <TextInput
          keyboardType="numeric"
          style={form.input}
          placeholder="Qtd Grupos"
          value={amountGroup}
          onChangeText={(text: string) => setAmountGroup(text)}
        />
        <TextInput
          keyboardType="numeric"
          style={form.input}
          placeholder="Qtd Equipes"
          value={amountTeam}
          onChangeText={(text: string) => setAmountTeam(text)}
        />
        <SelectList
          placeholder="Tipo"
          boxStyles={form.select}
          setSelected={(val: string) => setKind(val)}
          data={dataKind}
          save="value"
        />
        <TouchableOpacity style={form.button} onPress={handleSubmit}>
          <Text style={form.textButton}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
