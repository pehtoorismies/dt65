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
  subtitle?: string;
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
  subscribeEventCreationEmail: boolean;
  subscribeWeeklyEmail: boolean;
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
  name?: string;
  username?: string;
  nickname?: string;
}

export interface SimpleUser {
  username?: string;
  nickname: string;
  sub: string;
}

export interface Event {
  id: string;
  // createdAt: Date;
  // creator: SimpleUser;
  // date: Date;
  // description?: string;
  // exactTime: boolean;
  // participants: SimpleUser[];
  // race: boolean;
  // subtitle?: string;
  title: string;
  // type: string;
  // updatedAt: Date;
}

export interface InputEvent {
  date: string;
  description: string;
  exactTime: boolean;
  race: boolean;
  subtitle: String;
  title: string;
  type: string;
}
