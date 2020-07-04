import faker from 'faker'
import { times } from 'ramda'
import { v4 as uuidv4 } from 'uuid'
import { Event, EventType } from '../common/event'

export const createRandomParticipant = () => {
  return faker.internet.userName()
  // return {
  //   id: uuidv4().toString(),
  //   nickname: faker.internet.userName(),
  // }
}

export const createRandomParticipants = times(createRandomParticipant)

export const createRandomEvent = (): Event => {
  const rand = Math.floor(Math.random() * Object.keys(EventType).length)

  return {
    id: uuidv4().toString(),
    description: faker.lorem.sentences(),
    title: faker.commerce.product(),
    subtitle: faker.commerce.product(),
    date: faker.date.future(),
    createdAt: faker.date.past(),
    race: faker.random.boolean(),
    eventType: EventType[Object.keys(EventType)[rand]],
    participants: createRandomParticipants(10),
    creator: faker.internet.userName(),
  }
}

export const createRandomUser = () => {
  return {
    sub: uuidv4().toString(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    nickname: faker.internet.userName(),
    email: faker.internet.email(),
  }
}

export const createRandomUsers = times(createRandomUser)
export const createRandomEvents = times(createRandomEvent)
