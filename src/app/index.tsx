import { View, Text, TouchableOpacity } from "react-native"
import { router } from "expo-router"
import { FontAwesome } from '@expo/vector-icons'
import { home } from '../../styles/global'

export default function Home() {
  function handleGoAhead(page: string) {
    router.navigate(page)
  }

  return (
    <View style={home.container}>
      <View style={home.content}>
        <TouchableOpacity onPress={() => handleGoAhead('torneio')} style={home.block}>
          <FontAwesome name="soccer-ball-o" size={32} />
          <Text>TORNEIOS</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleGoAhead('grupo')} style={home.block}>
          <FontAwesome name="group" size={32} />
          <Text>GRUPOS</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleGoAhead('time')} style={home.block}>
          <FontAwesome name="object-group" size={32} />
          <Text>EQUIPES</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleGoAhead('jogador')} style={home.block}>
          <FontAwesome name="user" size={32} />
          <Text>JOGADORES</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleGoAhead('jogo')} style={home.block}>
          <FontAwesome name="gamepad" size={32} />
          <Text>JOGOS</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleGoAhead('classificacao')} style={home.block}>
          <FontAwesome name="reorder" size={32} />
          <Text>CLASSIFICAÇÃO</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleGoAhead('campeonato')} style={home.blockFull}>
          <FontAwesome name="trophy" size={32} />
          <Text>CAMPEONATO</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}