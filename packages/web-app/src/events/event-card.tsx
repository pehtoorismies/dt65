import { CaretDownCircle } from '@styled-icons/boxicons-regular/CaretDownCircle'
import { Edit } from '@styled-icons/boxicons-regular/Edit'
import React from 'react'
import { Box, Card, Flex, Text } from 'rebass/styled-components'
import styled, { css } from 'styled-components'
import { Event } from '../common/event'
import { Participant } from '../common/participant'
import { Description } from './description'
import { HeadCountButton } from './head-count-button'
import { HeaderImage } from './header-image'
import { IconButton } from './icon-button'
import { Pills } from './pills'
import { toFinnishDate } from './util'

interface Props {
  event: Event
  me?: Participant
  onCardClick?: () => void
  isExpanded?: boolean
}

const iconCss = css`
  color: white;
  height: 3rem;
  &:hover {
    cursor: pointer;
  }
`

const EditIcon = styled(Edit)`
  ${iconCss}
`
const ToggleIcon = styled(CaretDownCircle)`
  ${iconCss}
`

const borderStyle = '1px solid #e9e9e9'

interface InfoProps {
  title: string
  text?: string
}

const Info = ({ title, text }: InfoProps) => {
  return (
    <Flex>
      <Text fontWeight="bold" color="lightBlack" width={60}>
        {title}
      </Text>
      <Text ml={1} color={text ? 'black' : 'lightgrey'}>
        {text || 'ei määritelty'}
      </Text>
    </Flex>
  )
}

export const EventCard = ({ event, me, isExpanded, onCardClick }: Props) => {
  const {
    participants,
    address,
    description,
    date,
    eventType,
    race,
    title,
    subtitle,
    creator,
  } = event

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
          onClick={onCardClick}
        >
          <IconButton
            onClick={() => {
              console.log('Edit')
            }}
            left="1rem"
          >
            <EditIcon />
          </IconButton>
        </HeaderImage>
        <Flex
          p={2}
          bg="darkWhite"
          justifyContent="space-between"
          sx={{
            border: borderStyle,
            borderTop: 0,
            borderBottom: 0,
          }}
        >
          <Flex justifyContent="space-around" flexDirection="column">
            <Text fontSize="2rem" fontWeight="bold">
              {title}
            </Text>
            <Text fontSize="1.6rem" fontWeight="bold">
              {subtitle}
            </Text>
            <Text mt="0.5rem" fontSize="1.6rem">
              {toFinnishDate(date)}
            </Text>
          </Flex>
          <Flex alignItems="center" justifyContent="center">
            <HeadCountButton
              loading={false}
              count={participants.length}
              onClick={() => console.log('Join')}
              isParticipant={
                participants.findIndex(({ id }) => me?.id === id) >= 0
              }
            />
          </Flex>
        </Flex>
        <Box></Box>
        <Box
          display={isExpanded ? 'display' : 'none'}
          px="1rem"
          pt="1rem"
          bg="darkWhite"
          sx={{
            borderLeft: borderStyle,
            borderRight: borderStyle,
          }}
        >
          <Info title="Sijainti" text={address} />
          <Info title="Aika" text={address} />
          <Pills participants={participants} me={me} />
          <Description htmlText={description} />
        </Box>
      </Card>
    </Flex>
  )
}
