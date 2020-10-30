// TODO: Implement "syntaxes"
var squarre_shape = calcSquarre(40,100); //[{x:0,y:0},{x:100,y:0},{x:100,y:100},{x:0,y:100}];
var triangle      = calcTriangle(40,100);
var circle        = calcCircle(40,50,{x:50,y:50});
var recognizableShapes = [squarre_shape, triangle, circle];

class CanvasStylusRecognizer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    drawer: ShapeDrawer;
    lineWidth: number;
    recognizer: ShapeRecognizer;

    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.drawer = null;
        this.lineWidth = 3;
        this.recognizer = new ShapeRecognizer();
    }
    resize_func() {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
    }
    load(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.resize_func();
        this.drawer = new ShapeDrawer(this.ctx, this.performRecognition);
        this.ctx.lineWidth = this.lineWidth;
        this.canvas.addEventListener("mousedown", (e) => { this.drawer.onDown(e); });
        this.canvas.addEventListener("mouseup", (e) => { this.drawer.onUp(e); });
        this.canvas.addEventListener("mousemove", (e) => { this.drawer.draw(e); });
        this.canvas.addEventListener("touchstart", (e) => {
            var t = e.touches[0];
            if(t.touchType != "stylus") return;
            e.preventDefault();
            var me = new MouseEvent("mousedown", {
                clientX: t.clientX, 
                clientY: t.clientY,
                button: 0
            });
            this.canvas.dispatchEvent(me);
        }, false);
        this.canvas.addEventListener("touchmove", (e) => {
            e.preventDefault();
            var me = new MouseEvent("mousemove", {
                clientX: e.touches[0].clientX,
                clientY: e.touches[0].clientY,
                button: 0
            });
            this.canvas.dispatchEvent(me); 
        }, false);
        this.canvas.addEventListener("touchend", (e) => {
            var me = new MouseEvent("mouseup", {clientX:0,clientY:0,button:0});
            this.canvas.dispatchEvent(me);
        }, false);

        // Draw available shapes
        // TODO: Remove this
        recognizableShapes.forEach((item) => {
            this.drawer.drawShape(item,{x:-100,y:-100});
        });
    }
    performRecognition = () => {
        var shape = this.recognizer.recognize(recognizableShapes, this.drawer.currentDrawing);
        var offset = this.recognizer.calculateDrawingOffset(this.drawer.currentDrawing);
        this.drawer.clearDrawing();
        this.drawer.clearCanvas(this.canvas.width, this.canvas.height);
        this.drawer.drawShape(recognizableShapes[shape.idx], offset);
    }
}
const cd = new CanvasStylusRecognizer();
window.addEventListener("resize", () => { cd.resize_func(); });
window.addEventListener("load", () => {
    cd.load(document.querySelector("#draw"));
    // Disable multitouch things 
    // TODO: This should be removed, when more advanced features are in.
    cd.canvas.ontouchstart = (e: any) => {
        if(e.touches) e = e.touches[0];
            return false;
    };
});



