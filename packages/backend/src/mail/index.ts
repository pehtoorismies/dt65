import mailgun, { messages } from 'mailgun-js';
import mjml2html from 'mjml';

import { config } from '../config';
import {
  EventEmailContent,
  EmailRecipient,
  WeeklyEmailContent,
} from '../types';
import { emailList, recipientVariables } from '../util';
import { createEventMail, createWeeklyEmail } from './email-template';

const { mailgun: mgConfig } = config;

const mg = mailgun({
  apiKey: mgConfig.apiKey,
  domain: mgConfig.domain,
  host: mgConfig.host,
});

const sendEventCreationEmail = async (
  recipients: EmailRecipient[],
  content: EventEmailContent
): Promise<boolean> => {
  const { typeHeader } = content;
  const { mjmlText, plainText } = await createEventMail(content);
  const mailContent = mjml2html(mjmlText);

  const data: messages.BatchData = {
    from: 'Kyttäki <hello@downtown65.com>',
    to: emailList(recipients),
    subject: `Uusi tapahtuma (${typeHeader})`,
    text: plainText,
    html: mailContent.html,
    'recipient-variables': recipientVariables(recipients),
  };

  try {
    const resp = await mg.messages().send(data);
    console.log(resp);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const sendWeeklyEmail = async (
  recipients: EmailRecipient[],
  content: WeeklyEmailContent
): Promise<boolean> => {
  const { mjmlText, plainText } = await createWeeklyEmail(content);
  const mailContent = mjml2html(mjmlText);

  const data: messages.BatchData = {
    from: 'Kyttäki <hello@downtown65.com>',
    to: emailList(recipients),
    subject: 'Ensi viikon tapahtumat',
    text: plainText,
    html: mailContent.html,
    'recipient-variables': recipientVariables(recipients),
  };

  try {
    const resp = await mg.messages().send(data);
    console.log(resp);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { sendEventCreationEmail, sendWeeklyEmail };
