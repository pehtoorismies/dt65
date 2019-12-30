export interface Auth0Config {
  domain: string;
  clientId: string;
  clientSecret: string;
  jwtAudience: string;
}

export interface EmailRecipient {
  email: string;
  name: string;
}

export interface MailgunConfig {
  apiKey: string;
  domain: string;
  fromMail: string;
  host: string;
}

export interface EventType {
  id: string;
  title: string;
}

export interface EventEmailData {
  creator: string;
  date: string;
  description: string;
  eventUrl: string;
  preferencesUrl: string;
  title: string;
  type: string;
  typeHeader: string;
}

export interface WeeklyEventData extends EventEmailData {
  participantCount: number;
  subtitle: string;
  weekDay: string;
}
export interface WeeklyEmailData {
  preferencesUrl: string;
  weeklyEventData: WeeklyEventData[];
}

export interface EmailTemplate {
  plainText: string;
  mjmlText: string;
}

export interface Auth0User {
  email: string;
  nickname: string;
  password: string;
  name: string;
}

export interface UserMetadata {
  subscribeEventCreationEmail: string;
  subscribeWeeklyEmail: string;
}
export interface AppMetadata {
  role: string;
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  nickname: string;
  name: string;
  picture: string;
  createdAt: string;
  updatedAt?: string;
  preferences: UserMetadata;
}

export interface ProfileUpdateProps {
  name?: string | null;
  username?: string | null;
  nickname?: string | null;
}

export interface EventDocument {
  _id: string;
  title: string;
  date: string;
  type: string;
  subtitle: string;
  creator: {
    nickname: string;
  };
  description?: string;
  participants: {}[];
}
