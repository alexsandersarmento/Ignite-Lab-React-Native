import React from 'react'
import { Button as ButtonNativeBase, IButtonProps, Heading } from 'native-base'

type TButtonProps = IButtonProps & {
  title: string
}

const Button = ({ title, ...rest }: TButtonProps) => {
  return (
    <ButtonNativeBase 
      bg='green.700'
      height={14}
      fontSize='sm'
      rounded='sm'
      _pressed={{
        backgroundColor: 'green.500',
      }}
      {...rest}
    >
      <Heading color='white' fontSize='sm'>{title}</Heading>
    </ButtonNativeBase>
  )
}

export default Button
