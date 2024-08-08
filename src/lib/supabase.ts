// import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

export const supabase = createClient("https://qgimjuekzkhtaejfojza.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnaW1qdWVremtodGFlamZvanphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMxMjQ3MDAsImV4cCI6MjAzODcwMDcwMH0.FUSgM6rbyRQMBVdqaD57nrvz6SOha1GfluHDEMpVWTU")

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  // auth: {
  //   storage: AsyncStorage,
  //   autoRefreshToken: true,
  //   persistSession: true,
  //   detectSessionInUrl: false,
  // },
// })