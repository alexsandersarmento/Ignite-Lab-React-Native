import React from 'react'
import { IconButton, useTheme } from 'native-base'
import { CaretLeft } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'

const Header = () => {
  const { colors } = useTheme()

  const navigation = useNavigation()

  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
      <IconButton
        icon={<CaretLeft color={colors.gray[200]} size={24}/>}
        onPress={handleGoBack}
      />
  )
}

export default Header
