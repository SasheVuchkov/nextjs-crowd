import React, {ReactElement} from 'react';

export const CardStat = ({stat, icon, className}: {stat: number, icon: ReactElement, className?: string}) => {
    return (<div className={`d-flex align-items-center ${className}`}>
        {icon}
        <span className="ms-1">{stat}</span>
    </div>);
}