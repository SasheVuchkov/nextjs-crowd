import {Entity, FormattedTweet, FormattedUser} from '../types';

export const applyEntities = (html: string, entities: Record<string, Entity[]>) => {
    ['urls', 'hashtags', 'mentions'].forEach((entity: string) => {
        if (typeof entities[entity] === 'undefined') {
            return;
        }

        entities[entity].forEach(ent => {

            if (entity === 'hashtags') {
                html = html.replace(`#${ent.tag}`, `<span class="focus-color">#${ent.tag}</span>`)
            }

            if (entity === 'mentions') {
                html = html.replace(`@${ent.username}`, `<span class="focus-color">@${ent.username}</span>`)
            }

            if (entity === 'urls') {
                html = html.replace(`${ent.url}`, `<span class="focus-color">${ent.display_url}</span>`)
            }
        })
    });


    return html;
}

export const applyUserDescriptionEntities = (html: string, user: FormattedUser) => {
    if (!user.entities) {
        return html;
    }

    const entities = JSON.parse(user.entities);

    if (!entities.description) {
        return html;
    }

    return applyEntities(html, entities.description);
}

export const applyTweetEntities = (html: string, tweet: FormattedTweet) => {
    if (!tweet.entities) {
        return html;
    }

    const entities = JSON.parse(tweet.entities);

    if (!entities) {
        return html;
    }


    return applyEntities(html, entities);
}