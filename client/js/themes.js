const themes = {
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
            fieldHover: "#333333"
        }
    },
    light: {
        title: "#000000",
        background: "#d8d8d8",
        game: {
            background: "#aaaaaa",
            border: "#ffffff"
        },
        scrollbar: "#95A2C6",
        scrollbarHover: "#1f1f1f",
        card: {
            title: "#000000",
            text: "#2a2a2a",
            background: "#a7a7a7",
            field: "#95A2C6",
            fieldHover: "#1f1f1f"
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
    }
}

//Get the last applied theme
let currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : JSON.stringify(themes.dark);
currentTheme = JSON.parse(currentTheme);

let r = document.querySelector(':root');

/*Theme changer*/
function changeTheme(theme) {
    r.style.setProperty('--title', theme.title);
    r.style.setProperty('--background', theme.background);
    r.style.setProperty('--scrollbar', theme.scrollbar);
    r.style.setProperty('--scrollbar-hover', theme.scrollbarHover);
    r.style.setProperty('--card-title', theme.card.title);
    r.style.setProperty('--card-text', theme.card.text);
    r.style.setProperty('--card-background', theme.card.background);
    r.style.setProperty('--card-field', theme.card.field);

    //Set game background color
    render.options.background = theme.game.background;

    //Set border colors
    setGridColor(grid, theme.game.border);
    setBorderColor(Border, theme.game.border);
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