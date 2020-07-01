import React from 'react'
import { Box, Card, Flex, Text } from 'rebass/styled-components'
import { Event } from '../common/event'
// import styled, { keyframes } from 'styled-components'
import { HeaderImage } from './header-image'
import { HeadCountButton } from './head-count-button'

interface Props {
  event: Event
}

const borderStyle = '1px solid #e9e9e9'

const Info = ({ title, text }: { title: string; text?: string }) => {
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

export const EventCard = ({ event }: Props) => {
  const {
    participants,
    address,
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
          onClick={() => console.log('click')}
        />
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
            <Text mt={1} fontSize={16}>
              1.2.2021 (la)
            </Text>
          </Flex>
          <Flex alignItems="center" justifyContent="center">
            <HeadCountButton
              loading={false}
              count={participants.length}
              onClick={() => console.log('Join')}
              isParticipant={true}
            />
          </Flex>
        </Flex>
        <Box
          px="1rem"
          pt="1rem"
          bg="darkWhite"
          sx={{
            borderLeft: borderStyle,
            borderRight: borderStyle,
          }}
        >
          <Info title="Päivämäärä" text={address} />
          <Info title="Aika" text={address} />
        </Box>
      </Card>
    </Flex>
  )
}
