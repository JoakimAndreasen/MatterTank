let themes = {
    dark: {
        title: "#9c9c9c",
        background: "#111111",
        game: {
            background: "#000000",
            border: "#14151f"
        },
        scrollbar: "#14151f",
        scrollbarHover: "#333333",
        card: {
            title: "#9c9c9c",
            text: "#494949",
            background: "#070707",
            field: "#14151f",
            fieldHover: "#7768AE"
        }
    },
    light: {
        title: "#000000",
        background: "#d8d8d8",
        game: {
            background: "#d8d8d8",
            border: "#ffffff"
        },
        scrollbar: "#95A2C6",
        scrollbarHover: "#1f1f1f",
        card: {
            title: "#000000",
            text: "#ffffff",
            background: "#fafafa",
            field: "#5694FF",
            fieldHover: "#FF5666"
        }
    },
    colorful: {
        title: "#ffd900",
        background: "#ff0000",
        game: {
            background: "#33FF33",
            border: "#ff6600"
        },
        scrollbar: "#0015ff",
        scrollbarHover: "#8c00ff",
        card: {
            title: "#ffd900",
            text: "#ff00d4",
            background: "#119200",
            field: "#0015ff",
            fieldHover: "#8c00ff"
        }
    },
    prettier: {
        title: "#9c9c9c",
        background: "#111111",
        game: {
            background: "#000000",
            border: "#E15554"
        },
        scrollbar: "#3BB273",
        scrollbarHover: "#E1BC29",
        card: {
            title: "#9c9c9c",
            text: "#ffffff",
            background: "#070707",
            field: "#4D9DE0",
            fieldHover: "#7768AE"
        }
    }
}

import {render} from './matterComponents.js';
import {grid, border} from './matterComponents.js';
import {setGridColor,setBorderColor } from "./grid.js";


/*Theme changer*/
function changeTheme(theme) {
    let r = document.querySelector(':root');
    r.style.setProperty('--title', theme.title);
    r.style.setProperty('--background', theme.background);
    r.style.setProperty('--scrollbar', theme.scrollbar);
    r.style.setProperty('--scrollbar-hover', theme.scrollbarHover);
    r.style.setProperty('--card-title', theme.card.title);
    r.style.setProperty('--card-text', theme.card.text);
    r.style.setProperty('--card-background', theme.card.background);
    r.style.setProperty('--card-field', theme.card.field);
    r.style.setProperty('--card-field-hover', theme.card.fieldHover);

    //Set game background color
    render.options.background = theme.game.background;

    //Set border colors
    setGridColor(grid, theme.game.border);
    setBorderColor(border, theme.game.border);
}

/*Themes*/
function darkTheme() {
    localStorage.setItem('theme', JSON.stringify(themes.dark));
    changeTheme(themes.dark);
}

function lightTheme() {
    localStorage.setItem('theme', JSON.stringify(themes.light));
    changeTheme(themes.light);
}

function colorfulTheme() {
    localStorage.setItem('theme', JSON.stringify(themes.colorful));
    changeTheme(themes.colorful);
}

function prettierTheme() {
    localStorage.setItem('theme', JSON.stringify(themes.prettier));
    changeTheme(themes.prettier);
}

function setupTheme() {
    darkThemeButton.onclick = darkTheme;
    lightThemeButton.onclick = lightTheme;
    colorfulThemeButton.onclick = colorfulTheme;
    prettierThemeButton.onclick = prettierTheme;

    //Get the last applied theme
    let currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : JSON.stringify(themes.dark);
    currentTheme = JSON.parse(currentTheme);
    changeTheme(currentTheme);
}

export {setupTheme};