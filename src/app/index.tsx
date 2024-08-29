import { View, Text, TouchableOpacity, SafeAreaView } from "react-native"
import { router } from "expo-router"
import { FontAwesome } from '@expo/vector-icons'
import { home } from '../../styles/global'

export default function Home() {
  function handleGoAhead(page: string) {
    router.navigate(page)
  }

  return (
    <View style={home.content}>
      <TouchableOpacity onPress={() => handleGoAhead('torneio')} style={home.block}>
        <FontAwesome name="soccer-ball-o" size={32} color="#79199B" />
        <Text style={home.textBlock}>TORNEIOS</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleGoAhead('grupo')} style={home.block}>
        <FontAwesome name="group" size={32} color="#79199B" />
        <Text style={home.textBlock}>GRUPOS</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleGoAhead('time')} style={home.block}>
        <FontAwesome name="object-group" size={32} color="#79199B" />
        <Text style={home.textBlock}>TIMES</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleGoAhead('jogador')} style={home.block}>
        <FontAwesome name="user" size={32} color="#79199B" />
        <Text style={home.textBlock}>JOGADORES</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleGoAhead('jogo')} style={home.block}>
        <FontAwesome name="gamepad" size={32} color="#79199B" />
        <Text style={home.textBlock}>JOGOS</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleGoAhead('classificacao')} style={home.block}>
        <FontAwesome name="reorder" size={32} color="#79199B" />
        <Text style={home.textBlock}>CLASSIFICAR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleGoAhead('campeonato')} style={home.blockFull}>
        <FontAwesome name="trophy" size={32} color="#79199B" />
        <Text style={home.textBlock}>CAMPEONATO</Text>
      </TouchableOpacity>
    </View>
  )
}