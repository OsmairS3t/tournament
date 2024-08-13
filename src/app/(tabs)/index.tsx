import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { container } from "../../../styles/global";
import { generateMatches, intercalateMatches } from "../../functions/createTournament";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";

type Team = string;
type Match = [Team, Team];
type TGroup = [string, string]

export default function Home() {
  const [groups, setGroups] = useState<TGroup[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  
  const groupA: Team[] = ['Equipe A1', 'Equipe A2', 'Equipe A3', 'Equipe A4'];
  const groupB: Team[] = ['Equipe B1', 'Equipe B2', 'Equipe B3', 'Equipe B4'];
  const matchesGroupA = generateMatches(groupA);
  const matchesGroupB = generateMatches(groupB);
  const tournamentMatches = intercalateMatches(matchesGroupA, matchesGroupB);

  async function getGroups() {
    try {
      const { data, error } = await supabase.rpc('get_distinct_names')
      if (data) {
        setGroups(data)
      } else {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function getTeams(group: string) {
    try {
      const { data, error } = await supabase
        .from('groups')
        .select(`
          name, teams(name)
        `)
        .eq('name', group)
      if (data) {
        console.log(data)
      } else {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // tournamentMatches.forEach(match => {
  //     console.log(`${match[0]} vs ${match[1]}`);
  // });

  useEffect(() => {
    getGroups()
    // getTeams('Grupo A')
  },[])

  return (
    <View style={container.content}>
      <Text>Home</Text>
      
    </View>
  )
}