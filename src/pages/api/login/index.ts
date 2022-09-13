import { sessionOptions } from '@lib/session';
import axios from 'axios';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<unknown> {
  if (req.method === 'POST') {
    const { username, password } = await req.body;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL ?? ''}/auth/login`,
        {
          username,
          password,
        }
      );

      const userInfo = response.data;

      req.session.user = {
        id: userInfo.id,
      };
      await req.session.save();

      return res.status(200).json(userInfo);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  } else {
    return res.status(405);
  }
}
