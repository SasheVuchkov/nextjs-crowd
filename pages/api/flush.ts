import {flushAll} from '../../lib/dbs/redis/client';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
  result: any;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
  const result: any = await flushAll();
  console.log(result);
  res.status(200).json({ name: 'Flush', result: result })
}

