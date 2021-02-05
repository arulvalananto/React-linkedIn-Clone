import React from 'react';
import './HeaderOption.css';

const HeaderOption = ({Icon, title}) => {
    return (
        <div className="headerOption">
            {Icon && <Icon className="headerOption__icon"/>}
            <h4 className="headerOption__title">{title}</h4>
        </div>
    )
}

export default HeaderOption
