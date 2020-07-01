import { Medal } from '@styled-icons/boxicons-regular/Medal'
import { Edit } from '@styled-icons/boxicons-regular/Edit'
import React from 'react'
import { Flex, Text } from 'rebass/styled-components'
import styled from 'styled-components'
import { EventType } from '../common/event'
import { mapEventTypeToImage } from './map-event-type-to-image'

interface BoxProps {
  bgImage: string
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
`

const RaceLogo = styled(Medal)`
  color: white;
  width: 3rem;
  padding: 0.4rem;
`

const EditButton = styled(Edit)`
  color: white;
  height: 3rem;
  &:hover {
    cursor: pointer;
  }
`

interface Props {
  isRace: boolean
  title: string
  creator: string
  eventType: EventType
  onClick: () => void
}

export const HeaderImage = ({
  eventType,
  isRace,
  title,
  creator,
  onClick,
}: Props) => {
  return (
    <ImageBox bgImage={mapEventTypeToImage(eventType)} onClick={onClick}>
      <Flex
        p="0.4rem"
        justifyContent="center"
        alignItems="center"
        sx={{ position: 'absolute', left: '1rem', top: '1rem' }}
      >
        <EditButton />
      </Flex>

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
        <Text
          letterSpacing={4}
          color="white"
          fontSize={30}
          fontWeight={900}
          sx={{
            textShadow: '2px 2px 5px black',
          }}
        >
          {title}
        </Text>
        {isRace && <RaceLogo />}
      </Flex>
      <Text
        fontSize={11}
        fontFamily="monospace"
        p={1}
        color="white"
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
