import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { IconButton, useTheme } from 'native-base'
import { SignOut } from 'phosphor-react-native'
import auth from '@react-native-firebase/auth'
import { Alert } from 'react-native'

import { TAppNavigationParams } from '../@types/navigation'
import { HeaderLeft } from '../components'
import {
  Home,
  Register,
  Details,
} from '../screens'
import Logo from '../assets/logo_secondary.svg'

const { Navigator, Screen } = createNativeStackNavigator<TAppNavigationParams>()

const AppRoutes = () => {
  const { colors } = useTheme()

  const handleLogout = () => {
    auth()
      .signOut()
      .catch(() => {
        Alert.alert('Erro', 'Ocorreu um erro ao fazer logout.')
      })
  }

  return (
    <Navigator screenOptions={{
      headerStyle: {
        backgroundColor: colors.gray[700],
      },
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: colors.white,
      },
      headerLeft: () => <HeaderLeft />,
    }}>
      <Screen 
        name="Home" 
        component={Home}
        options={{
          headerLeft: () => <Logo />,
          headerTitle: () => null,
          headerRight: () => <IconButton
            icon={<SignOut size={26} color={colors.gray[300]}/>}
            onPress={handleLogout}
          />,
        }}
      />
      <Screen name="Register" component={Register} />
      <Screen name="Details" component={Details} />
    </Navigator>
  )
}

export default AppRoutes
