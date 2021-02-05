import React from 'react';
import './ButtonOption.css';

const ButtonOption = ({title, Icon}) => {
    return (
        <div className="buttonOption">
            <Icon />
            <p className="buttonOption__title">{title}</p>
        </div>
    )
}

export default ButtonOption
