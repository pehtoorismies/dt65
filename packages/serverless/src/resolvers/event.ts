import { Event, InputEvent } from '../types';
import { v4 as uuid } from 'uuid';
import { DynamoDBAdapter } from '../dynamo-adapter';
import isEmpty from 'ramda/es/isEmpty';

export const typeDefs = `
  type Event {
    id: String!
    title: String!
  }

  input EventData {
    title: String!
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
  extend type Mutation {
    createEvent(addMe: Boolean = false, event: EventData!, notifySubscribers: Boolean = true): Event!
  }
  extend type Query {
    findEvent(id: String!): Event
  }
`;

export const resolvers = {
  Mutation: {
    createEvent: async (
      _,
      {
        addMe,
        event,
        notifySubscribers,
      }: { addMe: boolean; event: InputEvent; notifySubscribers: boolean },
      { dynamoDBAdapter }: { dynamoDBAdapter: DynamoDBAdapter }
    ): Promise<Event> => {
      const id: string = uuid();
      console.log('INSERT', id);

      const parameters = {
        TableName: 'events',
        Item: {
          id,
          ...event,
        },
        ConditionExpression: 'attribute_not_exists(id)',
      };
      try {
        await dynamoDBAdapter.insert(parameters);
      } catch (error) {
        console.error(error);
      }
      return {
        id,
        title: 'uus',
      };
    },
  },
  Query: {
    findEvent: async (
      _,
      { id }: { id: string },
      { dynamoDBAdapter }: { dynamoDBAdapter: DynamoDBAdapter }
    ): Promise<Event | null> => {
      const dbParams = {
        TableName: 'events',
        Key: {
          id,
        },
      };

      const result = await dynamoDBAdapter.find(dbParams);
      if (result == null || isEmpty(result)) {
        return null;
      }
      const event = result.Item as Event;
      return event;
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
