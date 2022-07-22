import React, { useState, useEffect } from 'react'
import { VStack, Text, HStack, useTheme, ScrollView } from 'native-base'
import { useRoute } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import { CircleWavyCheck, Hourglass, DesktopTower, Clipboard } from 'phosphor-react-native'
import { Alert } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { TAppNavigationParams } from '../@types/navigation'
import { TOrderFirestoreDTO } from '../DTOs'
import { TOrderProps, Loading, CardDetails, Input, Button } from '../components'
import { dateFormat } from '../utils'

type TRouteParams = {
  orderId: string
}

type TOrderDetails = TOrderProps & {
  description: string
  solution: string
  closed: string
}

const Details = ({ navigation } : NativeStackScreenProps<TAppNavigationParams, 'Details'>) => {
  const route = useRoute()
  const { orderId } = route.params as TRouteParams
  const { colors } = useTheme()

  const [order, setOrder] = useState<TOrderDetails>({} as TOrderDetails)
  const [isLoading, setIsLoading] = useState(true)
  const [solution, setSolution] = useState('')

  const handleOrderClose = () => {
    if (!solution) {
      return Alert.alert('Por favor, informe a solução do problema.')
    }

    firestore()
      .collection<TOrderFirestoreDTO>('orders')
      .doc(orderId)
      .update({
        status: 'closed',
        solution,
        closed_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação encerrada com sucesso!')
        navigation.navigate('Home')
      })
      .catch(() => {
        Alert.alert('Erro', 'Erro ao encerrar a solicitação.')
      })
  }

  useEffect(() => {
    setIsLoading(true)

    firestore()
      .collection<TOrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then(doc => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { patrimony, description, status, created_at, closed_at, solution: orderSolution } = doc.data()
       
        const closed = closed_at ? dateFormat(closed_at) : null

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          when: dateFormat(created_at),
          closed,
          solution: orderSolution || '',
        })

        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <Loading />
  }
    
  return (
    <VStack flex={1} bg="gray.700">
      <HStack
        bg='gray.500'
        justifyContent='center'
        p={4}
      >
        {order.status === 'closed' ? <CircleWavyCheck size={22} color={colors.green[300]}/> : <Hourglass size={22} color={colors.secondary[700]}/>}
        <Text
          fontSize='sm'
          color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
          ml={2}
          textTransform='uppercase'
        >
          {order.status === 'closed' ? 'Finalizado' : 'Aberto'}
        </Text>
      </HStack>
      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails 
          title='equipamento'
          description={`Patrimônio: ${order.patrimony}`}
          icon={DesktopTower}
          footer={order.when}
        />
        <CardDetails 
          title='descrição do problema'
          description={order.description}
          icon={Clipboard}
        />
        <CardDetails 
          title='solução'
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Finalizado em: ${order.closed}`}
        >
          {order.status === 'open' && (
            <Input 
              placeholder='Descrição da solução'
              onChangeText={setSolution}
              textAlignVertical='top'
              multiline
              h={24}
            />
          )}
        </CardDetails>
      </ScrollView>
      {
        order.status === 'open' && (
          <Button title='Encerrar solicitação' m={5} onPress={handleOrderClose}/>
        )
      }
    </VStack>
  )
}

export default Details
