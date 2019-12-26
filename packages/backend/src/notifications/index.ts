import format from 'date-fns/format';
import { fi } from 'date-fns/locale';

import { config } from '../config';
import { EVENT_TYPES } from '../constants';
import { sendEventCreationEmail, sendWeeklyEmail } from '../mail';
import { IEventEmailOptions, IMailRecipient, IWeeklyOptions } from '../types';
import { findType } from '../util';

const { clientDomain } = config;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapEventOptions = (eventDocument: any): IEventEmailOptions => {
  const date = format(new Date(eventDocument.date), 'dd.MM.yyyy (EEEE)', {
    locale: fi,
  });

  const type = eventDocument.type;
  const typeHeader = findType(type, EVENT_TYPES, EVENT_TYPES[0].title);

  return {
    title: eventDocument.title,
    eventUrl: `${clientDomain}/events/${eventDocument._id}`,
    creator: eventDocument.creator.nickname,
    date,
    typeHeader,
    type: type.toLowerCase(),
    description: eventDocument.description || 'ei tarkempaa kuvausta.',
    preferencesUrl: `${clientDomain}/preferences`,
  };
};

export const notifyEventCreationSubscribers = async (
  users: IMailRecipient[],
  eventDocument: any
): Promise<void> => {
  const eventOptions: IEventEmailOptions = mapEventOptions(eventDocument);

  if (users.length === 0) {
    // no subsriptions
    return;
  }
  sendEventCreationEmail(users, eventOptions);
};

export const notifyWeeklySubscribers = async (
  users: IMailRecipient[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eventDocuments: any[]
): Promise<void> => {
  const options: IWeeklyOptions[] = eventDocuments.map((eventDocument: any) => {
    const weekDay = format(new Date(eventDocument.date), 'EEEE', {
      locale: fi,
    });
    const date = format(new Date(eventDocument.date), 'dd.MM.yyyy', {
      locale: fi,
    });

    return {
      ...mapEventOptions(eventDocument),
      subtitle: eventDocument.subtitle,
      weekDay,
      date,
      participantCount: eventDocument.participants.length,
    };
  });

  sendWeeklyEmail(users, {
    eventOptions: options,
    preferencesUrl: `${clientDomain}/preferences`,
  });
};
