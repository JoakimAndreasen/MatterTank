window.addEventListener('load', function () {
    document.querySelector("#rightContainer").style.width = window.innerWidth/2-window.innerHeight/2+1 + "px";
    document.querySelector("#leftContainer").style.width = window.innerWidth/2-window.innerHeight/2 + "px";

    function updateUI() {
        document.querySelector("#rightContainer").style.width = window.innerWidth/2-window.innerHeight/2+1 + "px";
        document.querySelector("#leftContainer").style.width = window.innerWidth/2-window.innerHeight/2 + "px";
    }

    window.onresize = updateUI;
})