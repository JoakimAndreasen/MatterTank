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