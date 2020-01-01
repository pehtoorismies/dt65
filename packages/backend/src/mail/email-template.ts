/* cSpell:disable */
import nunjucks from 'nunjucks';
import { map } from 'ramda';

import eventCreatedMjmlTemplate from './templates/event-created.mjml';
import weeklyEmailMjmlTemplate from './templates/weekly-email.mjml';
import {
  EmailTemplate,
  EventEmailData,
  WeeklyEventData,
  WeeklyEmailData,
} from '../types';

const createEventMail = async (
  data: EventEmailData
): Promise<EmailTemplate> => {
  const { title, type, date, eventUrl, creator, description } = data;
  const mjmlText = nunjucks.renderString(eventCreatedMjmlTemplate, data);

  const plainText = `
    Kippis, 

    käyttäjä ${creator} loi uuden ${type}-tapahtuman ${title}.

    Tapahtuman päivämäärä: ${date}

    ${description}

    Tarkastele tapahtumaa: ${eventUrl}
  
    Admin terveisin, 
    Kyttäki
  `;

  return {
    mjmlText,
    plainText,
  };
};

const createWeeklyEvent = (data: WeeklyEventData): string =>
  `
    ---
    ${data.title}
    ${data.subtitle}
    ${data.weekDay} ${data.date}

    Tarkastele tapahtumaa: ${data.eventUrl}
    
  `;

const createWeeklyEmail = async (
  options: WeeklyEmailData
): Promise<EmailTemplate> => {
  const mjmlText = nunjucks.renderString(weeklyEmailMjmlTemplate, options);
  const plainText = `
    Kippis, 

    ${map(createWeeklyEvent, options.weeklyEventData)}
  
    Admin terveisin, 
    Kyttäki
  `;

  return {
    mjmlText,
    plainText,
  };
};

export { createEventMail, createWeeklyEmail };
