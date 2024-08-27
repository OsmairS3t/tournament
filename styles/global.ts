import { StyleSheet } from 'react-native'

export const global = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
  },
  headerPage:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
    height: 40
  },
  title: {
    fontSize: 16,
    color: '#000000',
  },
  form: {
    gap: 10,
  },
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#eaeaea',
    width: '100%'
  },
  select: {
    padding: 10,
    height: 50,
    backgroundColor: '#eaeaea',
    width: '100%'
  },
  button: {},
  textButton: {},
})

export const header = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9e9e9',
    paddingTop: 20,
    gap: 20,
  },

  title: {
    color: '#000000',
  },
  text: {
    color: '#000000',
  },
  textApp: {
    width: 150,
    fontSize: 16,
    textAlign: 'center',
    color: '#000000',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#0e103d'
  },
  image: {
    width: 100,
    height: 100,
  },
})

export const home = StyleSheet.create({
  container: {
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    padding: 20,
  },
  block: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: 160,
    width: 160,
    borderWidth: 1,
    borderColor: '#a1a1a1',
    gap: 15,
  },
  blockFull: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: 160,
    width: '100%',
    borderWidth: 1,
    borderColor: '#a1a1a1',
    gap: 15,
  },
})

export const tournament = StyleSheet.create({
  form: {
    flex: 1,
    padding: 10,
  }
})

export const footer = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9e9e9',
    height: 50,
  },
  text: {
    color: '##000000',
  },
  image: {
    width: 70,
    height: 70,
    color: '##000000',
  },
})

export const player = StyleSheet.create({})

export const game = StyleSheet.create({})

export const team = StyleSheet.create({})

export const championship = StyleSheet.create({})

export const container = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  headerPage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
  },
  textHeaderPage: {
    paddingLeft: 10,
    paddingTop: 10,
    width: 290,
    height: 40,
    backgroundColor: '#121212',
    color: '#FFF',
  },
  iconClose: {
    color: 'white',
  
  },
  buttonHeaderPage: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: 'black'
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  label: {
    fontSize: 16,
    width:'70%',
    fontWeight: '400',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
    marginBottom: 4,
  },
  form: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    gap: 4,
    width: '100%',
  },
  select: {
    width: '100%',
    height: 45,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: '#ffffff',
  },
  input: {
    width: '100%',
    height: 50,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: '#ffffff',
  },
  inputPlayers: {
    width: '100%',
    height: 250,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: '#ffffff',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 40,
    backgroundColor: '#121212',
    color: '#eaeaea',
    borderRadius: 8,
  },
  textButton: {
    fontSize: 18,
    fontWeight: '600',
    color: '#eaeaea'
  },
  buttonAddNew: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 30,
    borderRadius: 4,
    backgroundColor: '#068406',
  },
  buttonRemove: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#d43302',
    marginBottom: 10,
  },
  textButtonAddNew: {
    fontSize: 14,
    fontWeight: '600',
    color: '#eaeaea',
  },
  scrollView: {
    width: '100%',
    height: 210,
    overflow: 'scroll',
  },
  buttonListContainer: {
    overflow: 'scroll',
    height: 450,
  },
  inputContainer: {
    width: '100%',
    height: 30,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  buttonPlayerContainer: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  groupHeader: {
    flexDirection: 'row', 
    width: '100%', 
    justifyContent: 'space-between',
  },
  selectMini: {
    width: '85%',
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: '#ffffff',
  },
  buttonIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: '#068406',
  },
  inputAddNew: {
    width: '70%',
    height: 40,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: '#ffffff',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
    height: 50,
    backgroundColor: '#121212',
    color: '#eaeaea',
    borderRadius: 8,
  },
  block: {
    width: '90%',
    flexDirection: 'column',
  },
  subBlock: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },
  gameContainer: {
    paddingTop: 6,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  textGameX: {
    fontWeight: '600',
    fontSize: 20,
  },
  gameContainerPlay: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: 8,
    marginBottom: 2,
  },
  gameContainerPlayDisabled: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'silver',
    paddingLeft: 8,
    marginBottom: 2,
  },
  textTeamOne: {
    width: 130,
    textAlign: 'center',
  },
  textTeamTwo: {
    width: 130,
    textAlign: 'center',
  },
  gameContainerOnPlay: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    padding: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonPlay: {
    backgroundColor: '#da0',
    padding: 4,
  },
  buttonPlayGame: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    backgroundColor: '#fae28c',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#997800',
    padding: 4,
  },
  textButtonPlayGame: {
    color: '#997800',
    fontWeight: '600',
    fontSize: 20,
  },
  placar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  btnPenaltis: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    padding: 10,
    marginTop: 10,
    backgroundColor: 'orange',
  },
  textButtonPenaltis: {
    color: 'black',
    fontWeight: '500',
    fontSize: 14
  },
  placarPenalty: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: 'orange'
  },
  buttonPlacarPlus: {
    backgroundColor: '#9ecbf7',
    padding: 4,
    width: 40,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonPlacarPenaltyPlus: {
    backgroundColor: '#ccc',
    padding: 4,
    width: 40,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonPlacarMinus: {
    backgroundColor: '#ed8c66',
    padding: 4,
    width: 40,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonPlacarPenaltyMinus: {
    backgroundColor: '#ccc',
    padding: 4,
    width: 40,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textGamePlay: {
    marginLeft: 20, 
    marginRight: 20, 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerMarkPlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  tblClassification: {
    width: '100%',
    height: 25,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#9c9b9a',
  },
  tblTTTDPrimary: {
    width: 100,
    fontWeight: '700',
  },
  tblTTTD: {
    width: 25,
    fontWeight: '700',
  },
  tblTDPrimary: {
    width: 100,
  },
  tblTD: {
    width: 25,
  },
  textTblGroup: {
    width: '100%',
    height: 30,
    padding: 2,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: '700',
    backgroundColor: '#ddd'
  },
  tblMiniTAble: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  tblMiniRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    height: 40,
  },
  tblMiniTHPrimary: {
    fontWeight: '700',
    width: 200,
  },
  tblMiniTH: {
    fontWeight: '700',
    width: 50,
  },
  tblMiniTDPrimary: {
    width: 200,
  },
  tblMiniTD: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 50,
  },
  penalty: {
    width: '100%',
    height: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    marginBottom: 10,
  },
  finalClassTitle: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#eaeaea',
    fontSize: 24,
    fontWeight: '700',
  },
  finalClassFirst: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 20,
    fontWeight: '600',
    color: '#bbdcfc',
    backgroundColor: '#121212',
    paddingLeft: 8,
    paddingTop: 2,
    paddingBottom: 2,
  },
  finalClassSecond: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 20,
    fontWeight: '600',
    color: '#fce6bb',
    backgroundColor: '#121212',
    paddingLeft: 8,
    paddingTop: 2,
    paddingBottom: 2,
  },
  finalClassThird: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 20,
    fontWeight: '600',
    color: '#dcbbfc',
    backgroundColor: '#121212',
    paddingLeft: 8,
    paddingTop: 2,
    paddingBottom: 2,
  },
})