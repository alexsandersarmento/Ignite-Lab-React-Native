import React, { useState, useEffect } from 'react'
import { HStack, VStack, Text, useTheme, Heading, FlatList, Center } from 'native-base'
import { ChatTeardropText } from 'phosphor-react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import firestore from '@react-native-firebase/firestore'

import { Filter, Order, TOrderProps, Button, Loading } from '../components'
import { TAppNavigationParams } from '../@types/navigation'
import { dateFormat } from '../utils'

const Home = ({ navigation } : NativeStackScreenProps<TAppNavigationParams, 'Home'>) => {
  const { colors } = useTheme()

  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open')
  const [orders, setOrders] = useState<TOrderProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const handleNewOrder = () => {
    navigation.navigate('Register')
  }

  const handleOpenDetails = (orderId: string) => {
    navigation.navigate('Details', { orderId })
  }

  useEffect(() => {
    setIsLoading(true)

    const subscriber = firestore()
      .collection('orders')
      .where('status', '==', statusSelected)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const { patrimony, description, status, created_at } = doc.data()

          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: dateFormat(created_at),
          }
        })

        setOrders(data)
        setIsLoading(false)
      })

    return subscriber
  }, [statusSelected])

  return (
    <VStack flex={1} paddingBottom={6} px={6} bg='gray.700'>
      <HStack 
        w='full'
        mt={8}
        mb={4}
        justifyContent='space-between'
        alignItems='center'
      >
        <Heading color='gray.100'>
          Solicitações
        </Heading>
        <Text color='gray.200'>
          {orders.length}
        </Text>
      </HStack>
      <HStack space={3} mb={8}>
        <Filter 
          type='open' 
          title='em andamento' 
          onPress={() => setStatusSelected('open')}
          isActive={statusSelected === 'open'}
        />
        <Filter 
          type='closed' 
          title='finalizados' 
          onPress={() => setStatusSelected('closed')}
          isActive={statusSelected === 'closed'}
        />
      </HStack>
     {isLoading ? <Loading /> : (
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)}/>}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <Center>
            <ChatTeardropText color={colors.gray[300]} size={40} />
            <Text color='gray.300' fontSize='xl' mt={6} textAlign='center'>
              Você ainda não possui {'\n'}
              solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
            </Text>
          </Center>
        )}
      />
     )}
      <Button
        marginTop={10}
        onPress={handleNewOrder} 
        title='Nova solicitação'
      />
    </VStack>
  )
}

export default Home
