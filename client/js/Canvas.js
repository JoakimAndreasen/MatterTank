class Canvas {
    constructor() {
        this.size;
        if (document.body.clientWidth > document.body.clientHeight) {
            this.size = document.body.clientHeight;
        } else {
            this.size = document.body.clientWidth;
        }
    }

    resize() {
        console.log("Here")
        if (document.body.clientWidth > document.body.clientHeight) {
            render.options.width = document.body.clientHeight;
            render.options.height = document.body.clientHeight;
            render.canvas.width = document.body.clientHeight;
            render.canvas.height = document.body.clientHeight;
        } else {
            render.options.width = document.body.clientWidth;
            render.options.height = document.body.clientWidth;
            render.canvas.width = document.body.clientWidth;
            render.canvas.height = document.body.clientWidth;
        }
    }
}