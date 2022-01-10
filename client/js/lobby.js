//Only run script if webpage is loaded
window.addEventListener("load", function () {
    //connect to server
    socket = io.connect("http://localhost:3000");
    console.log("Connected to Server");
});