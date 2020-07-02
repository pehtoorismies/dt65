import React from 'react'
import { Flex, Text } from 'rebass/styled-components'

interface Props {
  leftColumnValue: string
  rightColumnValue: string
  hasWhiteBg: boolean
}

export const Row = ({
  leftColumnValue,
  rightColumnValue,
  hasWhiteBg,
}: Props) => {
  return (
    <Flex
      bg={hasWhiteBg ? 'white' : '#fbe5f7'}
      py={3}
      px={2}
      color="standardBlack"
      sx={{ borderBottom: '1px solid #eee' }}
    >
      <Text fontFamily="monospace" width={150}>
        {leftColumnValue}
      </Text>
      <Text
        textAlign="left"
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {rightColumnValue}
      </Text>
    </Flex>
  )
}
