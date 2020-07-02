import { getStore } from '../../services/dynamo-util'

// export default async (req, res) => {
//   const dynamoStore = await init()
//   const result = await dynamoStore.createEvent({
//     id: uuidv4(),
//     title: 'test',
//     date: new Date(2020, 12, 12),
//     createdAt: new Date(),
//     race: false,
//     eventType: EventType.CYCLING,
//     creator: 'Metsis',
//     participants: [],
//   })

//   return res.end(JSON.stringify(result))
// }

export default async (req, res) => {
  const dynamoStore = await getStore()
  // return res.end(JSON.stringify({ helo: 'wotd' }))
  const result = await dynamoStore.getEvents(new Date())
  return res.end(JSON.stringify(result))
}
