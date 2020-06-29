/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import { core } from "@nexus/schema"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    date<FieldName extends string>(fieldName: FieldName, opts?: core.ScalarInputFieldConfig<core.GetGen3<"inputTypes", TypeName, FieldName>>): void // "Date";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
  EventType: "Karonkka" | "Meeting"
}

export interface NexusGenRootTypes {
  BaseUser: { // root type
    email: string; // String!
    id: string; // String!
    name: string; // String!
    nickname: string; // String!
    picture: string; // String!
  }
  Event: { // root type
    createdAt: any; // Date!
    date: any; // Date!
    description?: string | null; // String
    exactTime?: boolean | null; // Boolean
    id: string; // String!
    race: boolean; // Boolean!
    subtitle?: string | null; // String
    title: string; // String!
    type: NexusGenEnums['EventType']; // EventType!
    updatedAt: any; // Date!
  }
  Preferences: { // root type
    subscribeEventCreationEmail: boolean; // Boolean!
    subscribeWeeklyEmail: boolean; // Boolean!
  }
  Query: {};
  SimpleUser: { // root type
    id: string; // String!
    nickname?: string | null; // String
    sub?: string | null; // String
    username?: string | null; // String
  }
  User: { // root type
    createdAt: any; // Date!
    email: string; // String!
    id: string; // String!
    name: string; // String!
    nickname?: string | null; // String
    preferences: NexusGenRootTypes['Preferences']; // Preferences!
    updatedAt?: any | null; // Date
  }
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  Date: any;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  EventType: NexusGenEnums['EventType'];
}

export interface NexusGenFieldTypes {
  BaseUser: { // field return type
    email: string; // String!
    id: string; // String!
    name: string; // String!
    nickname: string; // String!
    picture: string; // String!
  }
  Event: { // field return type
    createdAt: any; // Date!
    date: any; // Date!
    description: string | null; // String
    exactTime: boolean | null; // Boolean
    id: string; // String!
    race: boolean; // Boolean!
    subtitle: string | null; // String
    title: string; // String!
    type: NexusGenEnums['EventType']; // EventType!
    updatedAt: any; // Date!
  }
  Preferences: { // field return type
    subscribeEventCreationEmail: boolean; // Boolean!
    subscribeWeeklyEmail: boolean; // Boolean!
  }
  Query: { // field return type
    hero: string; // String!
    human: string; // String!
  }
  SimpleUser: { // field return type
    id: string; // String!
    nickname: string | null; // String
    sub: string | null; // String
    username: string | null; // String
  }
  User: { // field return type
    createdAt: any; // Date!
    email: string; // String!
    id: string; // String!
    name: string; // String!
    nickname: string | null; // String
    preferences: NexusGenRootTypes['Preferences']; // Preferences!
    updatedAt: any | null; // Date
  }
}

export interface NexusGenArgTypes {
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "BaseUser" | "Event" | "Preferences" | "Query" | "SimpleUser" | "User";

export type NexusGenInputNames = never;

export type NexusGenEnumNames = "EventType";

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Date" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}