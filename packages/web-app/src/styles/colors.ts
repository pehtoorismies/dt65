import Color from 'color'

const redColor = Color('#FF5471')
const pinkColor = Color('#FF80EA')
const blueColor = Color('#07c')

const black = '#444'

export const colors = {
  blue: blueColor.hex(),
  lightBlue: blueColor.lighten(0.4).hex(),
  red: redColor.hex(),
  lightRed: redColor.lighten(0.4).hex(),
  lightgray: '#9a9a9a',
  lightergray: '#E6E6E6',
  lightestgray: '#e9e9e9',
  darkGray: '#1f1f1f',
  darkWhite: '#f4f4f5',
  black,
  heading: black,
  standardBlack: '#000',
  lightBlack: '#404035',
  pink: pinkColor.hex(),
  lightPink: pinkColor.lighten(0.2).hex(),
  darkPink: pinkColor.darken(0.1).hex(),
  white: '#fff',
  transparentBlack: 'rgba(0,0,0,0.6)',
  moreTransparentBlack: 'rgba(0,0,0,0.7)',
  faintBg: 'rgba(0,0,0,0.2)',
  pillsBg: '#fbe7f8',
}
