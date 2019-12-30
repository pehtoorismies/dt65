import format from 'date-fns/format';
import { fi } from 'date-fns/locale';

import { EVENT_TYPES } from '../constants';
import { sendEventCreationEmail, sendWeeklyEmail } from '../mail';
import {
  EventDocument,
  EventEmailData,
  EmailRecipient,
  WeeklyEmailData,
  WeeklyEventData,
} from '../types';
import { findType } from '../util';

const mapEventOptions = (
  eventDocument: EventDocument,
  clientDomain: string
): EventEmailData => {
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
  users: EmailRecipient[],
  eventDocument: EventDocument,
  clientDomain: string
): Promise<void> => {
  const eventOptions: EventEmailData = mapEventOptions(
    eventDocument,
    clientDomain
  );

  if (users.length === 0) {
    return;
  }
  sendEventCreationEmail(users, eventOptions);
};

export const notifyWeeklySubscribers = async (
  users: EmailRecipient[],
  eventDocuments: EventDocument[],
  clientDomain: string
): Promise<void> => {
  const weeklyEventData: WeeklyEventData[] = eventDocuments.map(
    (eventDocument: EventDocument) => {
      const weekDay = format(new Date(eventDocument.date), 'EEEE', {
        locale: fi,
      });
      const date = format(new Date(eventDocument.date), 'dd.MM.yyyy', {
        locale: fi,
      });

      return {
        ...mapEventOptions(eventDocument, clientDomain),
        subtitle: eventDocument.subtitle,
        weekDay,
        date,
        participantCount: eventDocument.participants.length,
      };
    }
  );

  const data: WeeklyEmailData = {
    weeklyEventData: weeklyEventData,
    preferencesUrl: `${clientDomain}/preferences`,
  };

  sendWeeklyEmail(users, data);
};
