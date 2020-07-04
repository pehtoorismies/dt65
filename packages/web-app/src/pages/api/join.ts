import { NextApiRequest, NextApiResponse } from 'next'
import { getStore } from '../../services/dynamo-util'

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, result => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.method)
  if (req.method !== 'POST') {
    return res.status(405).end()
  }
  const { yearId, monthDayId, nickname } = req.body
  if (!yearId || !monthDayId || !nickname) {
    return res.status(400).end()
  }
  // Run the middleware
  // await runMiddleware(req, res)
  const store = await getStore()
  try {
    await store.addParticipant({ yearId: Number(yearId), monthDayId }, nickname)
    res.json({ message: 'Success' })
  } catch (error) {
    console.error(error)
    return res.status(500).end()
  }
}

export default handler
