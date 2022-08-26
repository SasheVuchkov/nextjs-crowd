// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {
    fetchTweetsByUserId,
    fetchTweetsFromDB,
    fetchUsersFromDB
} from '../../../lib/utils/streamTweetsUtils/fetchRecords';
import {FormattedTweet, FormattedUser} from '../../../lib/types';
import {cacheControlValue, perPage} from '../../../lib/constants';
import getCacher from '../../../lib/utils/getCacher';

type Data = {
    msg?: string
    users?: FormattedUser[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (req.method !==  'GET') {
        res.status(405).json({msg: 'Method Not Allowed'});
        return;
    }

    const page = Number(req.query.page);

    if (isNaN(page) || page > 1000 || page < 1) {
        res.status(400).json({msg: 'Invalid page number'});
        return;
    }

    try {

        const cachedUsers= await getCacher.get(`users_page_${req.query.page}`);

        if (cachedUsers) {
            res.setHeader('Cache-Control', cacheControlValue);
            res.status(200).json({users: cachedUsers as FormattedUser[]});
            return;
        }

        const users = await fetchUsersFromDB(15 + (page - 1)*perPage ,perPage);
        await getCacher.set(`users_page_${req.query.page}`, users);
        res.setHeader('Cache-Control', cacheControlValue);
        res.status(200).json({users});
    } catch (err) {
        console.error(err.stack || err.message);
        res.status(500).json({msg: 'Something went wrong...'});
    }

}