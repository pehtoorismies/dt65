import React from 'react'
import { GetServerSidePropsContext } from 'next'

const HomePage = () => {
  return <div>Welcome to Next.js!</div>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // const store = Dynamo.getStore()

  return {
    props: {}, // will be passed to the page component as props
  }
}

export default HomePage
