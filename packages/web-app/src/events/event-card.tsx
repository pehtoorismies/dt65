import { Edit } from '@styled-icons/boxicons-regular/Edit'
import { format, getYear } from 'date-fns'
import React from 'react'
import { Box, Card, Flex, Text } from 'rebass/styled-components'
import styled, { css } from 'styled-components'
import { Event } from '../common/event'
import { UserInfo } from '../users/user-info'
import { Description } from './description'
import { HeadCountButton } from './head-count-button'
import { HeaderImage } from './header-image'
import { IconButton } from './icon-button'
import { InfoText } from './info-text'
import { ParticipantEvents } from './participant-events'
import { Pills } from './pills'
import { toFinnishDate } from './util'

interface Props {
  event: Event
  me?: UserInfo
  onCardClick?: () => void
  isExpanded?: boolean
  participantEvents: ParticipantEvents
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

const borderStyle = '0.1rem solid #e9e9e9'

export const EventCard = ({
  event,
  me,
  isExpanded,
  onCardClick,
  participantEvents,
}: Props) => {
  const {
    id,
    participants,
    address,
    description,
    date,
    eventType,
    race,
    title,
    subtitle,
    creator,
    exactTime,
  } = event

  const time = exactTime ? format(date, 'hh:mm') : undefined
  const isParticipant = participants.includes(me?.nickname)
  const toggleJoin = isParticipant
    ? participantEvents.removeParticipantFromEvent
    : participantEvents.addParticipantToEvent

  return (
    <Flex
      m={1}
      bg="white"
      width="100%"
      sx={{
        maxWidth: '40rem',
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
          isClickable={!isExpanded}
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
            <Text as="h2" variant="h2">
              {title}
            </Text>
            <Text as="h3" variant="h3">
              {subtitle}
            </Text>
            <Text variant="eventDate" mt="0.5rem">
              {toFinnishDate(date)}
            </Text>
          </Flex>
          <Flex alignItems="center" justifyContent="center">
            <HeadCountButton
              loading={false}
              count={participants.length}
              onClick={() =>
                toggleJoin({ yearId: getYear(date), monthDateId: id })
              }
              isParticipant={isParticipant}
            />
          </Flex>
        </Flex>

        <Box
          display={isExpanded ? 'block' : 'none'}
          px="1rem"
          pt="1rem"
          bg="darkWhite"
          sx={{
            borderLeft: borderStyle,
            borderRight: borderStyle,
          }}
        >
          <InfoText title="Sijainti" text={address} />
          <InfoText title="Aika" text={time} />
          <Text variant="infoTextTitle" pt={1} my={2}>
            Osallistujat:
          </Text>
          <Pills participants={participants} me={me} />
          <Description htmlText={description} />
        </Box>
      </Card>
    </Flex>
  )
}
