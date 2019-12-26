/* eslint-disable @typescript-eslint/camelcase */
import {
  AuthenticationClient,
  ManagementClient,
  UserData,
  AppMetadata,
  UserMetadata,
} from 'auth0';
import { map, pickAll, pipe } from 'ramda';
import { renameKeys } from 'ramda-adjunct';

import { config } from '../config';
import {
  IAuth0Profile,
  IAuth0ProfileUpdate,
  IAuth0User,
  IMailRecipient,
  IAuth0UserMetaData,
  IPreferences,
} from '../types';

const { domain, clientId, clientSecret, jwtAudience } = config.auth;

const getAuth0Management = async (): Promise<ManagementClient> => {
  const management = new ManagementClient<AppMetadata, UserMetadata>({
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
  'user_id',
  'email',
  'name',
  'nickname',
  'username',
  'picture',
  'updated_at',
  'created_at',
  'user_metadata',
];

const RENAME_KEYS = {
  user_id: 'id',
  created_at: 'createdAt',
  updated_at: 'updatedAt',
  user_metadata: 'preferences',
};

const format = pipe(pickAll(AUTH_PROFILE_PROPS), renameKeys(RENAME_KEYS));

const toUserFormat = (fromAuth0: any): IAuth0Profile => {
  return format(fromAuth0);
};

const formatUsers = pipe(
  map(pickAll(AUTH_PROFILE_PROPS)),
  map((up: any) => {
    if (!up.preferences) {
      return {
        ...up,
        // eslint-disable-next-line @typescript-eslint/camelcase
        user_metadata: {
          subscribeEventCreationEmail: 'true',
          subscribeWeeklyEmail: 'true',
        },
      };
    } else {
      return up;
    }
  }),
  map(renameKeys(RENAME_KEYS))
);

const updateProfile = async (
  auth0UserId: string,
  updateable: IAuth0ProfileUpdate
): Promise<IAuth0Profile> => {
  const management = await getAuth0Management();
  const user = await management.updateUser({ id: auth0UserId }, updateable);
  return toUserFormat(user);
};

const updatePreferences = async (
  auth0UserId: string,
  preferences: IPreferences
): Promise<IAuth0Profile> => {
  const management = await getAuth0Management();

  const user = await management.updateUser(
    { id: auth0UserId },
    {
      // eslint-disable-next-line @typescript-eslint/camelcase
      user_metadata: {
        ...preferences,
      },
    }
  );
  return toUserFormat(user);
};

const fetchMyProfile = async (auth0Id: string): Promise<IAuth0Profile> => {
  const management = await getAuth0Management();

  const user = await management.getUser({ id: auth0Id });
  return toUserFormat(user);
};

// TODO: fix cache
const fetchUsers = async (
  verified: boolean = true
): Promise<IAuth0Profile[]> => {
  const management = await getAuth0Management();

  const usersResp: Array<any> = await management.getUsers();
  const userList: IAuth0Profile[] = formatUsers(usersResp);
  return userList;
};

const createAuth0User = async (user: IAuth0User): Promise<IAuth0Profile> => {
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

  return toUserFormat(auth0User);
};

const AUTH0_QUERY_BASE = {
  fields: 'email,name',
  search_engine: 'v3',
};

const pickMailRecipientFields = (
  users: UserData<any, IAuth0UserMetaData>[]
) => {
  return users
    .map((u: UserData) => {
      return {
        name: u.name || '',
        email: u.email || '',
      };
    })
    .filter((u: IMailRecipient) => {
      return !!u.email;
    });
};

const fetchCreateEventSubscribers = async (): Promise<IMailRecipient[]> => {
  const management = await getAuth0Management();

  try {
    const q = `user_metadata.subscribeEventCreationEmail:true`;
    const users: UserData<
      any,
      IAuth0UserMetaData
    >[] = await management.getUsers({
      ...AUTH0_QUERY_BASE,
      q,
    });

    return pickMailRecipientFields(users);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchWeeklyEmailSubscribers = async (): Promise<IMailRecipient[]> => {
  const management = await getAuth0Management();

  try {
    const q = `user_metadata.subscribeWeeklyEmail:true`;
    const users: UserData<
      any,
      IAuth0UserMetaData
    >[] = await management.getUsers({
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
  loginAuth0User,
  requestChangePasswordEmail,
  fetchUsers,
  fetchMyProfile,
  toUserFormat,
  updatePreferences,
  updateProfile,
  fetchCreateEventSubscribers,
  fetchWeeklyEmailSubscribers,
  fetchNickname,
};
