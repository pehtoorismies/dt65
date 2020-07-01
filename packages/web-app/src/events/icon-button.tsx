import React, { PropsWithChildren } from 'react'
import { Flex } from 'rebass/styled-components'

interface IconButtonProps {
  right?: string | number
  left?: string | number
  onClick: (event: any) => void
}

export const IconButton = ({
  children,
  right,
  left,
  onClick,
}: PropsWithChildren<IconButtonProps>) => {
  return (
    <Flex
      onClick={onClick}
      as="button"
      sx={{
        border: 'none',
        position: 'absolute',
        top: '1rem',
        right: right,
        left: left,
      }}
      bg="transparent"
    >
      {children}
    </Flex>
  )
}
