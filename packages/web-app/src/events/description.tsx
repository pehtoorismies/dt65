import React from 'react'
import parse, { domToReact } from 'html-react-parser'
import { Heading, Text } from 'rebass/styled-components'

interface Props {
  htmlText?: string
}

export const Description = ({ htmlText }: Props) => {
  return (
    <>
      <Text my={2} variant="infoTextTitle">
        Kuvaus:
      </Text>
      <Text py={2} ml={1} color={htmlText ? 'black' : 'lightgrey'}>
        {parse(htmlText || 'ei tarkempaa kuvausta', {
          replace: ({ name, children }): any => {
            if (!children) {
              return ''
            }

            if (name === 'em') {
              return (
                <Text as="span" sx={{ fontStyle: 'italic' }}>
                  {domToReact(children)}
                </Text>
              )
            }
            if (name === 'strong') {
              return (
                <Text as="span" fontWeight="bold">
                  {domToReact(children)}
                </Text>
              )
            }
            if (name === 'u') {
              return (
                <Text as="span" sx={{ fontStyle: 'underline' }}>
                  {domToReact(children)}
                </Text>
              )
            }
            if (name === 'h1') {
              return <Heading fontSize={4}>{domToReact(children)}</Heading>
            }
            if (name === 'ul') {
              return (
                <Text p={1} sx={{ listStyleType: 'circle' }}>
                  {domToReact(children)}
                </Text>
              )
            }
            if (name === 'ol') {
              return (
                <Text p={1} sx={{ listStyleType: 'lower-latin' }}>
                  {domToReact(children)}
                </Text>
              )
            }
          },
        })}
      </Text>
    </>
  )
}
