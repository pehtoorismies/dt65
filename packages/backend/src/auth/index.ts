/* eslint-disable @typescript-eslint/camelcase */
import { AuthenticationClient, ManagementClient, User } from 'auth0';
import { map, pickAll } from 'ramda';
import { renameKeys } from 'ramda-adjunct';

import { config } from '../config';
import {
  Auth0User,
  EmailRecipient,
  ProfileUpdateProps,
  UserMetadata,
  UserProfile,
} from '../types';

const { domain, clientId, clientSecret, jwtAudience } = config.auth;

const getAuth0Management = async (): Promise<ManagementClient> => {
  const management = new ManagementClient({
    domain,
    clientId,
    clientSecret,
    audience: `https://${domain}/api/v2/`,
    scope: 'read:users update:users',
  });
  return management;
};

const loginAuth0User = async (
  email: string,
  password: string
): Promise<{ accessToken: string; idToken: string; expiresIn: string }> => {
  const auth0 = new AuthenticationClient({
    domain,
    clientId,
    clientSecret,
  });

  const authZeroUser = await auth0.passwordGrant({
    password,
    username: email,
    scope:
      'read:events write:events read:me write:me read:users openid profile',
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    audience: jwtAudience,
  });

  return {
    accessToken: authZeroUser.access_token || '',
    idToken: authZeroUser.id_token || '',
    expiresIn: '0',
  };
};

const AUTH_PROFILE_PROPS = [
  'created_at',
  'email',
  'name',
  'nickname',
  'picture',
  'updated_at',
  'user_id',
  'user_metadata',
  'username',
];

const RENAME_KEYS = {
  user_id: 'id',
  created_at: 'createdAt',
  updated_at: 'updatedAt',
  user_metadata: 'preferences',
};

const toUserProfile = (user: User): UserProfile => {
  const props = pickAll<User, object>(AUTH_PROFILE_PROPS, user);
  return renameKeys(RENAME_KEYS, props) as UserProfile;
};

const toUserProfiles = (users: User[]): UserProfile[] =>
  map(toUserProfile, users);

const updateProfile = async (
  auth0UserId: string,
  propsToUpdate: ProfileUpdateProps
): Promise<UserProfile> => {
  const management = await getAuth0Management();
  const user = await management.updateUser({ id: auth0UserId }, propsToUpdate);
  return toUserProfile(user);
};

const updateUserMetadata = async (
  auth0UserId: string,
  userMetadata: UserMetadata
): Promise<UserProfile> => {
  const management = await getAuth0Management();

  const user = await management.updateUser(
    { id: auth0UserId },
    {
      user_metadata: {
        ...userMetadata,
      },
    }
  );
  return toUserProfile(user);
};

const fetchMyProfile = async (auth0Id: string): Promise<UserProfile> => {
  const management = await getAuth0Management();

  const user = await management.getUser({
    id: auth0Id,
  });

  return toUserProfile(user);
};

const fetchUsers = async (): Promise<UserProfile[]> => {
  const management = await getAuth0Management();

  const users = await management.getUsers();
  const userList: UserProfile[] = toUserProfiles(users);
  return userList;
};

const createAuth0User = async (user: Auth0User): Promise<UserProfile> => {
  const management = await getAuth0Management();

  const auth0User = await management.createUser({
    connection: 'Username-Password-Authentication',
    ...user,
    verify_email: true,
    email_verified: false,
    user_metadata: {
      subscribeWeeklyEmail: true,
      subscribeEventCreationEmail: true,
    },
    app_metadata: { role: 'USER' },
  });

  return toUserProfile(auth0User);
};

const AUTH0_QUERY_BASE = {
  fields: 'email,name',
  search_engine: 'v3',
};

const pickMailRecipientFields = (users: User[]): EmailRecipient[] => {
  return users
    .map(
      (u: User): EmailRecipient => ({
        name: u.name || '',
        email: u.email || '',
      })
    )
    .filter((u: EmailRecipient) => !!u.email);
};

const fetchCreateEventSubscribers = async (): Promise<EmailRecipient[]> => {
  const management = await getAuth0Management();

  try {
    const q = `user_metadata.subscribeEventCreationEmail:true`;
    const users = await management.getUsers({
      ...AUTH0_QUERY_BASE,
      q,
    });

    return pickMailRecipientFields(users);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchWeeklyEmailSubscribers = async (): Promise<EmailRecipient[]> => {
  const management = await getAuth0Management();

  try {
    const q = `user_metadata.subscribeWeeklyEmail:true`;
    const users = await management.getUsers({
      ...AUTH0_QUERY_BASE,
      q,
    });

    return pickMailRecipientFields(users);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchNickname = async (
  auth0UserId: string
): Promise<string | undefined> => {
  const management = await getAuth0Management();
  const user = await management.getUser({ id: auth0UserId });
  return user.nickname;
};

const requestChangePasswordEmail = (email: string): boolean => {
  try {
    new AuthenticationClient({
      domain,
      clientId,
      clientSecret,
    }).requestChangePasswordEmail({
      email,
      connection: 'Username-Password-Authentication',
    });
  } catch (error) {
    console.error(error);
  } finally {
    return true;
  }
};

export {
  createAuth0User,
  fetchCreateEventSubscribers,
  fetchMyProfile,
  fetchNickname,
  fetchUsers,
  fetchWeeklyEmailSubscribers,
  loginAuth0User,
  requestChangePasswordEmail,
  toUserProfile,
  updateProfile,
  updateUserMetadata,
};
