import nunjucks from 'nunjucks';
import { map } from 'ramda';
import eventCreatedMjmlTemplate from './templates/event-created.mjml';
import weeklyEmailMjmlTemplate from './templates/weekly-email.mjml';
import {
  EmailTemplate,
  EventEmailContent,
  WeeklyEventContent,
  WeeklyEmailContent,
} from '../types';

const createEventMail = async (
  content: EventEmailContent
): Promise<EmailTemplate> => {
  const { title, type, date, eventUrl, creator, description } = content;
  const mjmlText = nunjucks.renderString(eventCreatedMjmlTemplate, content);

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

const createWeeklyEvent = (content: WeeklyEventContent): string =>
  `
    ---
    ${content.title}
    ${content.subtitle}
    ${content.weekDay} ${content.date}

    Tarkastele tapahtumaa: ${content.eventUrl}
    
  `;

const createWeeklyEmail = async (
  options: WeeklyEmailContent
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
