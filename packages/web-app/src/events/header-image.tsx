import { Medal } from '@styled-icons/boxicons-regular/Medal'
import React, { PropsWithChildren } from 'react'
import { Flex, Text } from 'rebass/styled-components'
import styled from 'styled-components'
import { EventType } from '../common/event'
import { mapEventTypeToImage } from './map-event-type-to-image'

interface BoxProps {
  bgImage: string
  isClickable?: boolean
}

const getImage = (bgImage: string) => `/images/${bgImage}`

const ImageBox = styled.div<BoxProps>`
  position: relative;
  display: grid;
  background-size: cover;
  border-radius: 1.5rem 1.5rem 0 0;
  font-weight: bold;
  height: 15rem;
  width: 100%;
  background-image: url(${(props: BoxProps) => getImage(props.bgImage)});
  grid-template-rows: 3rem auto 2rem;
  justify-items: center;
  align-items: center;
  grid-template-areas:
    'header'
    'title'
    'creator';
  cursor: ${props => (props.isClickable ? 'pointer' : 'default')};
`

const RaceLogo = styled(Medal)`
  color: white;
  width: 3rem;
  padding: 0.4rem;
`

interface Props {
  isRace: boolean
  title: string
  creator: string
  eventType: EventType
  onClick: () => void
  isClickable?: boolean
}

export const HeaderImage = ({
  eventType,
  isRace,
  title,
  creator,
  onClick,
  children,
  isClickable,
}: PropsWithChildren<Props>) => {
  return (
    <ImageBox
      bgImage={mapEventTypeToImage(eventType)}
      isClickable={isClickable}
      onClick={() => {
        if (isClickable) {
          onClick()
        }
      }}
    >
      {children}
      <Flex
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        height={30}
        pr={2}
        sx={{
          gridArea: 'header',
          borderRadius: '1.5rem 1.5rem 0 0',
          backgroundImage:
            'linear-gradient(0deg, rgba(0,0,0,0.0), rgba(0,0,0,0.5))',
        }}
      ></Flex>

      <Flex
        flexDirection="column"
        alignItems="center"
        sx={{ gridArea: 'title' }}
      >
        <Text as="h1" variant="eventCardHeader" sx={{ userSelect: 'none' }}>
          {title}
        </Text>
        {isRace && <RaceLogo />}
      </Flex>
      <Text
        variant="creator"
        width="100%"
        textAlign="right"
        sx={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.0), rgba(0,0,0,0.6))',
          gridArea: 'creator',
        }}
      >
        by {creator}
      </Text>
    </ImageBox>
  )
}
