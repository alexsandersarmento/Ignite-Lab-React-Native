import React from 'react'
import { HStack, IconButton, useTheme, StyledProps, Heading } from 'native-base'
import { CaretLeft } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'

type THeaderProps = StyledProps & {
  title: string
}

const Header = ({ title } : THeaderProps) => {
  const { colors } = useTheme()

  const navigation = useNavigation()

  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <HStack
      w='full'
      justifyContent='space-between'
      alignItems='center'
      bg='gray.600'
      pb={6}
      pt={12}
    >
      <IconButton
        icon={<CaretLeft color={colors.gray[200]} size={24}/>}
        onPress={handleGoBack}
      />
      <Heading 
        color='gray.100' 
        textAlign='center' 
        fontSize='lg'
        flex={1}
        ml={-6}
      >
        {title}
      </Heading>
    </HStack>
  )
}

export default Header
