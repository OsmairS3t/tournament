import { SafeAreaView, View } from "react-native"
import { Slot } from "expo-router"
import Header from "../components/header"

export default function RootLayout() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />
      <Slot />
    </SafeAreaView>
  )
}