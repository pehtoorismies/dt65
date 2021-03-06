import { enumType, objectType } from 'nexus';
import { EVENT_ENUMS } from '../constants';
import { ObjectDefinitionBlock } from 'nexus/dist/core';

export const EventType = enumType({
  name: 'EventType',
  members: EVENT_ENUMS,
});

export const Event = objectType({
  name: 'Event',
  definition(t: ObjectDefinitionBlock<'Event'>) {
    t.string('id');
    t.string('title');
    t.string('subtitle', { nullable: true });
    t.boolean('race');
    t.field('type', {
      type: EventType,
    });
    t.date('date');
    t.boolean('exactTime', { nullable: true });
    t.string('description', { nullable: true });
    t.date('createdAt');
    t.date('updatedAt');

    t.list.field('participants', {
      type: 'SimpleUser',
    });
    t.field('creator', {
      type: 'SimpleUser',
    });
  },
});
