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
}