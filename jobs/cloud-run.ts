import * as express from 'express';
import job from './job';

const PORT: number = parseInt(process.env.PORT) || 3004;
const app = express();

app.use(express.json());

app.listen(PORT, () =>
    console.log(`nextjs-crowd-pubsub listening on port ${PORT}`)
);

app.post('/', (req, res) => {
    console.log('Start processing pub/sub job');
    job().then(() => {
        res.status(200).send();
    }).catch(err => {
        console.error(err.stack || err.message);
        res.status(500).send('Server Error:' + err.stack || err.message);
    });
});