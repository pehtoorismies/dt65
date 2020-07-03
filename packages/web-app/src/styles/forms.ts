const primaryForm = {
  bg: 'white',
  border: '1px solid lightgray',
  borderRadius: '0.4rem',
  boxSizing: 'border-box',
  caretColor: 'lightgray',
  fontSize: '1.6rem',
  outline: 'none',
  padding: '1.8rem 0.8rem',
  width: '100%',

  '&::placeholder': {
    color: 'lightgray',
    fontWeight: 'bold',
  },
}
const primaryFormError = {
  ...primaryForm,
  border: '1px solid red',
}

const eventForm = {
  bg: 'transparent',
  border: 0,
  borderBottom: '1px solid gray',
  boxSizing: 'border-box',
  caretColor: 'pink',
  fontSize: '24px',
  outline: 'none',
  padding: '2px 2px',
  width: '100%',

  '&::placeholder': {
    color: 'lightgray',
    fontWeight: 'bold',
  },
}

const eventFormError = {
  ...eventForm,
  borderBottom: '1px solid red',
}

export const forms = {
  primary: primaryForm,
  'primary-error': primaryFormError,
  event: eventForm,
  'event-error': eventFormError,
}
