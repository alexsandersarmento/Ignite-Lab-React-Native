import React, { useState } from 'react'
import { VStack } from 'native-base'
import { Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { TAppNavigationParams } from '../@types/navigation'
import { Input, Button } from '../components'

const Register = ({ navigation } : NativeStackScreenProps<TAppNavigationParams, 'Register'>)  => {
  const [isLoading, setIsLoading] = useState(false)
  const [patrimony, setPatrimony] = useState('')
  const [description, setDescription] = useState('')

  const handleNewOrder = () => {
    if (!patrimony || !description) {
      return Alert.alert('Erro', 'Informe o patrimônio e a descrição.')
    }

    setIsLoading(true)
      
    firestore()
      .collection('orders')
      .add({
        patrimony,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setIsLoading(false)
        setPatrimony('')
        setDescription('')
        Alert.alert('Sucesso', 'Solicitação criada com sucesso.')
        navigation.navigate('Home')
      })
      .catch(() => {
        setIsLoading(false)
        return Alert.alert('Erro', 'Não foi possível criar a solicitação.')
      })
  }

  return (
    <VStack flex={1} p={6} bg='gray.600'>
      <Input 
        placeholder="Patrimônio"
        mt={4}
        onChangeText={setPatrimony}
      />
      <Input 
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription}
      />
      <Button 
        title='Cadastrar' 
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrder}
      />
    </VStack>
  )
}

export default Register
