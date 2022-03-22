import React, { createContext, useContext, useEffect, useState } from 'react'
import Amplify, { Auth } from 'aws-amplify'
import AwsConfigAuth from '../aws-config/auth'

Amplify.configure({ Auth: AwsConfigAuth })

interface Result {
  success: boolean
  message: string
}

interface UseAuth {
  isLoading: boolean
  isAuthenticated: boolean
  username: string
  signIn: (username: string, password: string) => Promise<Result>
  signOut: () => void
}

const authContext = createContext({} as UseAuth)

export const useAuth = () => {
  return useContext(authContext)
}

const useProvideAuth = (): UseAuth => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((result) => {
        setUsername(result.username)
        setIsAuthenticated(true)
      })
      .catch((error) => {
        console.log(`error: ${JSON.stringify(error)}`)
        setUsername('')
        setIsAuthenticated(false)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const signIn = async (username: string, password: string) => {
    try {
      const result = await Auth.signIn(username, password)
      setUsername(result.username)
      setIsAuthenticated(true)
      return { success: true, message: '' }
    } catch (error) {
      return {
        success: false,
        message: 'ログインに失敗しました。',
      }
    }
  }

  const signOut = async () => {
    try {
      await Auth.signOut()
      setUsername('')
      setIsAuthenticated(false)
    } catch (error) {
      return {
        success: false,
        message: 'ログアウトに失敗しました。',
      }
    }
  }

  return {
    isLoading,
    isAuthenticated,
    username,
    signIn,
    signOut,
  }
}

export const ProvideAuth: React.FC = ({ children }) => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}
