import feather from 'feather-icons';
import {CSSProperties} from 'react';


export const IconWrapper = ({svg, className, style}: {svg: string, className?: string, style?: CSSProperties}) =>
    <div className={className} style={style} dangerouslySetInnerHTML={{__html: svg}} />

export const heart = <IconWrapper svg={feather.icons.heart.toSvg()} className="icon icon-heart" />;
export const retweet = <IconWrapper svg={feather.icons.repeat.toSvg()} className="icon icon-retweet" /> ;
export const reply = <IconWrapper svg={feather.icons['message-square'].toSvg()} className="icon icon-reply" />;
export const follower = <IconWrapper svg={feather.icons.user.toSvg()} className="icon icon-user" />;
export const clock = <IconWrapper svg={feather.icons.clock.toSvg()} className="icon icon-clock" />;
export const edit = <IconWrapper svg={feather.icons.edit.toSvg()} className="icon icon-edit" />;
export const barChart = <IconWrapper svg={feather.icons['bar-chart-2'].toSvg()} className="icon icon-bar-chart" />;
export const send = <IconWrapper svg={feather.icons.send.toSvg()} className="icon icon-send" />;
export const coffee = <IconWrapper svg={feather.icons.coffee.toSvg()} className="icon icon-coffee" />;
export const twitter = <IconWrapper svg={feather.icons.twitter.toSvg()} className="icon icon-twitter" />;
export const linkedin = <IconWrapper svg={feather.icons.linkedin.toSvg()} className="icon icon-linkedin" />;
export const slash = <IconWrapper svg={feather.icons.slash.toSvg()} className="icon icon-slash" />;