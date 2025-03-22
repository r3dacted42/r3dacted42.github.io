import { useState } from "react";
import { MdContrast, MdDarkMode, MdLightMode } from "react-icons/md";
import './styles/ThemeButton.css';
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
            return <MdContrast />;
        } else if (theme === Themes.Light) {
            return <MdLightMode />;
        } else {
            return <MdDarkMode />;
        }
    }

    return (
        <button className="theme-button" onClick={onClick}>
            {iconComp()}
        </button>
    );
}

export default ThemeButton;