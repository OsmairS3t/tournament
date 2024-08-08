import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { container } from "../../../styles/global";
import { generateMatches, intercalateMatches } from "../../functions/createTournament";

type Team = string;
type Match = [Team, Team];

export default function Home() {
  const groupA: Team[] = ['Equipe A1', 'Equipe A2', 'Equipe A3', 'Equipe A4'];
  const groupB: Team[] = ['Equipe B1', 'Equipe B2', 'Equipe B3', 'Equipe B4'];
  const matchesGroupA = generateMatches(groupA);
  const matchesGroupB = generateMatches(groupB);
  const tournamentMatches = intercalateMatches(matchesGroupA, matchesGroupB);

  // tournamentMatches.forEach(match => {
  //     console.log(`${match[0]} vs ${match[1]}`);
  // });

  return (
    <View style={container.content}>
      <Text>Home</Text>
      <TouchableOpacity style={container.button}>
        <Text style={container.textButton}>Criar Jogos</Text>
      </TouchableOpacity>
    </View>
  )
}