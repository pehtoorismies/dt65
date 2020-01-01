/* cSpell:disable */

import { createEventMail, createWeeklyEmail } from '../email-template';
import { EventEmailData, WeeklyEmailData } from '../../types';

test('Creation email', async () => {
  const options: EventEmailData = {
    title: 'some title',
    type: 'skiing',
    typeHeader: 'Hiihto',
    date: '12.2.2022 (tiistai)',
    eventUrl: '/url/',
    creator: 'metsäsika',
    description: `<ol>
                    <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                    <li>Aliquam tincidunt mauris eu risus.</li>
                    <li>Vestibulum auctor dapibus neque.</li>
                  </ol>`,
    preferencesUrl: 'do_not_care',
  };

  const template = await createEventMail(options);
  expect(template.mjmlText).toMatch(/<mjml>/);
  expect(template.mjmlText).toMatch(/some title/);
  expect(template.mjmlText).toMatch(/skiing/);
  expect(template.mjmlText).toMatch(/Hiihto/);
  expect(template.mjmlText).toMatch(/metsäsika/);
  expect(template.mjmlText).toMatch(/<ol>/);
  expect(template.plainText).toMatch(/Kippis,/);
});

test('Weekly email', async () => {
  const options: WeeklyEmailData = {
    weeklyEventData: [
      {
        title: 'some title',
        type: 'skiing',
        typeHeader: 'Hiihto',
        date: '12.2.2022',
        eventUrl: '/url/',
        creator: 'metsäsika',
        description: 'kuvaus',
        subtitle: 'subbis',
        weekDay: 'tiistai',
        participantCount: 5,
        preferencesUrl: 'do_not_care',
      },
      {
        title: 'some other',
        type: 'orienteering',
        typeHeader: 'Suunnistus',
        date: '12.2.2022',
        eventUrl: '/url/',
        creator: 'koira',
        description: 'deskaus',
        subtitle: 'subtitle2',
        weekDay: 'keskiviikko',
        participantCount: 6,
        preferencesUrl: 'do_not_care',
      },
    ],
    preferencesUrl: 'some_url',
  };

  const template = await createWeeklyEmail(options);
  expect(template.mjmlText).toMatch(/<mjml>/);
  expect(template.mjmlText).toMatch(/some title/);
  expect(template.mjmlText).toMatch(/skiing/);
  expect(template.mjmlText).toMatch(/Hiihto/);
  expect(template.mjmlText).toMatch(/tiistai/);

  expect(template.mjmlText).toMatch(/some title/);
  expect(template.mjmlText).toMatch(/orienteering/);

  expect(template.mjmlText).toMatch(/Suunnistus/);
  expect(template.mjmlText).toMatch(/Hiihto/);
});
