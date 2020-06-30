import React from 'react'
import { Flex, Text } from 'rebass/styled-components'
import styled from 'styled-components'
import defaultImage from './images/events-nordic-walking.jpg'

interface BoxProps {
  bgImage: string
}

const ImageBox = styled.div<BoxProps>`
  display: grid;
  background-size: cover;
  border-radius: 15px 15px 0 0;
  font-weight: bold;
  height: 150px;
  width: 100%;
  background-image: url(${(props: BoxProps) => props.bgImage});
  grid-template-rows: 30px auto 20px;
  justify-items: center;
  align-items: center;
  grid-template-areas:
    'header'
    'title'
    'creator';
`

interface Props {
  title: string
  creator: string
  imageSrc?: string
  onClick: () => void
}

export const HeaderImage = ({ title, creator, onClick }: Props) => {
  return (
    <ImageBox bgImage={defaultImage} onClick={onClick}>
      <Flex
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        height={30}
        pr={2}
        sx={{
          gridArea: 'header',
          borderRadius: '15px 15px 0 0',
          backgroundImage:
            'linear-gradient(0deg, rgba(0,0,0,0.0), rgba(0,0,0,0.5))',
        }}
      >
        <Flex ml={2}>TODO BUTTON</Flex>
      </Flex>

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
        <Text>RACE TODO</Text>
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
