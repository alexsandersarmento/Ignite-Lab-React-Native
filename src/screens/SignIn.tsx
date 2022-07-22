import React, { useState } from 'react'
import { Envelope, Key, Eye, EyeSlash } from 'phosphor-react-native'
import { VStack, Heading, Icon, Pressable, useTheme } from 'native-base'
import auth from '@react-native-firebase/auth'
import { Alert } from 'react-native'

import Logo from '../assets/logo_primary.svg'
import { Input, Button } from '../components'

const SignIn = () => {
  const { colors } = useTheme()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = () => {
    if (!email || !password) {
      return Alert.alert('Erro', 'Informe o email e a senha')
    }

    setIsLoading(true)

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        setIsLoading(false)

        if (error.code === 'auth/invalid-email') {
          return Alert.alert('Erro', 'Email inválido')
        }

        if (error.code === 'auth/wrong-password') {
          return Alert.alert('Erro', 'Email ou senha inválida.')
        }
          
        if (error.code === 'auth/user-not-found') {
          return Alert.alert('Erro', 'Email ou senha inválida.')
        }

        return Alert.alert('Erro', 'Ocorreu um erro ao fazer login.')
      })
  }

  return (
    <VStack
      flex={1}
      alignItems='center'
      bg='gray.600'
      paddingX={8}
      paddingTop={24}
    >
      <Logo />
      <Heading
        color='gray.100'
        fontSize='xl'
        marginTop={20}
        marginBottom={6}
      >
        Acesse sua conta
      </Heading>
      <Input 
        placeholder='E-mail' 
        marginBottom={4}
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]}/>} marginLeft={4}/>}
        value={email}
        onChangeText={setEmail}
      />
      <Input 
        placeholder='Senha'
        InputLeftElement={<Icon as={<Key color={colors.gray[300]}/>} marginLeft={4}/>}
        InputRightElement={<Pressable onPress={() => setShowPassword(!showPassword)}><Icon as={showPassword ? <EyeSlash color={colors.green[500]}/> : <Eye color={colors.green[500]}/>} marginRight={4}/></Pressable>}
        secureTextEntry={!showPassword}
        mb={8}
        value={password}
        onChangeText={setPassword}
      />
      <Button 
        title='Entrar' 
        width='full' 
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </VStack>
  )
}

export default SignIn
