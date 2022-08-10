import {User} from '../types';
import en from 'javascript-time-ago/locale/en';

export const colorMentions = (html: string) => {
    const hashtags = new RegExp('(@[^    ,.:;!?]+)', 'ig').exec(html);
    console.log(hashtags, 'mentions');

    return html;
}

export const colorHashtags = (html: string) => {
    const hashtags = new RegExp('(#[^    ]+)', 'ig').exec(html);
    console.log(hashtags, 'hashtags');

    return html;
}


export const formatContent = (html: string) => {
    colorHashtags(colorMentions(html));

    return html;
}

export const applyUserDescriptionEntities = (html: string, user: User) => {
    const entities = user.entities?.description;
    if (!entities) {
        return html;
    }

    ['urls', 'hashtags', 'mentions'].forEach((entity: string) => {
        if (typeof entities[entity] === 'undefined') {
            return;
        }

        entities[entity].forEach(ent => {

            if (entity === 'hashtags') {
                console.log(`replaced hashtag ${ent.tag}`)
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