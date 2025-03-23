import { useState } from "react";
import './styles/MenuItem.css';
enum Themes { System, Light, Dark };

function ThemeButton() {
    const [theme, setTheme] = useState<Themes>(Themes.System);

    const onClick = () => {
        setTheme(prev => {
            if (prev === Themes.System) {
                document.documentElement.style.colorScheme = 'light';
                return Themes.Light;
            } else if (prev === Themes.Light) {
                document.documentElement.style.colorScheme = 'dark';
                return Themes.Dark;
            }
            document.documentElement.style.colorScheme = 'light dark';
            return Themes.System;
        });
    }

    const iconComp = () => {
        if (theme === Themes.System) {
            return "contrast";
        } else if (theme === Themes.Light) {
            return "light_mode";
        } else {
            return "dark_mode";
        }
    }

    return (
        <a href="#!" style={{ fontFamily: 'Material Icons' }} className="menu-item" onClick={onClick}>
            {iconComp()}
        </a>
    );
}

export default ThemeButton;