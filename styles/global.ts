import { StyleSheet } from 'react-native'

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
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  label: {
    fontSize: 18,
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
    width: '100%',
  },
  input: {
    width: '100%',
    height: 40,
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
    height: 50,
    backgroundColor: '#121212',
    color: '#eaeaea',
    borderRadius: 8,
  },
  textButton: {
    fontSize: 20,
    fontWeight: '600',
    color: '#eaeaea'
  },
  buttonAddNew: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderRadius: 8,
    backgroundColor: '#064206',
    marginBottom: 10,
  },
  buttonRemove: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderRadius: 8,
    backgroundColor: '#420606',
    marginBottom: 10,
  },
  textButtonAddNew: {
    fontSize: 16,
    fontWeight: '400',
    color: '#eaeaea',
  },
  scrollView: {
    width: '100%',
    height: 200,
    overflow: 'scroll',
  },
  inputContainer: {
    marginBottom: 10,
  },
})