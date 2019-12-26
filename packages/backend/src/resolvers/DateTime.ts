import { GraphQLDateTime } from 'graphql-iso-date';
import { asNexusMethod } from 'nexus';

export const Date = asNexusMethod(GraphQLDateTime, 'date');
export const DateTime = GraphQLDateTime;
