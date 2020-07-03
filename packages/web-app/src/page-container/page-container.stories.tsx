import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { Footer } from './footer'
import { Toolbar } from './toolbar'
import { PageContainer } from './page-container'

export default {
  title: 'PageContainer',
  decorators: [withKnobs, withA11y],
}

export const footer = () => (
  <Footer
    onHomeClick={action('onHomeClick')}
    onProfileClick={action('onProfileClick')}
    onAddEventClick={action('onAddEventClick')}
    onUserListClick={action('onUserListClick')}
  />
)
export const toolbar = () => {
  return <Toolbar pageTitle="Page title" />
}

export const pageContainer = () => {
  return (
    <PageContainer>
      <div>here some shaissse</div>
    </PageContainer>
  )
}
