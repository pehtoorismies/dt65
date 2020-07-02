import React from 'react'
import { UserList } from '../users/user-list'
import { getStore } from '../services/dynamo-util'
import { UserInfo } from '../users/user-info'

interface Props {
  users: UserInfo[]
}

const Users = ({ users }: Props) => {
  return <UserList users={users} />
}

export async function getServerSideProps() {
  const store = await getStore()
  const users = await store.getUsers()

  return {
    props: {
      users,
    },
  }
}

export default Users
