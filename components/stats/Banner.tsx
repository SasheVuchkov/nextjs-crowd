import React from 'react';
import Snippet from './Snippet';
import {TweetStats, UserStats} from '../../lib/types';
import {statsRegister} from '../../lib/constants';

export type Props = {
    title: string|JSX.Element,
    stats: UserStats|TweetStats,
}


export default function Banner({title, stats}: Props) {
    return (
        <div className="banner">
            {title}
            <div className="mt-2 d-flex flex-wrap justify-content-between align-items-center w-100">
                {Object.entries(stats).map((entry: [string, any]) =>
                    <Snippet style={{width: '35%'}} key={entry[0]} title={statsRegister[entry[0]].name} description={statsRegister[entry[0]].description}>
                        {entry[1]}
                    </Snippet>
                )}
            </div>
        </div>
    );
}

