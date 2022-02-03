import { ISession } from '@shared/types';

// - Extend express'es request object
// with our custom Session interface
declare module 'express-session' {
  interface SessionData extends ISession {}
}