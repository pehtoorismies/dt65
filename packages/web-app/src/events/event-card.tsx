import React from 'react'
import { Card, Flex } from 'rebass/styled-components'
import { Event } from '../common/event'
// import styled, { keyframes } from 'styled-components'
import { HeaderImage } from './header-image'

interface Props {
  event: Event
}

const borderStyle = '1px solid #e9e9e9'

export const EventCard = ({ event }: Props) => {
  const { eventType, race, title, creator } = event

  return (
    <Flex
      m={1}
      bg="white"
      width="100%"
      sx={{
        maxWidth: 400,
        borderBottom: borderStyle,
        position: 'relative',
      }}
    >
      <Card width="100%" mx="auto" variant="shadow">
        <HeaderImage
          isRace={race}
          title={title}
          creator={creator}
          eventType={eventType}
          onClick={() => console.log('click')}
        />
      </Card>
    </Flex>
  )
}
