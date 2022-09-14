// NEXTJS MIDDLEWARE (DON'T REMOVE OR MOVE THIS FILE)
import { sessionOptions } from '@lib/session';
import { getIronSession } from 'iron-session/edge';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest): Promise<unknown> {
  const res: NextResponse = NextResponse.next();

  const session = await getIronSession(req, res, sessionOptions);

  const { user } = session;

  // TODO: Melhorar validação se o usuário está logado ou não

  console.log(user);
  if (user == null) {
    return NextResponse.redirect(new URL('/login', req.url)); // redirect to /unauthorized page
  }

  return res;
}

export const config = {
  matcher: ['/inicio/:path*', '/users/:path*', '/permissions/:path*'],
};
