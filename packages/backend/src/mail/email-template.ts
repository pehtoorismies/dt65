import nunjucks from 'nunjucks';
import { map } from 'ramda';
import eventCreatedMjmlTemplate from './templates/event-created.mjml';
import weeklyEmailMjmlTemplate from './templates/weekly-email.mjml';
import {
  EmailTemplate,
  EventEmailOptions,
  WeeklyEmailOptions,
  IWeeklyOptions,
} from '../types';

const createEventMail = async (
  options: EventEmailOptions
): Promise<EmailTemplate> => {
  const { title, type, date, eventUrl, creator, description } = options;
  const mjmlText = nunjucks.renderString(eventCreatedMjmlTemplate, options);

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

const createWeeklyEvent = (options: IWeeklyOptions) =>
  `
    ---
    ${options.title}
    ${options.subtitle}
    ${options.weekDay} ${options.date}

    Tarkastele tapahtumaa: ${options.eventUrl}
    
  `;

const createWeeklyEmail = async (
  options: WeeklyEmailOptions
): Promise<EmailTemplate> => {
  const mjmlText = nunjucks.renderString(weeklyEmailMjmlTemplate, options);
  const plainText = `
    Kippis, 

    ${map(createWeeklyEvent, options.eventOptions)}
  
    Admin terveisin, 
    Kyttäki
  `;

  return {
    mjmlText,
    plainText,
  };
};

export { createEventMail, createWeeklyEmail };
