/* eslint-disable @typescript-eslint/camelcase */
import { toUserProfile } from '..';
import { UserProfile } from '../../types';

test('emailList', () => {
  const auth0User = {
    created_at: '2019-10-07T07:31:26.868Z',
    email: 'pehtoorismies@gmail.com',
    email_verified: true,
    identities: [
      {
        user_id: '5d9ae9cef5515f0e30d9b42a',
        provider: 'auth0',
        connection: 'Username-Password-Authentication',
        isSocial: false,
      },
    ],
    name: 'pehtoorismies@gmail.com',
    nickname: 'test',
    picture:
      'https://s.gravatar.com/avatar/176eb6f65cfff68dbcdde334af6e90da?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fpe.png',
    updated_at: '2019-10-16T18:05:09.793Z',
    user_id: 'auth0|5d9ae9cef5515f0e30d9b42a',
    user_metadata: {
      subscribeEventCreationEmail: true,
      subscribeWeeklyEmail: true,
    },
    last_login: '2019-10-16T18:05:09.793Z',
    last_ip: '62.248.214.191',
    logins_count: 19,
    app_metadata: {
      role: 'USER',
    },
  };

  const formatted: UserProfile = toUserProfile(auth0User);

  expect(formatted.createdAt).toBe('2019-10-07T07:31:26.868Z');
  expect(formatted.preferences.subscribeEventCreationEmail).toBe(true);
  expect(formatted.preferences.subscribeWeeklyEmail).toBe(true);
});
