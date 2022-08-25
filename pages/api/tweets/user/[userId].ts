// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {fetchTweetsByUserId} from '../../../../lib/utils/streamTweetsUtils/fetchRecords';
import {FormattedTweet} from '../../../../lib/types';
import {cacheControlValue} from '../../../../lib/constants';

type Data = {
    msg?: string
    tweets?: FormattedTweet[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (req.method !==  'GET') {
        res.status(405).json({msg: 'Method Not Allowed'});
        return;
    }


    try {
        const tweets = await fetchTweetsByUserId(req.query.userId as string);
        res.setHeader('Cache-Control', cacheControlValue);
        res.status(200).json({tweets});
    } catch (err) {
        console.error(err.stack || err.message);
        res.status(500).json({msg: 'Something went wrong...'});
    }

}