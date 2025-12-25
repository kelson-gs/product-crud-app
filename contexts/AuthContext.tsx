import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useContext, useEffect, useState } from "react"

interface AuthContextData {
  token: string | null
  signIn: (token: string) => Promise<void>
  logOut: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AsyncStorage.getItem("@token").then(storedToken => {
      setToken(storedToken)
      setLoading(false)
    })
  }, [])

  async function signIn(token: string) {
    await AsyncStorage.setItem("@token", token)
    setToken(token)
  }

  async function logOut() {
    await AsyncStorage.removeItem("@token")
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, signIn, logOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
