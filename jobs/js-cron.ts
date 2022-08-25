import * as cron from 'node-cron';
import job from './job';

console.log('Scheduling a cron job...')
cron.schedule('* * * * *', () => {
    job().catch(err => console.error(err.stack || err.message));
})
