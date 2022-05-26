import React, { useEffect, useState } from 'react';
import { setTheme } from '../helpers/theme';

function ToggleTheme() {
    const [togClass, setTogClass] = useState('dark');
    const theme = localStorage.getItem('theme');

    const handleOnClick = () => {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTheme('theme-light');
            setTogClass('light')
        } else {
            setTheme('theme-dark');
            setTogClass('dark')
        }
    }

    useEffect(() => {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTogClass('dark')
        } else if (localStorage.getItem('theme') === 'theme-light') {
            setTogClass('light')
        }
    }, [theme]);

    return (
        <div className="container-switch">
            <h3>{togClass === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme' } </h3>
            <label className="switch">
                <input type="checkbox" className="checkbox" onClick={handleOnClick} checked={togClass === "dark"} />
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default ToggleTheme;