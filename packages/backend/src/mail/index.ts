import mailgun, { messages } from 'mailgun-js';
import mjml2html from 'mjml';

import { config } from '../config';
import { EventEmailData, EmailRecipient, WeeklyEmailData } from '../types';
import { emailList, recipientVariables } from '../util';
import { createEventMail, createWeeklyEmail } from './email-template';

const { mailgun: mgConfig } = config;

const mg = mailgun({
  apiKey: mgConfig.apiKey,
  domain: mgConfig.domain,
  host: mgConfig.host,
});

const sendMail = async (data: messages.BatchData) => {
  try {
    const resp = await mg.messages().send(data);
    console.log(resp);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const sendEventCreationEmail = async (
  recipients: EmailRecipient[],
  emailData: EventEmailData
): Promise<boolean> => {
  const { typeHeader } = emailData;
  const { mjmlText, plainText } = await createEventMail(emailData);
  const mailContent = mjml2html(mjmlText);

  const batchData: messages.BatchData = {
    from: 'Kyttäki <hello@downtown65.com>',
    to: emailList(recipients),
    subject: `Uusi tapahtuma (${typeHeader})`,
    text: plainText,
    html: mailContent.html,
    'recipient-variables': recipientVariables(recipients),
  };
  const success = await sendMail(batchData);
  return success;
};

const sendWeeklyEmail = async (
  recipients: EmailRecipient[],
  emailData: WeeklyEmailData
): Promise<boolean> => {
  const { mjmlText, plainText } = await createWeeklyEmail(emailData);
  const mailContent = mjml2html(mjmlText);

  const batchData: messages.BatchData = {
    from: 'Kyttäki <hello@downtown65.com>',
    to: emailList(recipients),
    subject: 'Ensi viikon tapahtumat',
    text: plainText,
    html: mailContent.html,
    'recipient-variables': recipientVariables(recipients),
  };

  const success = await sendMail(batchData);
  return success;
};

export { sendEventCreationEmail, sendWeeklyEmail };
