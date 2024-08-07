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

export default function Torneio() {
  const [modality, setModality] = useState('')
  const [amount, setAmount] = useState('')
  const [kind, setKind] = useState('')
  const dataModality = [
    {key: 'Futebol', value: 'Futebol' },
    {key: 'Volei', value: 'Volei', disabled: true },
  ]
  const dataKind = [
    {key: 'Mata-Mata', value: 'Mata-Mata', disabled: true},
    {key: 'Pontos Corridos', value: 'Pontos Corridos' },
  ]

  function handleSubmit() {
    const data = {
      modalidade: modality,
      quantidade: amount,
      tipo: kind
    }
    console.log(data)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={container.content}>
        <Text style={container.title}>Torneio</Text>
        <View style={container.form}>
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
            placeholder="Qtd Equipes"
            value={amount}
            onChangeText={(text:string) => setAmount(text)}
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
