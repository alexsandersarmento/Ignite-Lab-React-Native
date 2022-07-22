
import React from 'react'
import { Input as NativeBaseInput, IInputProps } from 'native-base'

const Input = ({ ...rest } : IInputProps) => {
  return (
    <NativeBaseInput 
      bg='gray.700'
      height={14}
      size='md'
      borderWidth={0}
      fontSize='md'
      fontFamily='body'
      color='white'
      placeholderTextColor='gray.300'
      _focus={{
        borderWidth: 1,
        borderColor: 'green.300',
        backgroundColor: 'gray.700',
      }}
      {...rest}
    />
  )
}

export default Input
