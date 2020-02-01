import { Event, InputEvent } from '../types';
import * as AWS from 'aws-sdk';
import { uuidv4 } from 'uuid';

export const typeDefs = `
  type Event {
    id: String!
    createdAt: DateTime! 
    title: String!
  }

  input EventData {
    date: String!
    description: String
    exactTime: Boolean = false
    race: Boolean
    subtitle: String
    title: String!
    type: String!
  }
  
  enum EventType {
    Cycling
    Karonkka
    Meeting
    NordicWalking
    Orienteering
    Other
    Running
    Skiing
    Spinning
    Swimming
    TrackRunning
    TrailRunning
    Triathlon
    Ultras
  }

  createEvent(addMe: Boolean = false, event: EventData!, notifySubscribers: Boolean = true): Event!
`;

export const resolvers = {
  Mutation: {
    createEvent: (
      _,
      {
        addMe,
        event,
        notifySubscribers,
      }: { addMe: boolean; event: InputEvent; notifySubscribers: boolean },
      { dynamoDB }: { dynamoDB: AWS.DynamoDB.DocumentClient }
    ) => {
      const dbParams = {
        TableName: 'events',
        Item: {
          id: uuidv4(),
          ...event,
        },
      };

      dynamoDB.put(dbParams);
    },
  },
  Query: {
    findEvent: async (
      _,
      { id }: { id: string },
      { dynamoDB }: { dynamoDB: AWS.DynamoDB.DocumentClient }
    ): Promise<Event | null> => {
      const dbParams = {
        TableName: 'events',
        Key: {
          id,
        },
      };

      const result = await dynamoDB.get(dbParams).promise();
      if (!result) {
        return null;
      }
      console.log(result);
      return {
        id: '123',
        createdAt: new Date(),
        creator: {
          sub: '123',
          nickname: '123',
        },
        date: new Date(),
        description: 'string',
        exactTime: true,
        participants: [
          {
            sub: '123',
            nickname: '123',
          },
        ],
        race: false,
        subtitle: 'string',
        title: 'string',
        type: 'string',
        updatedAt: new Date(),
      };
    },
  },
};
// export const EventType = enumType({
//   name: 'EventType',
//   members: EVENT_ENUMS,
// });

// export const Event = objectType({
//   name: 'Event',
//   definition(t: ObjectDefinitionBlock<'Event'>) {
//     t.string('id');
//     t.string('title');
//     t.string('subtitle', { nullable: true });
//     t.boolean('race');
//     t.field('type', {
//       type: EventType,
//     });
//     // t.date('date');
//     t.boolean('exactTime', { nullable: true });
//     t.string('description', { nullable: true });
//     // t.date('createdAt');
//     // t.date('updatedAt');

//     t.list.field('participants', {
//       type: 'SimpleUser',
//     });
//     t.field('creator', {
//       type: 'SimpleUser',
//     });
//   },
// });
