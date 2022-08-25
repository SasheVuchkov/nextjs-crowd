import {flushAll} from '../lib/dbs/redis/client';


const main = async () => {

    const result: any = await flushAll();
    console.log(result);
}

main().catch(err => console.log(err.stack || err.message));