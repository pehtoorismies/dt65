import { messages } from 'mailgun-js';
import {
  addIndex,
  assoc,
  filter,
  find,
  fromPairs,
  join,
  pipe,
  pluck,
  prop,
  propEq,
  reduce,
  reject,
  split,
  toPairs,
} from 'ramda';
import rp from 'request-promise';

import { config } from './config';
import { EventType, EmailRecipient, ProfileUpdateProps } from './types';

const isEmailOrOpenId = (n: string) => n === 'email' || n === 'openid';

let kidCache: any = {};

export const getScopes = pipe(split(' '), reject(isEmailOrOpenId));

export const getMatchingPubKey = async (kid: string) => {
  if (kidCache[kid]) {
    return kidCache[kid];
  }
  const jwks = await rp({
    method: 'GET',
    url: `https://${config.auth.domain}/.well-known/jwks.json`,
  });
  const data = JSON.parse(jwks);

  const key = find(propEq('kid', kid), data.keys);

  const pubkey = key.x5c[0];

  const cert = `-----BEGIN CERTIFICATE-----\n${pubkey}\n-----END CERTIFICATE-----`;
  kidCache[kid] = cert;
  return cert;
};

export const findType = (
  type: string,
  eventTypes: EventType[],
  defaultTitle: string
) => {
  const eventType = find(propEq('id', type), eventTypes);
  if (eventType) {
    return prop('title', eventType);
  }
  // return something
  console.error('Not founding type', type);
  return defaultTitle;
};

export const emailList = (recipients: EmailRecipient[]): string => {
  return pipe(
    // @ts-ignore
    pluck('email'),
    join(',')
  )(recipients);
};

const indexedReducer = addIndex(reduce);

export const recipientVariables = (
  recipients: EmailRecipient[]
): messages.BatchSendRecipientVars => {
  const reducer = (acc: any, curr: EmailRecipient, id: number) => {
    const { email, name } = curr;

    const valueObj = {
      first: name,
      id: String(id),
    };
    return assoc(email, valueObj, acc);
  };
  // @ts-ignore
  return indexedReducer(reducer, {}, recipients);
};

type Pair = [string, string];

const valueFilter = (pair: Pair): boolean => !!pair[1];

const getDefinedProp = pipe(
  toPairs,
  // @ts-ignore
  filter(valueFilter),
  fromPairs
);

export const filterUndefined = (newMe: ProfileUpdateProps) => {
  return getDefinedProp(newMe);
};
