let r = document.querySelector(':root');

function changeTheme(theme) {
    r.style.setProperty('--title', theme.title);
    r.style.setProperty('--background', theme.background);
    r.style.setProperty('--card-title', theme.card.title);
    r.style.setProperty('--card-text', theme.card.text);
    r.style.setProperty('--card-background', theme.card.background);
    r.style.setProperty('--card-field', theme.card.field);

    //Set game background color
    render.options.background = theme.game.background;

    //Set border colors
    for (let i = 0; i < Border.bodies.length; i++) {
        Border.bodies[i].render.fillStyle = theme.game.border;
    }

    for (let i = 0; i < gridComposite.composites.length; i++) {
        for (let j = 0; j < gridComposite.composites[i].bodies.length; j++) {
            gridComposite.composites[i].bodies[j].render.fillStyle = theme.game.border;
        }
    }
}

function darkTheme() {
    let theme = {
        title: "#ffffff",
        background: "#080808",
        game: {
            background: "#080808",
            border: "#272727"
        },
        card: {
            background: "#",
            field: "#",
            text: "#",
            title: "#"
        }
    }
    
    changeTheme(theme);
}

function lightTheme() {
    let theme = {
        title: "#",
        background: "#ffffff",
        game: {
            background: "#ffffff",
            border: "#000000"
        },
        card: {
            background: "#",
            field: "#",
            text: "#",
            title: "#"
        }
    }

    changeTheme(theme);
}

function colorfulTheme() {
    let theme = {
        title: "#",
        background: "#",
        game: {
            background: "#",
            border: "#"
        },
        card: {
            background: "#",
            field: "#",
            text: "#",
            title: "#"
        }
    }

    currentTheme(theme);
}

/*Needs to be looked through :)
let gameThemes = {
    "dark": {
        "background": "#000000",
        "map":'#14151f',
    },
    "light": {
        "background": "#aaaaaa",
        "map":'rgb(255,255,255,255)',
    },
    "colorful": {
        "background": "#33FF33",
        "map":'rgb(255,100,0,255)'
    }
} 

let currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : "dark";
document.documentElement.setAttribute('data-theme', currentTheme);
updateGameColors(currentTheme);

document.querySelectorAll('.themeChangeButton').forEach(button => {
    button.addEventListener('click', () => {
        
        currentTheme = button.id;
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        updateGameColors(currentTheme);
    });
});

function updateGameColors(theme) {
    setGridColor(grid, gameThemes[theme].map);
    setBorderColor(Border, gameThemes[theme].map);
    render.options.background = gameThemes[theme].background;
}*/