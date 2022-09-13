// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from 'iron-session';

interface UserSession {
  id: string | number;
}

export const sessionOptions: IronSessionOptions = {
  cookieName: process.env.SESSION_NAME ?? 'lsysSession',
  password: process.env.SESSION_PASSWORD ?? 'lsysSession',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 2, // 2 hours
  },
};

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user?: UserSession;
  }
}
