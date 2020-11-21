// TODO: Implement "syntaxes"
var squarre_shape = calcSquarre(40,100); //[{x:0,y:0},{x:100,y:0},{x:100,y:100},{x:0,y:100}];
var triangle      = calcTriangle(40,100);
var circle        = calcCircle(40,50,{x:50,y:50});
var recognizableShapes = [squarre_shape, triangle, circle];

let canvas: HTMLCanvasElement | null = document.querySelector("#draw");
if(canvas) {
    let cd = new CanvasStylusRecognizer(canvas);
    window.addEventListener("resize", () => { cd.resize_func(); });
    window.addEventListener("load", () => {
        // Disable multitouch things 
        // TODO: This should be removed, when more advanced features are in.
        cd.canvas.ontouchstart = (e: any) => {
            if(e.touches) e = e.touches[0];
                return false;
        };
    });

    // TODO: This should be removed, when more advanced features are in.
    /* Prevent "dragging" the web page on mobile/touch based platforms */
    document.body.addEventListener("touchstart", (e) => {
        if (e.target == cd.canvas) {
        e.preventDefault();
        e.stopPropagation();
        }
    }, false);
    document.body.addEventListener("touchend", (e) => {
        if (e.target == cd.canvas) {
        e.preventDefault();
        e.stopPropagation();
        }
    }, false);
    document.body.addEventListener("touchmove", (e) => {
        if (e.target == cd.canvas) {
        e.preventDefault();
            e.stopPropagation();
        }
    }, false);

} else {
    console.log("No canvas was found. Please doublecheck your html");
}

// TODO: Research what pattern for an editor would be good to use.
// [GeneralEditorClass]
//          ↓
//   [ShapeGenerator]
//   [DrawingUpdater]
//   [DrawingEditor]
//
//  Vocabulary:
//    - Drawing
//        "The act of drawing with the stylus, or the shape drawn by using a stylus"
//    - Rendering
//        "The rendering of the styled model instance"
//    - Model Instance
//        "The Model datastructure instance, that is currently being worked on in the editor"
//    - Model
//        "Vertex and Edge datastructures. NB! Not the Model Instance"
//    - Model Instance Element(s)
//        "The concrete verteces and edges present in the Model Instance"
//    - Editor
//        "The user experienced part of the program"
//    - Formation Rule(s)
//        "Rules specifying if an addition/deletion to/from the model instance is allowed or not"
//    - Syntax(es)
//        "The supported (or unsupported) styling scheme(s) and formation rules for models"
//
//
//---------------------------
// Resposibilities needed:
//    - Stylus Drawing ✓
//    - Shape Recognition ✓
//    - Model Instance Editing 
//        * Deleting Instance Elements
//            + Stylus based input
//            + Non-stylus input
//            + Formation Rules
//        * Adding Instance Elements
//            + Stylus based input
//            + Non-stylus input
//            + Formation Rules
//        * Changing Instance Element properties (e.g. the vertex type)
//        * Moving Instance Elements
//    - Styles
//    - Styled Model Instance Rendering
